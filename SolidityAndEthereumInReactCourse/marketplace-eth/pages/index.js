import Hero from "@components/common/hero"
import List from "@components/course/list"
import BaseLayout from "@components/layout/baseLayout"
import { getAllCourses } from "content/fetcher"
import CourseCard from "@components/course/card"

export default function Home({courses}) {
  return (
    <>
      <Hero/>
      <List courses={courses}>
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

Home.Layout = BaseLayout