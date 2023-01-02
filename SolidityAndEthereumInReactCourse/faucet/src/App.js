import { useEffect, useState, useCallback } from "react";
import "./App.css"
import Web3 from "web3"
import {loadContract} from "./Utils/loadContract"

const HDWalletProvider = require('@truffle/hdwallet-provider');
const INFURA_PROVIDER = "wss://goerli.infura.io/ws/v3/"

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    isProviderLoaded: false,
    web3: null,
    contract: null
  })
  const [balance, setBalance] = useState(null)
  const [account, setAccount] = useState(null)
  const [shouldReload, reload] = useState(false)

  const canConnectToContract = account && web3Api.contract
  const reloadEffect = useCallback(() => reload(!shouldReload), [shouldReload])

  const setAccountListener = provider => {
    // provider.on("accountsChanged", _ => window.location.reload())
    // provider.on("chainChanged", _ => window.location.reload())
  }

  useEffect(() => {
    const loadProvider = async () => {
      //ganache
      const provider = await new Web3.providers.HttpProvider('http://localhost:7545')

      //goerli
      //var provider = new HDWalletProvider(process.env.REACT_APP_PRIVATE_KEY, INFURA_PROVIDER+process.env.REACT_APP_INFURA_KEY)

      //test if provider works
      var web3 = new Web3(provider);
      web3.eth.getBlockNumber().then((result) => {
        console.log("Latest Ethereum Block is ",result);
});
      
      if (provider) {
        const contract = await loadContract("Faucet", provider)
        setAccountListener(provider)

        setWeb3Api({
          web3: new Web3(provider),
          provider: provider,
          contract: contract,
          isProviderLoaded: true
        })
      } else {
        setWeb3Api(api => ({...api, isProviderLoaded: true}))
        console.error('Web3 provider not found!')
      }  
    }

    loadProvider()
  }, [])

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
      setAccount(accounts[0])
    }

    web3Api.web3 && getAccount()
  }, [web3Api.web3])

  useEffect(() => {
    const laodBalance = async () => {
      const {contract, web3} = web3Api
      const balance = await web3.eth.getBalance(contract.address)
      setBalance(web3.utils.fromWei(balance, "ether"))
    }

    web3Api.contract && laodBalance()
  }, [web3Api, shouldReload])

  const addFunds = useCallback(async () => {
    const { contract, web3 } = web3Api
    await contract.addFunds({
      from: account,
      value: web3.utils.toWei("0.001", "ether")
    })

    reloadEffect()
  }, [web3Api, account, reloadEffect])

  const withdraw = async () => {
    const { contract, web3 } = web3Api
    const withdrawAmount = web3.utils.toWei("0.001", "ether")
    await contract.withdraw(withdrawAmount, {
      from: account
    })
    reloadEffect()
  }

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          { web3Api.isProviderLoaded ?
            <div className="is-flex is-align-items-center">
              <span>
                <strong className="mr-2">Account: </strong>
              </span>
              { account ?
                <span>{account}</span> :
                !web3Api.provider ?
                <>
                    <div className="notification is-warning is-size-7 is-rounded">
                      Wallet is not detected!{` `}
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://docs.metamask.io">
                        Install Metamask
                      </a>
                    </div>
                </> :
                <button 
                  className="button is-small"
                  onClick={() =>
                    web3Api.provider.request({method: "eth_requestAccounts"}
                  )}
                >
                  Connect Walltet
                </button>
              }
            </div> :
            <div>Looking for Web3 ...</div>
          }

          <div className="balance-view is-size-2 my-4">
            Current Balance: <strong>{balance}</strong> ETH
          </div>

          { !canConnectToContract &&
            <i className="is-block">
              Connect to Ganache
            </i>
          }
          <button onClick={addFunds} disabled={!canConnectToContract} className="button is-link mr-2">Donate 0.001 ETH</button>
          <button onClick={withdraw} disabled={!canConnectToContract} className="button is-primary">Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;


//truffle migrate --network goerli