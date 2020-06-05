import io
from itertools import chain
from multiprocessing import Pool, cpu_count
from typing import Dict, Iterator, List, Optional, Tuple, Union

import cv2 as cv2
import numpy as np
import pandas as pd
import requests
from bs4 import BeautifulSoup
from keras_preprocessing.image.image_data_generator import ImageDataGenerator
from sqlalchemy import func

from controller import APP
from controller.constants import IMG_HEIGHT, IMG_WIDTH, INPUT_SHAPE
from controller.extensions import db
from controller.stonks.schema import Template, TrainData

IMG_FLIP_URI = 'https://imgflip.com/memetemplates?page={}'
NUM_WORKERS = 8
num_batches = 32

datagen = ImageDataGenerator(
    rotation_range=40,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)

def extract_img(url) -> Optional[np.ndarray]:
    try:
        resp = requests.get(url, stream=True).raw
        image = np.asarray(bytearray(resp.read()), dtype=np.uint8)
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        return cv2.resize(image, (IMG_HEIGHT, IMG_WIDTH))
    except Exception as e:
        print(e)
        return

class DataBuilder:
    def __init__(self):
        self.step_size = 4

    def get_template_data(self, page_number: int) -> List[Dict[str, str]]:
        with requests.get(IMG_FLIP_URI.format(page_number)) as page:
            soup = BeautifulSoup(page.text, 'lxml')
        memes = soup.find_all('div', class_='mt-box')
        if not memes:
            self.found_empty_page = True
        return [
            {
                "name": meme.div.a['title'][:-5],
                "page": 'https://imgflip.com' + meme.div.a['href']
            } for meme in memes
        ]

    def build_template_db(self) -> None:
        start_page = 1
        self.found_empty_page = False
        while not self.found_empty_page:
            end_page = start_page + self.step_size
            pages = range(start_page, end_page)
            with Pool(NUM_WORKERS) as workers:
                raw_batch = list(workers.imap_unordered(self.get_template_data, pages))
            start_page=end_page
            db.session.add_all(Template(**template) for template in chain.from_iterable(raw_batch))
            db.session.commit()

    def extract_imgs(self, page: str) -> list:
        with requests.get(page.format(1)) as resp:
            soup = BeautifulSoup(resp.text, 'lxml')
        meme_containers = soup.find_all('img', class_='base-img')
        return [extract_img("https:" + meme['src']) for meme in meme_containers]

    def run(self, page_limit: int = 20) -> None:
        templates = db.session.query(Template).all()
        if not templates:
            self.build_template_db()
            templates = db.session.query(Template).all()
        names = (template.name for template in templates)
        pages = (template.page for template in templates)
        from keras.applications.vgg16 import VGG16
        vgg16 = VGG16(weights='imagenet', input_shape=INPUT_SHAPE, include_top=False)
        for name, page in zip(names, pages):
            imgs = self.extract_imgs(page)
            transformer = datagen.flow(np.array(imgs), batch_size=num_batches * len(imgs))
            batch = np.array(next(transformer))
            train_data = (
                TrainData(
                    name = name,
                    features = features.flatten().tolist()
                ) for features in vgg16.predict(batch)
            )
            db.session.add_all(train_data)
            db.session.commit()
