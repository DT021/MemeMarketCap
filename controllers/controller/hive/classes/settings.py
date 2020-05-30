from decouple import config
from datetime import datetime
from beem import Steem, Hive
from beem.nodelist import NodeList
from beem.blockchain import Blockchain
from beem.account import Account

nodelist = NodeList()
nodelist.update_nodes()

hive_nodes = nodelist.get_nodes(hive=True)
steem_nodes = nodelist.get_nodes(hive=False)

hive = Hive(node=hive_nodes)
# hive.wallet.wipe(True)
# hive.wallet.create("Safety1st")
hive.wallet.unlock("Safety1st")
# hive.wallet.addPrivateKey(config('RICK_WIF'))
# hive.wallet.addPrivateKey(config('MEMEHUB_WIF'))
print(config('RICK_WIF'))
print(hive.wallet.keys)
print(hive.wallet.getAccounts())
memehubHive = Account("memehub", hive_instance=hive)
rickKey= config('RICK_WIF')
rickHive = Account("rick.c137", hive_instance=hive)
blockchainHive = Blockchain(hive_instance=hive)

steem = Steem(node=steem_nodes, keys=[config('MEMEHUB_WIF')])
memehubSteem = Account("memehub", steem_instance=steem)
blockchainSteem = Blockchain(steem_instance=steem)

create_date = datetime(2020, 3, 15, 22 ,17, 0)
memehub_community_created_block = blockchainHive.get_estimated_block_num(create_date)

minnows = [
    'cmmemes',
    'savagememes',
    'antisocialist',
    'harryq11',
    'joshman',
    'enforcer48',
    'lordbutterfly',
    'anthonyadavisii',
    'reazuliqbal',
    'teenagecrypto',
    'jlsplatts',
    'steemflagrewards',
    'joshmania',
    'sfr-treasury',
]

whales = [
    'slobberchops',
    'jaguar.force',
    'acidyo',
    'netuoso',
    'arcange',
    'asgarth',
    'inertia',
    'gtg',
]

whitelist = minnows + whales