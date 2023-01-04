import { useRouter } from "next/router"
import { useWeb3 } from "providers/web3"
import { useEffect } from "react"
import { useAccount } from "./useAccount"

export const useAdmin = ({redirectTo}) => {
    const { account } = useAccount()
    const { requireInstall } = useWeb3()
    const router = useRouter()
  
    useEffect(() => {
      if ((
        requireInstall ||
        account.data && !account.isAdmin) ||
        account.isEmpty) {
  
        router.push(redirectTo)
      }
    }, [account])
  
    return { account }
  }