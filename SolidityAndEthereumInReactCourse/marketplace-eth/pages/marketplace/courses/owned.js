import Button from "@components/common/button"
import Message from "@components/common/message"
import BaseLayout from "@components/layout/baseLayout"
import MarketplaceHeader from "@components/marketplace/marketplaceHeader"
import OwnedCourseCard from "@components/other/ownedCourseCard"
import { getAllCourses } from "@content/fetcher"
import { useAccount } from "hooks/useAccount"
import { useOwnedCourses } from "hooks/useOwnedCourses"
import Link from "next/link"
import { useRouter } from "next/router"
import { useWeb3 } from "providers/web3"


export default function OwnedCourses({ courses }) {
  const { account } = useAccount()
  const { ownedCourses } = useOwnedCourses(courses, account.data)
  const router = useRouter()
  const { requireInstall } = useWeb3()

  return (
    <>
      <div className="py-4">
        <MarketplaceHeader />
      </div>
      <section className="grid grid-cols-1">
        {!ownedCourses.swrRes.data || ownedCourses?.swrRes.data.length === 0 &&
          <div className="w-1/2">
            <Message type="warning">
              <div>You don't own any courses</div>
              <Link href="/marketplace" className="font-normal hover:underline">
                <i>Purchase Course</i>
              </Link>
            </Message>
          </div>
        }
        {account.isEmpty &&
          <div className="w-1/2">
            <Message type="warning">
              <div>Please connect to Metamask</div>
            </Message>
          </div>
        }
        {requireInstall &&
          <div className="w-1/2">
            <Message type="warning">
              <div>Please install Metamask</div>
            </Message>
          </div>
        }
        {ownedCourses.swrRes.data?.map(course =>
          <OwnedCourseCard
            key={course.id}
            course={course}
          >
            <Button
              onClick={() => router.push(`/courses/${course.slug}`)}
            >
              Watch the course
            </Button>
          </OwnedCourseCard>
        )}
      </section>
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

OwnedCourses.Layout = BaseLayout