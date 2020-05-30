from server.classes import TemplateClassifier

class ModelHandler(object):
    template_clf = None

    @classmethod
    def get_model(cls):
        if cls.template_clf == None: cls.template_clf = TemplateClassifier().model
        return cls.template_clf

    @classmethod
    def predict(cls, img):
        return get_output(cls.get_model(), img)