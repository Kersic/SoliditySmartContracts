import Hero from "@components/common/hero"
import Breadcrumbs from "@components/common/breadcrumbs"
import WalletBar from "@components/web3/walletBar"
import EthRates from "@components/web3/ethRates"
import Card from "@components/other/card"
import List from "@components/course/list"
import BaseLayout from "@components/layout/baseLayout"
import { getAllCourses } from "content/fetcher"

export default function Home({courses}) {
  return (
    <>
      <Hero/>
      {/* <Breadcrumbs/>
      <WalletBar/>
      <EthRates/>
      <Card/> */}
      <List courses={courses}/>
    </>
  )
}

export function getStaticProps() {
  const { data } = getAllCourses()
  return {
    props: {
      courses: data
    }
  }
}

Home.Layout = BaseLayout