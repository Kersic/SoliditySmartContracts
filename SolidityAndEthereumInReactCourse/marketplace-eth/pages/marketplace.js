import CourseCard from "@components/course/card"
import List from "@components/course/list"
import BaseLayout from "@components/layout/baseLayout"
import Card from "@components/other/card"
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
        <WalletBar
          address={account.data}
          network={network}
        />
        "Current" {`${network.data}`}
        "Target" {`${network.target}`}
        "Is Supported" {`${network.isSupported}`}
      </div>
      <List
        courses={courses}
      >
        {course =>
          <CourseCard
            key={course.id}
            course={course}
          />
        }
      </List>
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