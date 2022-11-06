import { useWeb3 } from "providers/web3"

export const useAccount = () => {
    const {web3} = useWeb3()

    return {
      account: web3 ? "Test Account" : "null"
    }
  }