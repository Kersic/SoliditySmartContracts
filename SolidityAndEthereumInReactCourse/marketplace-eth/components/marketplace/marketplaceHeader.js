import { useAccount } from "hooks/useAccount";
import Breadcrumbs from "../common/breadcrumbs";
import EthRates from "../web3/ethRates";
import WalletBar from "../web3/walletBar";


const LINKS = [{
  href: "/marketplace",
  value: "Buy"
}, {
  href: "/marketplace/courses/owned",
  value: "My Courses"
}, {
  href: "/marketplace/courses/managed",
  value: "Manage Courses",
  requireAdmin: true
}]


export default function MarketplaceHeader() {
  const { account } = useAccount()
  return (
    <>
      <div className="pt-4">
        <WalletBar />
      </div>
      <EthRates />
      <div className="flex flex-row-reverse p-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          isAdmin={account.isAdmin}
          items={LINKS}
        />
      </div>
    </>
  )
}