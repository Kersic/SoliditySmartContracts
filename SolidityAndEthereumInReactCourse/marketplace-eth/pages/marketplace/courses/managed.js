import Button from "@components/common/button"
import Message from "@components/common/message"
import CourseFilter from "@components/course/filter"
import BaseLayout from "@components/layout/baseLayout"
import MarketplaceHeader from "@components/marketplace/marketplaceHeader"
import ManagedCourseCard from "@components/other/managedCourseCard"
import { useAccount } from "hooks/useAccount"
import { useAdmin } from "hooks/useAdmin"
import { useManagedCourses } from "hooks/useManagedCourses"
import { useWeb3 } from "providers/web3"
import { useState } from "react"

const VerificationInput = ({ onVerify }) => {
  const [email, setEmail] = useState("")

  return (
    <div className="flex mr-2 relative rounded-md">
      <input
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        type="text"
        name="account"
        id="account"
        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
        placeholder="0x2341ab..." />
      <Button
        onClick={() => {
          onVerify(email)
        }}
      >
        Verify
      </Button>
    </div>
  )
}


export default function ManageCourses() {
  const [proofedOwnership, setProofedOwnership] = useState({})
  const { web3 } = useWeb3()
  const { account } = useAdmin({redirectTo: "/marketplace"})
  const { managedCourses } = useManagedCourses(account)

  const verifyCourse = (email, { hash, proof }) => {
    const emailHash = web3.utils.sha3(email)
    const proofToCheck = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: hash }
    )

    proofToCheck === proof ?
      setProofedOwnership({
        [hash]: true
      }) :
      setProofedOwnership({
        [hash]: false
      })
  }

  if (!account.isAdmin) {
    return null
  }

  return (
    <>
      <MarketplaceHeader />
      <CourseFilter />
      <section className="grid grid-cols-1">
        {managedCourses.swrRes.data?.map(course =>
          <ManagedCourseCard
            key={course.ownedCourseId}
            course={course}
          >
            <VerificationInput
              onVerify={email => {
                verifyCourse(email, {
                  hash: course.hash,
                  proof: course.proof
                })
              }}
            />
            {proofedOwnership[course.hash] &&
              <div className="mt-2">
                <Message>
                  Verified!
                </Message>
              </div>
            }
            {proofedOwnership[course.hash] === false &&
              <div className="mt-2">
                <Message type="danger">
                  Wrong Proof!
                </Message>
              </div>
            }
          </ManagedCourseCard>
        )}
      </section>
    </>
  )
}

ManageCourses.Layout = BaseLayout