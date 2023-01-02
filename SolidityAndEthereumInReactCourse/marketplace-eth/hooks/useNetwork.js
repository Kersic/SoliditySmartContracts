import { useWeb3 } from "providers/web3"
import { useEffect, useState } from "react"

const NETWORKS = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
    56: "Binance Smart Chain",
    1337: "Ganache",
  }

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID]

export const useNetwork = () => {
    const {web3, provider} = useWeb3()
    const [chainId, setChainId] = useState()

    useEffect(() => {
        const getChainId = async () => {
          const id = await web3.eth.getChainId()
          setChainId(NETWORKS[id])
        }
  
        web3 && getChainId()
      }, [web3])
  
      useEffect(() => {
        provider &&
        provider.on("chainChanged", chainId => {
            setChainId(NETWORKS[parseInt(chainId, 16)])
          })
      }, [web3])
    

    return {
      network: {
        data: chainId,
        target: targetNetwork,
        isSupported: chainId === targetNetwork,
      }
    }
  }