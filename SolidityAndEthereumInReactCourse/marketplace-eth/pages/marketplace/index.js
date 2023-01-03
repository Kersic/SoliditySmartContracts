import Breadcrumbs from "@components/common/breadcrumbs"
import Button from "@components/common/button"
import OrderModal from "@components/common/Modal/orderModal"
import CourseCard from "@components/course/card"
import List from "@components/course/list"
import BaseLayout from "@components/layout/baseLayout"
import MarketplaceHeader from "@components/marketplace/marketplaceHeader"
import { getAllCourses } from "content/fetcher"
import { useWalletInfo } from "hooks/useWalletInfo"
import { useWeb3 } from "providers/web3"
import { useState } from "react"


export default function Marketplace({courses}) {
  const { web3, contract } = useWeb3()
  const { canPurchaseCourse, account } = useWalletInfo()
  const [selectedCourse, setSelectedCourse] = useState(null)

  const purchaseCourse = async order => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id)
    
    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    )

    const emailHash = web3.utils.sha3(order.email)

    const proof = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: orderHash }
    )

    const value = web3.utils.toWei(String(order.price))

    try {
      const result = await contract.methods.purchaseCourse(
        hexCourseId,
        proof
      ).send({from: account.data, value})
      console.log(result)
    } catch {
      console.error("Purchase course: Operation has failed.")
    }
  }

  return (
    <>
      <div className="py-4">
        <MarketplaceHeader />
      </div>
      <List
        courses={courses}
      >
        {course =>
          <CourseCard
            key={course.id}
            course={course}
            disabled={!canPurchaseCourse}
            Footer={() =>
              <div className="mt-4">
                <Button
                  onClick={() => setSelectedCourse(course)}
                  disabled={!canPurchaseCourse}
                  variant="lightPurple">
                  Purchase
                </Button>
              </div>
            }
          />
        }
      </List>
      { selectedCourse &&
        <OrderModal
          course={selectedCourse}
          onSubmit={purchaseCourse}
          onClose={() => setSelectedCourse(null)}
        />
      }
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