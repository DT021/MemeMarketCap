from cv2 import cv2
import numpy as np

def chunks(lst, n):
    for i in range(0, len(lst), n):
        yield lst[i:i + n]

def round_hour(ts):
    q, r = divmod(ts, 3600)
    return (q+1 if r >=1800 else q) * 3600

def round_hour_down(ts):
    q, _ = divmod(ts, 3600)
    return q*3600

def dump_datetime(value):
    """Deserialize datetime object into string form for JSON processing."""
    if value is None:
        return None
    return [value.strftime("%Y-%m-%d"), value.strftime("%H:%M:%S")]

def isDeleted(image_cv):
    deleted = cv2.imread('assets/deleted_img/image404.png')
    deleted_nb = cv2.imread('assets/deleted_img/image404_nb.png')
    try:
        diff = cv2.subtract(image_cv, deleted)
    except:
        diff = True
    try:
        diff_nb = cv2.subtract(image_cv, deleted_nb)
    except:
        diff_nb = True
    return (np.all(diff == 0) | np.all(diff_nb == 0))