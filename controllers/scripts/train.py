from controller import APP
from controller.stonks.template_market import TemplateMarket


if __name__ == "__main__":
    with APP.app_context():
        TemplateMarket().build()