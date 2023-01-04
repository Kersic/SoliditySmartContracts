import { useAccount } from "./useAccount"
import { useNetwork } from "./useNetwork"

export const useWalletInfo = () => {
  const { account } = useAccount()
  const { network } = useNetwork()

  const isConnecting =
    !account.data &&
    !network.data

  return {
    account,
    network,
    isConnecting,
    hasConnectedWallet: !!(account.data && network.isSupported)
  }
}