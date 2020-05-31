from cv2 import cv2
import numpy as np

def check_isDeleted(output_filename):
    deleted = cv2.imread('assets/deleted_img/image404.png')
    deleted_nb = cv2.imread('assets/deleted_img/image404_nb.png')
    image = cv2.imread(output_filename)

    try:
        diff = cv2.subtract(image, deleted)
    except:
        diff = True
    try:
        diff_nb = cv2.subtract(image, deleted_nb)
    except:
        diff_nb = True

    return (np.all(diff == 0) | np.all(diff_nb == 0))