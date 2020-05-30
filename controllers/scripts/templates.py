import requests, itertools, json
from bs4 import BeautifulSoup
from multiprocessing import cpu_count, Pool
from tqdm import tqdm

from controller.imgflip.schema import Template
from controller.extensions import db

IMG_FLIP_URI = 'https://imgflip.com/memetemplates?page={}'

def get_templates(memes):
    return [{
        'name': meme.div.a['title'],
        'imgflip_page': 'imgflip.com' + meme.div.a['href'],
        'url': meme.div.a.img['src']
    } for meme in memes]

def get_page_data(page_number):
    with requests.get(IMG_FLIP_URI.format(page_number)) as imgflip_page:
        soup = BeautifulSoup(imgflip_page.text, 'lxml')
    
    meme_containers = soup.find_all('div', class_='mt-box')

    if meme_containers: return get_templates(meme_containers)
    else: return []

def build_template_db():
    start_page = 1
    step_size = cpu_count()

    templates = []
    while [] not in templates:
        end_page = start_page+step_size

        with Pool(cpu_count()) as workers:
            template_batch = list(tqdm(
                            workers.imap_unordered(get_page_data, range(start_page, end_page)),
                            total=end_page-start_page
                        ))

        start_page=end_page
        templates.extend(template_batch)

        db.session.add_all(
            map(lambda meme: Template(**meme), itertools.chain.from_iterable(template_batch))
        )
        db.session.commit()

    return list(itertools.chain.from_iterable(templates))