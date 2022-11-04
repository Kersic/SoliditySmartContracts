import Hero from "@components/common/hero"
import Breadcrumbs from "@components/common/breadcrumbs"
import WalletBar from "@components/web3/walletBar"
import EthRates from "@components/web3/ethRates"
import Card from "@components/other/card"
import List from "@components/course/list"
import BaseLayout from "@components/layout/baseLayout"

export default function Home() {
  return (
    <>
      <Hero/>
      <Breadcrumbs/>
      <WalletBar/>
      <EthRates/>
      <Card/>
      <List/>
    </>
  )
}

Home.Layout = BaseLayout