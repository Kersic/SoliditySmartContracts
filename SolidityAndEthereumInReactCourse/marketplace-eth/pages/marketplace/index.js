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
import { withToast } from "@utils/toast"


export default function Marketplace({ courses }) {
  const { web3, contract, requireInstall } = useWeb3()
  const { hasConnectedWallet, isConnecting, account } = useWalletInfo()
  const { ownedCourses } = useOwnedCourses(courses, account.data)

  const [selectedCourse, setSelectedCourse] = useState(null)
  const [busyCourseId, setBusyCourseId] = useState(null)
  const [isNewPurchase, setIsNewPurchase] = useState(true)

  const purchaseCourse = async (order, course) => {
    const hexCourseId = web3.utils.utf8ToHex(course.id)
    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    )

    const value = web3.utils.toWei(String(order.price))

    setBusyCourseId(course.id)
    if (isNewPurchase) {
      const emailHash = web3.utils.sha3(order.email)
      const proof = web3.utils.soliditySha3(
        { type: "bytes32", value: emailHash },
        { type: "bytes32", value: orderHash }
      )

      withToast(_purchaseCourse({ hexCourseId, proof, value }, course))
    } else {
      withToast(_repurchaseCourse({ courseHash: orderHash, value }, course))
    }
  }

  const _purchaseCourse = async ({ hexCourseId, proof, value }, course) => {
    try {
      const result = await contract.methods.purchaseCourse(
        hexCourseId,
        proof
      ).send({ from: account.data, value })

      ownedCourses.swrRes.mutate([
        ...ownedCourses.data, {
          ...course,
          proof,
          state: "purchased",
          owner: account.data,
          price: value
        }
      ])

      return result
    } catch (error) {
      throw new Error(error.message)
    } finally {
      setBusyCourseId(null)
    }
  }

  const _repurchaseCourse = async ({ courseHash, value }, course) => {
    try {
      const result = await contract.methods.repurchaseCourse(
        courseHash
      ).send({ from: account.data, value })
      const index = ownedCourses.swrRes.data.findIndex(c => c.id === course.id)

      if (index >= 0) {
        ownedCourses.swrRes.data[index].state = "purchased"
        ownedCourses.swrRes.mutate(ownedCourses.swrRes.data)
      } else {
        ownedCourses.swrRes.mutate()

      }

      return result
    } catch (error) {
      throw new Error(error.message)
    } finally {
      setBusyCourseId(null)
    }
  }

  const cleanupModal = () => {
    setSelectedCourse(null)
    setIsNewPurchase(true)
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
                    <Button
                      variant="white"
                      disabled={true}
                      size="sm">
                      Loading State...
                    </Button>
                  )
                }

                const isBusy = busyCourseId === course.id
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
                              disabled={isBusy}
                              onClick={() => {
                                setIsNewPurchase(false)
                                setSelectedCourse(course)
                              }}
                              variant="purple">
                              {isBusy ?
                                <div className="flex">
                                  <Loader size="sm" />
                                  <div className="ml-2">In Progress</div>
                                </div> :
                                <div>Fund to Activate</div>
                              }
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
                    disabled={!hasConnectedWallet || isBusy}
                    size="sm"
                    variant="lightPurple">
                    {isBusy ?
                      <div className="flex">
                        <Loader size="sm" />
                        <div className="ml-2">In Progress</div>
                      </div> :
                      <div>Purchase</div>
                    }
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
          onSubmit={(formData, course) => {
            purchaseCourse(formData, course)
            cleanupModal()
          }}
          onClose={cleanupModal}
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