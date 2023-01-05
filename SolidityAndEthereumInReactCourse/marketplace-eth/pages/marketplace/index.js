import Breadcrumbs from "@components/common/breadcrumbs"
import Button from "@components/common/button"
import Loader from "@components/common/loader"
import Message from "@components/common/message"
import OrderModal from "@components/common/Modal/orderModal"
import CourseCard from "@components/course/card"
import List from "@components/course/list"
import BaseLayout from "@components/layout/baseLayout"
import MarketplaceHeader from "@components/marketplace/marketplaceHeader"
import { getAllCourses } from "content/fetcher"
import { useOwnedCourses } from "hooks/useOwnedCourses"
import { useWalletInfo } from "hooks/useWalletInfo"
import { useWeb3 } from "providers/web3"
import { useState } from "react"


export default function Marketplace({ courses }) {
  const { web3, contract, requireInstall } = useWeb3()
  const { hasConnectedWallet, isConnecting, account } = useWalletInfo()
  const { ownedCourses } = useOwnedCourses(courses, account.data)

  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isNewPurchase, setIsNewPurchase] = useState(true)

  const purchaseCourse = async order => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id)
    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    )

    const value = web3.utils.toWei(String(order.price))

    if (isNewPurchase) {
      const emailHash = web3.utils.sha3(order.email)
      const proof = web3.utils.soliditySha3(
        { type: "bytes32", value: emailHash },
        { type: "bytes32", value: orderHash }
      )

      _purchaseCourse(hexCourseId, proof, value)
    } else {
      _repurchaseCourse(orderHash, value)
    }
  }

  const _purchaseCourse = async (hexCourseId, proof, value) => {
    try {
      const result = await contract.methods.purchaseCourse(
        hexCourseId,
        proof
      ).send({ from: account.data, value })
      console.log(result)
    } catch {
      console.error("Purchase course: Operation has failed.")
    }
  }

  const _repurchaseCourse = async (courseHash, value) => {
    try {
      const result = await contract.methods.repurchaseCourse(
        courseHash
      ).send({from: account.data, value})
    } catch {
      console.error("Purchase course: Operation has failed.")
    }
  }

  return (
    <>
      <MarketplaceHeader />
      <List
        courses={courses}
      >
        {course => {
          const owned = ownedCourses.lookup[course.id]
          return (
            <CourseCard
              key={course.id}
              course={course}
              state={owned?.state}
              disabled={!hasConnectedWallet}
              Footer={() => {
                if (requireInstall) {
                  return (
                    <Button
                      disabled={true}
                      size="sm"
                      variant="lightPurple">
                      Install
                    </Button>
                  )
                }

                if (isConnecting) {
                  return (
                    <Button
                      disabled={true}
                      size="sm"
                      variant="lightPurple">
                      <Loader size="sm" />
                    </Button>
                  )
                }

                if (!ownedCourses.swrRes.data) {
                  return (
                    <div style={{ height: "42px" }}></div>
                  )
                }

                if (owned) {
                  return (
                    <>
                      <div className="flex">
                        <Button
                          disabled={true}
                          size="sm"
                          variant="white">
                          Yours &#10004;
                        </Button>
                        {owned.state === "deactivated" &&
                          <div className="ml-1">
                            <Button
                              size="sm"
                              disabled={false}
                              onClick={() => {
                                setIsNewPurchase(false)
                                setSelectedCourse(course)
                              }}
                              variant="purple">
                              Fund to Activate
                            </Button>
                          </div>
                        }
                      </div>
                    </>
                  )
                }


                return (
                  <Button
                    onClick={() => setSelectedCourse(course)}
                    disabled={!hasConnectedWallet}
                    size="sm"
                    variant="lightPurple">
                    Purchase
                  </Button>
                )
              }
              }
            />
          )
        }
        }
      </List>
      {selectedCourse &&
        <OrderModal
          isNewPurchase={isNewPurchase}
          course={selectedCourse}
          onSubmit={purchaseCourse}
          onClose={() => {
            setSelectedCourse(null)
            setIsNewPurchase(true)
          }}
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