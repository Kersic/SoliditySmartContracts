download public network: 
    geth

create private network from genesis file: 
    geth init genesis.json --datadir mychaindata
start private network: 
    geth --datadir mychaindata --nodiscover
when starting private network check:
    - ChainID should be the same as in genesis file (line: Initialised chain configuration)
    - endpoint for "IPC endpoint opened" should be the geth.ipc in file in folder specified by --datadir

attach another geth insance on runing geth insance:
    geth attach <IPC endpoint path> --> geth javaScript console is opened

close geth javaScript console
    exit

creating account from geth javaScript console:
    get existing accounts: eht.accounts (visible also in keystore)
    create new account: personal.newAccount()
    
mine eather on private network from geth javaScript console: 
    check if eth.coinbase contains account (mined ether is credited to this account)
    if eth.coinbase is not set, set it with miner.setEtherbase(eth.accounts[0])
    start miner: miner.start(1) --> number means number of threads
    stop miner: miner.stop()
    
check account balance from geth javaScript console::
    eth.getBalance(eth.accounts[0])
    web3.fromWei(eth.getBalance(eth.accounts[0]), "ether")

starting geth with mining:
    geth --datadir mychaindata --nodiscover --unlock 0 --mine