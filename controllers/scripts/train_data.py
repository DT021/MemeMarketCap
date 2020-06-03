from controller import APP
from controller.stonks.data_builder import DataBuilder


if __name__ == "__main__":
    with APP.app_context():
        DataBuilder().run()