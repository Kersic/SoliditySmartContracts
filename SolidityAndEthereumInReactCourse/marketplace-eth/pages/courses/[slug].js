import Modal from "@components/common/modal";
import CourseHero from "@components/course/courseHero";
import Curriculum from "@components/course/curriculum";
import Keypoints from "@components/course/keypoints";
import BaseLayout from "@components/layout/baseLayout";
import { getAllCourses } from "@content/fetcher.js";

export default function Course({ course }) {

  return (
    <>
      <div className="py-4">
        <CourseHero
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>
      <Keypoints
        points={course.wsl}
      />
      <Curriculum
        locked={true}
      />
      <Modal />
    </>
  )
}

export function getStaticPaths() {
  const { data } = getAllCourses()

  return {
    paths: data.map(c => ({
      params: {
        slug: c.slug
      }
    })),
    fallback: false
  }
}


export function getStaticProps({ params }) {
  const { data } = getAllCourses()
  const course = data.filter(c => c.slug === params.slug)[0]

  return {
    props: {
      course
    }
  }
}


Course.Layout = BaseLayout