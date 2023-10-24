import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import CourseCard from "../../Components/CourseCard";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const CourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        <div className=" text-center text-2xl font-semibold mb-5 relative">
          <Link
            onClick={() => navigate(-1)}
            className=" hidden 2xl:block absolute top-0 left-[28%] text-4xl text-accent cursor-pointer link"
          >
            <AiOutlineArrowLeft />
          </Link>
          Explore the all courses made by
          <span className=" font-black text-yellow-500"> Industry experts</span>
        </div>

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
