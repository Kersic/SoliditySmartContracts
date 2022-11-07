import List from "@components/course/list"
import BaseLayout from "@components/layout/baseLayout"
import WalletBar from "@components/web3/walletBar"
import { getAllCourses } from "content/fetcher"
import { useAccount } from "hooks/useAccount"
import { useNetwork } from "hooks/useNetwork"
import { useState } from "react"


export default function Marketplace({courses}) {
  const { account } = useAccount()
  const { network } = useNetwork()

  return (
    <>
      <div className="py-4">
      { network.data }
        <WalletBar
          address={account.data}
          network={network}
        />
      </div>
      <List
        courses={courses}
      />
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

Marketplace.Layout = BaseLayout