import { useEffect, useState } from "react";
import "./App.css"
import Web3 from "web3"

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
  })
  const [account, setAccount] = useState(null)

  useEffect(() => {
    const loadProvider = async () => {
      let provider = await new Web3.providers.HttpProvider('http://localhost:7545')

      if (provider) {
        setWeb3Api({
          web3: new Web3(provider),
          provider: provider
        })
      } else {
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
            Current Balance: <strong>10</strong> ETH
          </div>
          <button className="button is-link mr-2">Donate</button>
          <button className="button is-primary">Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;
