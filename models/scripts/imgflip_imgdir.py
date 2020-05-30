from server import APP
from server.classes.imgflip import ImgflipImgdirBuilder

if __name__ == "__main__":
    with APP.app_context():
        ImgflipImgdirBuilder(limit=False, early_stopping=4, verbose=False).engine()
