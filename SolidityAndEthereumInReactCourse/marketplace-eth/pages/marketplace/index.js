import Breadcrumbs from "@components/common/breadcrumbs"
import Button from "@components/common/button"
import OrderModal from "@components/common/Modal/orderModal"
import CourseCard from "@components/course/card"
import List from "@components/course/list"
import BaseLayout from "@components/layout/baseLayout"
import MarketplaceHeader from "@components/marketplace/marketplaceHeader"
import { getAllCourses } from "content/fetcher"
import { useWalletInfo } from "hooks/useWalletInfo"
import { useState } from "react"


export default function Marketplace({courses}) {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const { canPurchaseCourse } = useWalletInfo()

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