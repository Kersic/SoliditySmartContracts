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
    href: "/marketplace/courses/manage",
    value: "Manage Courses"
  }]


export default function MarketplaceHeader() {
  return (
    <>
      <WalletBar />
      <EthRates />
      <div className="flex flex-row-reverse pb-4 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={LINKS} />
      </div>
    </>z
  )
}