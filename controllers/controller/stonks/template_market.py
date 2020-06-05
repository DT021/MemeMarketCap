from typing import Iterator
from pandas.core.frame import DataFrame

import os

import keras
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

from keras.callbacks import EarlyStopping
from keras.layers import Dense
from keras.losses import binary_crossentropy
from keras.models import Sequential
from keras.optimizers import SGD
from keras.models import load_model

from controller.constants import MODELS_REPO
from controller.extensions import db
from controller.stonks.schema import TrainData

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

optimizer_kwargs = {
    'lr': 0.001,
    'clipnorm': 1.,
    'momentum': 0.9,
    'decay': 0.,
    'nesterov': True
}
patience = 1
epochs = 1

early_stopping = EarlyStopping(
    monitor='val_acc',
    min_delta=0,
    patience=patience,
    verbose=0,
    mode='auto',
    restore_best_weights=True
)

def base_model():
    model = Sequential()
    # model.add(Dense(units=25088, activation="relu"))
    model.add(Dense(units=16, activation="relu"))
    model.add(Dense(units=1, activation="sigmoid"))
    optimizer_kwargs = {
        'lr': 0.001,
        'clipnorm': 1.,
        'momentum': 0.9,
        'decay': 0.,
        'nesterov': True
    }
    model.compile(
        optimizer = SGD(**optimizer_kwargs),
        loss = binary_crossentropy,
        metrics = ['accuracy'] 
    )
    return model

class TemplateMarket(object):
    TemplateMarket = None

    @classmethod
    def singleton(cls):
        if cls.TemplateMarket == None:
            cls.TemplateMarket = TemplateMarket()
        return cls.TemplateMarket

    def train_data(self) -> Iterator[DataFrame]:
        step = 10_000
        count = db.session.query(TrainData).count()
        for i in range(0, count, step):
            q = db.session.query(TrainData).offset(i).limit(step).statement
            yield pd.read_sql(q, db.session.bind)

    def train(self) -> None:
        for df in self.train_data():
            for name in df.name.unique():
                model_path = MODELS_REPO + f"{name}"
                try:
                    model = load_model(model_path)
                except:
                    model = base_model()
                model.fit(
                    pd.DataFrame(df["features"].tolist()).values,
                    (df["name"] == name).values,
                    epochs = epochs,
                    shuffle = True,
                    callbacks=[early_stopping]
                )
                try:
                    model.save()
                except:
                    os.mkdir(model_path)
                    model.save(model_path)