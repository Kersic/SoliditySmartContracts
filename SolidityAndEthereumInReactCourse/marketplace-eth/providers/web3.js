const { createContext, useContext, useState, useEffect, useMemo } = require("react");
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "utils/loadContract";
import Web3 from "web3";

const Web3Context = createContext(null)

export default function Web3Provider({children}) {
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
        isLoading: true
      })
    
      useEffect(() => {
        const loadProvider = async () => {
    
          const provider = await detectEthereumProvider()
          if (provider) {
            const web3 = new Web3(provider)
            const contract = await loadContract("CourseMarketplace", web3)
            console.log(contract)
            setWeb3Api({
              provider,
              web3,
              contract: null,
              isLoading: false
            })
          } else {
            setWeb3Api(api => ({...api, isLoading: false}))
            console.error("Please, install Metamask.")
          }
        }
    
        loadProvider()
      }, [])

      const _web3Api = useMemo(() => {
        const { web3, provider, isLoading } = web3Api

        return {
          ...web3Api,
          isWeb3Loaded: web3 != null,
          requireInstall: !isLoading && !web3,
          connect: provider ?
            async () => {
              try {
                console.log(web3)
                console.log(provider)
                let accounts = await provider.request({method: "eth_requestAccounts"})
                console.log(accounts)

              } catch {
                location.reload()
              }
            } :
            () => console.error("Cannot connect to Metamask, try to reload your browser please.")
        }
      }, [web3Api])

  return (
    <Web3Context.Provider value={_web3Api}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  return useContext(Web3Context)
}
