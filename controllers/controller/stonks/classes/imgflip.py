import requests, hashlib, os, io, itertools
import pandas as pd

from bs4 import BeautifulSoup
from multiprocessing import cpu_count, Manager, Pool

from PIL import Image
from PIL.ImageOps import fit

from controller.extensions import db
from controller.stonks.schema import Template

DATASET_PATH = 'data/imgflip/'
IMG_FLIP_URI = 'https://imgflip.com/memetemplates?page={}'

def download_img(url, name, DATASET_PATH, return_url=False):
    try:
        with requests.get(url) as response:
            raw_img = Image.open(io.BytesIO(response.content))
    except: return None
    else:
        img = fit(raw_img.convert('RGB'), (224, 224), Image.ANTIALIAS)
        img_hash = hashlib.md5(img.tobytes()).hexdigest()
        output_filename = os.path.join(DATASET_PATH, f"{name}", f"{img_hash}.png")

        with open(output_filename, 'wb') as out_file:
            img.save(out_file, format='png')

        if return_url: return url

def get_templates(memes):
    return [{
        'name': meme.div.a['title'],
        'imgflip_page': 'https://imgflip.com' + meme.div.a['href'],
        'url': meme.div.a.img['src']
    } for meme in memes]
def get_template_data(page_number):
    with requests.get(IMG_FLIP_URI.format(page_number)) as imgflip_page:
        soup = BeautifulSoup(imgflip_page.text, 'lxml')
    meme_containers = soup.find_all('div', class_='mt-box')
    return get_templates(meme_containers) if meme_containers else []

class Imgflip:
    def __init__(self):
        self.step_size = cpu_count()
    def build_template_db(self):
        start_page = 1
        
        raw_batch = []
        while [] not in raw_batch:
            end_page = start_page + self.step_size
            pages = range(start_page, end_page)
            with Pool(cpu_count()) as workers:
                raw_batch = list(workers.imap_unordered(get_template_data, pages))
            start_page=end_page
            template_gen = itertools.chain.from_iterable(raw_batch)
            template_batch = map(lambda meme: Template(**meme), template_gen)
            db.session.add_all(template_batch)
            db.session.commit()

    def download_memes(self, page_number):
        try:
            with requests.get(self.current_page.format(page_number)) as imgflip_page:
                soup = BeautifulSoup(imgflip_page.text, 'lxml')
            meme_containers = soup.find_all('img', class_='base-img')
            if meme_containers:
                for meme in meme_containers:
                    download_img(
                        "https:" + meme['src'],
                        self.current_name,
                        DATASET_PATH
                    )
            else: self.found_empty_page = True
        except Exception as e: print(str(e))

    def build_dataset(self, start_page=1):
        for imgflip_page, name in self.get_pages_names():
            self.current_page, self.current_name = imgflip_page, name
            try: os.mkdir(os.path.join(DATASET_PATH, f"{name}"))
            except: pass
            start_page = 1
            while not self.found_empty_page:
                end_page = start_page + self.step_size
                with Pool(cpu_count()) as pool:
                    r = pool.map_async(self.download_memes, range(start_page, end_page))
                    r.wait()
                start_page=end_page