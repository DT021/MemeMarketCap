import os, keras
from keras.applications import VGG16
from keras.models import Sequential, load_model
from keras.layers import Dense, Conv2D, MaxPool2D , Flatten, Dropout
from keras.preprocessing.image import ImageDataGenerator
from keras.optimizers import SGD
from keras.callbacks import ModelCheckpoint, EarlyStopping
from keras.losses import categorical_crossentropy

import numpy as np
import matplotlib.pyplot as plt

def plot_model_results(hist):
    plt.plot(hist.history["categorical_accuracy"])
    plt.plot(hist.history['val_acc'])
    plt.plot(hist.history['loss'])
    plt.plot(hist.history['val_loss'])
    plt.title("Model Accuracy")
    plt.ylabel("Accuracy")
    plt.xlabel("Epoch")
    plt.legend(["Accuracy","Validation Accuracy","loss","Validation Loss"])
    plt.show()

img_height = 224
img_width = 224
img_channel = 3
stepdown_multiplier = 4
weights_path = "stonks/models/template_clf.h5"
dataset_path = "data/imgflip/"
optimizer_kwargs = {
    'lr': 0.001,
    'clipnorm': 1.,
    'momentum': 0.9,
    'decay': 0.,
    'nesterov': True
}
patience = 20
epochs = 100
steps_per_epoch = 100
validation_steps = 10

class TemplateMarket(object):
    TemplateMarket = None

    @classmethod
    def singleton(cls):
        if cls.TemplateMarket == None:
            cls.TemplateMarket = TemplateMarket()
        return cls.TemplateMarket

    def __init__(self) -> None:
        self.output_size = sum(
            os.path.isdir(os.path.join(dataset_path, folder)) for folder in os.listdir(dataset_path)
        )

    def template_model(self):
        model = Sequential()
        model.add(Dense(units=4096, activation="relu"))
        model.add(Dense(units=self.output_size, activation="softmax"))
        try: model.load_weights(weights_path)
        except: pass
        model.compile(
            optimizer = SGD(**optimizer_kwargs),
            loss = categorical_crossentropy,
            metrics = ['categorical_accuracy'] 
        )
        return model