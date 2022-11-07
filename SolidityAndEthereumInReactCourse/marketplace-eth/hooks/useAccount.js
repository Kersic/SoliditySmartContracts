import { useWeb3 } from "providers/web3"
import { useEffect, useState } from "react"

const adminAddresses = {
  "0x6b19b0c68eae24f22c3b719c6f48331b2cc657d3f2fed10b9148890427cfdf5b": true
}

export const useAccount = () => {
    const {web3, provider} = useWeb3()
    const [account, setAccount] = useState(null)

    useEffect(() => {
      const getAccount = async () => {
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
      }

      web3 && getAccount()
    }, [web3])

    useEffect(() => {
      provider &&
      provider.on("accountsChanged",
        accounts => setAccount(accounts[0] ?? null)
      )
    }, [provider])

    return { account: {
      data: account,
      isAdmin: (account && adminAddresses[web3.utils.keccak256(account)]) ?? false,
    } }
  }