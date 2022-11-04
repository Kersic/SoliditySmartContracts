import Modal from "@components/common/modal";
import CourseHero from "@components/course/courseHero";
import Curriculum from "@components/course/curriculum";
import Keypoints from "@components/course/keypoints";
import BaseLayout from "@components/layout/baseLayout";

export default function Course() {
  
    return (
      <>
        <div className="py-4">
          <CourseHero />
        </div>
        <Keypoints />
        <Curriculum />
        <Modal />
      </>
    )
  }

  Course.Layout = BaseLayout