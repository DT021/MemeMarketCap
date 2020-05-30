import os, keras
from keras import applications
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

class TemplateClassifier:
    def __init__(
        self,
        img_height = 224,
        img_width = 224,
        img_channel = 3,
        stepdown_multiplier = 4,
        weights_path = "server/models/template_clf.h5",
        dataset_path = "data/imgflip/"
    ):
        self.img_height = img_height
        self.img_width = img_width
        self.img_channel = img_channel
        self.stepdown_multiplier = stepdown_multiplier
        self.weights_path = weights_path
        self.dataset_path = dataset_path
        self.output_size = sum(
            os.path.isdir(
                os.path.join(dataset_path, folder)
            ) for folder in os.listdir(dataset_path)
        )

        self.num_trainable_layers = 11
        self.loss = categorical_crossentropy
        self.batch_size = 32
        self.patience = 20

        self.epochs = 100
        self.steps_per_epoch = 100
        self.validation_steps = 10

        self.optimizer_kwargs = {
            'lr': 0.001,
            'clipnorm': 1.,
            'momentum': 0.9,
            'decay': 0.,
            'nesterov': True
        }

        self.train_datagen = ImageDataGenerator(
            rescale=1./255,
            shear_range=0.2,
            zoom_range=0.2,
            horizontal_flip=True,
            validation_split=0.2
        )
        self.train_generator = self.train_datagen.flow_from_directory(
            self.dataset_path,
            target_size=(self.img_height, self.img_width),
            class_mode='categorical',
            color_mode="rgb",
            subset='training',
            shuffle=True,
            seed=42
        )
        self.validation_generator = self.train_datagen.flow_from_directory(
            self.dataset_path,
            target_size=(self.img_height, self.img_width),
            class_mode='categorical',
            color_mode="rgb",
            subset='validation',
            shuffle=True,
            seed=42
        )
        self.modelcheckpoint = ModelCheckpoint(
            self.weights_path,
            monitor = 'categorical_accuracy',
            verbose = 1,
            save_best_only = True,
            save_weights_only = False,
            mode = 'auto',
            period = 1
        )
        self.earlystopping = EarlyStopping(
            monitor = 'categorical_accuracy',
            min_delta = 0,
            patience = self.patience,
            verbose = 1,
            mode = 'auto'
        )

        self.model = self.create_model()


    def create_model(self):
        vgg16 = applications.VGG16(
            weights='imagenet',
            input_shape=(self.img_height, self.img_width, self.img_channel)
        )

        model = Sequential()
        for layer in vgg16.layers[:-2]:
            model.add(layer)

        model.add(Dense(units=self.stepdown_multiplier*self.output_size, activation="relu"))
        model.add(Dense(units=self.output_size, activation="softmax"))

        try: model.load_weights(self.weights_path)
        except: pass

        return model

    def train(self):

        for layer in self.model.layers[:-self.num_trainable_layers]:
            layer.trainable = False

        self.model.compile(
            optimizer = SGD(**self.optimizer_kwargs),
            loss = self.loss,
            metrics = ['categorical_accuracy'] 
        )
        self.hist = self.model.fit_generator(
            steps_per_epoch = self.steps_per_epoch,
            generator = self.train_generator,
            validation_data = self.validation_generator,
            validation_steps = self.validation_steps,
            epochs = self.epochs,
            callbacks = [self.modelcheckpoint, self.earlystopping]
        )

    def plot_hist(self):
        plot_model_results(self.hist)

    def get_output():
        pass