import Button from "@components/common/button"
import Message from "@components/common/message"
import BaseLayout from "@components/layout/baseLayout"
import MarketplaceHeader from "@components/marketplace/marketplaceHeader"
import OwnedCourseCard from "@components/other/ownedCourseCard"


export default function OwnedCourses() {

  return (
    <>
      <div className="py-4">
        <MarketplaceHeader />
      </div>
      <section className="grid grid-cols-1">
        <OwnedCourseCard>
          <Message>
            My custom message!
          </Message>
          <Button>
            Watch the course
          </Button>
        </OwnedCourseCard>
      </section>
    </>
  )
}

OwnedCourses.Layout = BaseLayout