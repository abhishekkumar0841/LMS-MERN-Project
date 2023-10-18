import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import CourseCard from "../../Components/CourseCard";

const CourseList = () => {
  const dispatch = useDispatch();

  const { courseData } = useSelector((state) => state.course);

  async function loadCourses() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    loadCourses();
  }, []);

  return (
      <HomeLayout>
        <div className=" min-h-[90vh] pt-20 flex flex-col gap-10 text-white">
          <h1 className=" text-center text-2xl font-semibold mb-5">
            Explore the all courses made by
            <span className=" font-black text-yellow-500">
              {" "}Industry experts
            </span>
          </h1>

          <div className=" mb-10 flex flex-wrap items-center justify-center gap-14">
            {courseData?.map((element) => (
              <CourseCard key={element._id} data={element} />
            ))}
          </div>
        </div>
      </HomeLayout>
  );
};

export default CourseList;
