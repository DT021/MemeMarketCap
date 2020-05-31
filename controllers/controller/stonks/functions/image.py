import requests, os, io, hashlib

from PIL import Image
from PIL.ImageOps import fit

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