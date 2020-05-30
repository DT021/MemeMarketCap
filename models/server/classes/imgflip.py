import requests, hashlib, json, os
import pandas as pd

from bs4 import BeautifulSoup
from multiprocessing import cpu_count, Manager, Pool

from server.functions import download_img

DATASET_PATH = 'data/imgflip/'

class ImgflipImgdirBuilder:
    def __init__(self, limit=20, early_stopping=2, verbose=False):
        self.limit = limit
        self.limit_counter = 0
        self.early_stopping = early_stopping
        self.verbose = verbose
        self.found_empty_page = False
        

    def get_pages_names(self):
        with requests.get('http://app:8000/get_templates') as response:
            return json.loads(response.content)

    def get_page_data(self, page_number):
        try:
            with requests.get(self.current_page.format(page_number)) as imgflip_page:
                soup = BeautifulSoup(imgflip_page.text, 'lxml')
            
            meme_containers = soup.find_all('img', class_='base-img')

            if meme_containers:
                if self.verbose:
                    print(json.dumps({
                        self.current_name: [
                            download_img(
                                "https:" + meme['src'],
                                self.current_name,
                                DATASET_PATH,
                                return_url=True
                            ) for meme in meme_containers
                        ],
                        "page_number": page_number,
                    }, indent=4))
                else:
                    for meme in meme_containers:
                        download_img(
                            "https:" + meme['src'],
                            self.current_name,
                            DATASET_PATH
                        )
            else: self.found_empty_page = True
        except Exception as e: print(str(e))

    def engine(self, start_page=1, step_size=5):
        for imgflip_page, name in self.get_pages_names():
            self.current_page, self.current_name = imgflip_page, name
            
            self.limit_counter += 1
            if self.limit and self.limit_counter > self.limit: break

            try: os.mkdir(os.path.join(DATASET_PATH, f"{name}"))
            except: pass

            start_page = 1
            self.stopping_counter = 0

            while not self.found_empty_page:
                self.stopping_counter += 1
                if self.early_stopping and self.stopping_counter > self.early_stopping: break

                end_page = start_page + step_size

                with Pool(cpu_count()) as pool:
                    r = pool.map_async(self.get_page_data, range(start_page, end_page))
                    r.wait()

                start_page=end_page