from beem import Hive
from beem.nodelist import NodeList

nodelist = NodeList()
nodelist.update_nodes()

hive_nodes = nodelist.get_nodes(hive=True)
hive = Hive(node=hive_nodes)
hive.wallet.unlock("Safety1st")
shitpost_kwargs = {
    'author': "rick.c137",
    'self_vote': False,
    'category': 'hive-177075',
    'parse_body': True
}

shitpost_title = "ShitPostChallenge"
shitpost_body = 'shit poster inital test. Be prepared for more.'

class RickC137:
    def shitpost(self):
        hive.post(shitpost_title, shitpost_body, **shitpost_kwargs)

if __name__ == "__main__":
    RickC137().shitpost()