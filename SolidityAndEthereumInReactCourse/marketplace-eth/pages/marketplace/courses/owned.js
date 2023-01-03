import Button from "@components/common/button"
import Message from "@components/common/message"
import BaseLayout from "@components/layout/baseLayout"
import MarketplaceHeader from "@components/marketplace/marketplaceHeader"
import OwnedCourseCard from "@components/other/ownedCourseCard"
import { getAllCourses } from "@content/fetcher"
import { useAccount } from "hooks/useAccount"
import { useOwnedCourses } from "hooks/useOwnedCourses"


export default function OwnedCourses({courses}) {
    const { account } = useAccount()
    const { ownedCourses } = useOwnedCourses(courses, account.data)

  return (
    <>
      <div className="py-4">
        <MarketplaceHeader />
      </div>
      <section className="grid grid-cols-1">
        { ownedCourses.swrRes.data?.map(course =>
            <OwnedCourseCard
              key={course.id}
              course={course}
            >
              <Button>
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