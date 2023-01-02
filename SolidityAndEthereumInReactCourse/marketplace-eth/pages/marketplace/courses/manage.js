import BaseLayout from "@components/layout/baseLayout"
import MarketplaceHeader from "@components/marketplace/marketplaceHeader"
import OwnedCourseCard from "@components/other/ownedCourseCard"


export default function ManageCourses() {

  return (
    <>
      <div className="py-4">
        <MarketplaceHeader />
      </div>
      <section className="grid grid-cols-1">
        <OwnedCourseCard />
      </section>
    </>
  )
}

ManageCourses.Layout = BaseLayout