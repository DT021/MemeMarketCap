import io
from itertools import chain
from multiprocessing import Pool, cpu_count
from typing import Dict, Iterator, List, Optional, Tuple

import numpy as np
import pandas as pd
import requests
from bs4 import BeautifulSoup
import cv2 as cv2
from sqlalchemy import func

from controller import APP
from controller.extensions import db
from controller.reddit.functions.constants import IMG_HEIGHT, IMG_WIDTH, INPUT_SHAPE
from controller.stonks.schema import TrainData, Template

IMG_FLIP_URI = 'https://imgflip.com/memetemplates?page={}'
NUM_WORKERS = 8

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

    def extract_img_np_batch(self, page_number: int) -> Optional[list]:
        with requests.get(self.current_page.format(page_number)) as page:
            soup = BeautifulSoup(page.text, 'lxml')
        meme_containers = soup.find_all('img', class_='base-img')
        if meme_containers:
            return [extract_img("https:" + meme['src']) for meme in meme_containers]
        else:
            self.found_empty_page = True

    def run(self, page_limit: int = 1) -> None:
        templates = db.session.query(Template).all()
        if not templates:
            self.build_template_db()
            templates = db.session.query(Template).all()
        for idx, template in enumerate(templates):
            if idx > 3: break
            self.found_empty_page = False
            self.current_page = template.page
            start_page = db.session.query(
                func.max(TrainData.end_page)
            ).filter_by(
                name = template.name
            ).scalar()
            if not start_page:
                start_page = 1
            self.page_limit = page_limit + start_page
            while not self.found_empty_page and start_page <= self.page_limit:
                end_page = start_page + self.step_size
                pages = range(start_page, end_page)
                with Pool(NUM_WORKERS) as workers:
                    imgs = list(workers.imap_unordered(self.extract_img_np_batch, pages))
                from keras.applications.vgg16 import VGG16
                vgg16 = VGG16(weights='imagenet', input_shape=INPUT_SHAPE, include_top=False)
                img_features = vgg16.predict(np.array(list(chain.from_iterable(imgs))))
                for features in img_features:
                    db.session.add(TrainData(
                        name = template.name,
                        end_page = end_page,
                        features = features.flatten().tolist()
                    ))
                db.session.commit()
                start_page = end_page
