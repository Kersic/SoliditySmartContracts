import { useEffect, useState, useCallback } from "react";
import "./App.css"
import Web3 from "web3"
import detectEthereumProvider from '@metamask/detect-provider'
import {loadContract} from "./Utils/loadContract"

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null
  })
  const [balance, setBalance] = useState(null)
  const [account, setAccount] = useState(null)
  const [shouldReload, reload] = useState(false)

  const canConnectToContract = account && web3Api.contract
  const reloadEffect = useCallback(() => reload(!shouldReload), [shouldReload])

  const setAccountListener = provider => {
    provider.on("accountsChanged", _ => window.location.reload())
    provider.on("chainChanged", _ => window.location.reload())
  }

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider()
      
      if (provider) {
        const contract = await loadContract("Faucet", provider)
        setAccountListener(provider)

        setWeb3Api({
          web3: new Web3(provider),
          provider: provider,
          contract: contract
        })
      } else {
        console.error('Please install MetaMask!')
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
      value: web3.utils.toWei("1", "ether")
    })

    reloadEffect()
  }, [web3Api, account, reloadEffect])

  const withdraw = async () => {
    const { contract, web3 } = web3Api
    const withdrawAmount = web3.utils.toWei("0.1", "ether")
    await contract.withdraw(withdrawAmount, {
      from: account
    })
    reloadEffect()
  }

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <div className="is-flex is-align-items-center">
            <span>
              <strong className="mr-2">Account: </strong>
            </span>
            { account ?
              <span>{account}</span> :
              <button 
                className="button is-small"
                onClick={() =>
                  web3Api.provider.request({method: "eth_requestAccounts"}
                )}
              >
                Connect Walltet
              </button>
            }
          </div>
          <div className="balance-view is-size-2 my-4">
            Current Balance: <strong>{balance}</strong> ETH
          </div>
          <button onClick={addFunds} disabled={!canConnectToContract} className="button is-link mr-2">Donate 1 ETH</button>
          <button onClick={withdraw} disabled={!canConnectToContract} className="button is-primary">Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;
