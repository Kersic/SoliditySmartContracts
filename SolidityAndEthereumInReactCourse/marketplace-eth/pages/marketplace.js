import List from "@components/course/list"
import BaseLayout from "@components/layout/baseLayout"
import WalletBar from "@components/web3/walletBar"
import { getAllCourses } from "content/fetcher"
import { useAccount } from "hooks/useAccount"


export default function Marketplace({courses}) {
  const { account } = useAccount()

  return (
    <>
      <div className="py-4">
        <WalletBar
          address={account.data}
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