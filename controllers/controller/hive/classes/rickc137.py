from controller.hive.classes.settings import (
    hive,
    blockchainHive,
    rickHive,
    rickKey
)

shitpost_kwargs = {
    'author': "rick.c137",
    'self_vote': False,
    'category': 'hive-189111',
    'parse_body': True
}
shitpost_title = "Memehub Bot Post Test"
shitpost_body = 'Fingers Crossed'

class RickC137:
    def shitpost(self):
        hive.post(shitpost_title, shitpost_body, **shitpost_kwargs)
