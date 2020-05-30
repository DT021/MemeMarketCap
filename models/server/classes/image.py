import io, os, hashlib, requests, json, shutil
import numpy as np
from os.path import join, dirname
from decouple import config
from PIL import Image
from cv2 import cv2

PRED_GEN_DIR = 'pred_gen_dir'
weights_path = "controller/models/template_clf.h5"

def to_hash(img):
   return hashlib.md5(img.tobytes()).hexdigest()

class ImgHandler:
    def __init__(self):
        pass

    def get_by_url(self, url):
        with requests.get(url) as response:
            img = Image.open(io.BytesIO(response.content))

        return str(img)

    def get_by_file(self):
        out = model.predict_generator()
        return out