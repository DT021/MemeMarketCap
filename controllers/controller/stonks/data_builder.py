import io

from multiprocessing import Pool, cpu_count
from typing import Dict, Iterator, List, Optional, Tuple

import numpy as np
import pandas as pd
import requests
from itertools import chain
from bs4 import BeautifulSoup
from keras.preprocessing.image import img_to_array
from keras_applications.vgg16 import VGG16
from pandas.core.frame import DataFrame
from PIL import Image
from PIL.ImageOps import fit

from controller.extensions import db

IMG_FLIP_URI = 'https://imgflip.com/memetemplates?page={}'

img_height = 224
img_width = 224
img_channel = 3

def extract_img_np(url) -> Optional[np.ndarray]:
    try:
        with requests.get(url) as response:
            raw_img = Image.open(io.BytesIO(response.content))
    except: return
    return img_to_array(fit(raw_img.convert('RGB'), (224, 224), Image.ANTIALIAS))

class DataBuilder:
    def __init__(self):
        self.step_size = cpu_count()
        self.model: VGG16 = VGG16(
            weights='imagenet',
            input_shape=(img_height, img_width, img_channel),
            include_top=False
        )

    def get_template_data(self, page_number: int) -> List[Tuple[str, str]]:
        with requests.get(IMG_FLIP_URI.format(page_number)) as page:
            soup = BeautifulSoup(page.text, 'lxml')
        memes = soup.find_all('div', class_='mt-box')
        if not memes:
            self.found_empty_page = True
        return [
            (meme.div.a['title'], 'https://imgflip.com' + meme.div.a['href']) for meme in memes
        ]

    def get_templates(self) -> Iterator[Iterator[Tuple[str, str]]]:
        start_page = 1
        self.found_empty_page = False
        raw_batch = []
        while not self.found_empty_page:
            end_page = start_page + self.step_size
            pages = range(start_page, end_page)
            with Pool(cpu_count()) as workers:
                raw_batch = list(workers.imap_unordered(self.get_template_data, pages))
            start_page=end_page
            yield chain.from_iterable(raw_batch)

    def extract_img_np_batch(self, page_number: int) -> Optional[list]:
        with requests.get(self.current_page.format(page_number)) as page:
            soup = BeautifulSoup(page.text, 'lxml')
        meme_containers = soup.find_all('img', class_='base-img')
        if meme_containers:
            return[extract_img_np(meme['src']) for meme in meme_containers]
        else:
            self.found_empty_page = True

    def run(self, page_limit: int = 20) -> DataFrame:
        train = pd.DataFrame()
        for name, page in chain.from_iterable(self.get_templates()):
            self.current_page = page
            start_page = 1
            batch = pd.DataFrame()
            while not self.found_empty_page or start_page > page_limit:
                end_page = start_page + self.step_size
                pages = range(start_page, end_page)
                with Pool(cpu_count()) as workers:
                    imgs = list(workers.imap_unordered(self.extract_img_np_batch, pages))
                img_features = self.model.predict(np.array(chain.from_iterable(imgs)))
                batch = pd.concat([batch, pd.DataFrame(img_features)])
                start_page = end_page
            batch["name"] = name
            pd.concat([train, batch])
        return train
