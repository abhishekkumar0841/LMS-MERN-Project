import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseLectures,
  getCourseLectures,
} from "../../Redux/Slices/LectureSlice";

const DisplayLectures = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();

  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    if (!state) {
      navigate("/courses");
    }
    console.log("STATE IS --> ", state);
    dispatch(getCourseLectures(state._id));
  }, []);

  const onLectureDelete = async (courseId, lectureId) => {
    console.log(courseId, lectureId);
    await dispatch(
      deleteCourseLectures({ courseId: courseId, lectureId: lectureId })
    );
    await dispatch(getCourseLectures(courseId));
  };

  return (
    <HomeLayout>
      <div className=" flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-5">
        <div className=" text-center text-2xl font-semibold text-yellow-500">
          Course Name {state?.title}
        </div>

        {lectures.length > 0 && (
          <div className=" flex justify-center w-full gap-10">
            {/* leftSection for playing videos and displaying course details to admin */}
            <div className=" space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
              <video
                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
                className=" object-fill rounded-tl-lg rounded-tr-lg w-full"
              ></video>
              <div>
                <h1>
                  <span className=" text-yellow-500 "> Title: </span>
                  {lectures && lectures[currentVideo]?.title}
                </h1>
                <p>
                  <span className=" text-yellow-500 line-clamp-4">
                    Description:{" "}
                  </span>
                  {lectures && lectures[currentVideo]?.description}
                </p>
              </div>
            </div>

            {/* rightSection for displaying list of lectures */}
            <ul className=" w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
              <li className=" font-semibold text-xl text-yellow-500 flex items-center justify-between">
                <p>Lectures List</p>
                {role === "Admin" && (
                  <button
                    onClick={() =>
                      navigate("/course/addlecture", { state: { ...state } })
                    }
                    className=" btn-primary px-2 py-1 rating-md text-sm font-semibold"
                  >
                    Add new lecture
                  </button>
                )}
              </li>
              {lectures &&
                lectures.map((lecture, idx) => (
                  <li className=" space-y-2" key={lecture._id}>
                    <p
                      className=" cursor-pointer"
                      onClick={() => setCurrentVideo(idx)}
                    >
                      <span> Lecture {idx + 1} : </span>
                      {lecture?.title}
                    </p>
                    {role === "Admin" && (
                      <button
                        onClick={() =>
                          onLectureDelete(state?._id, lecture?._id)
                        }
                        className=" btn-accent px-2 py-1 rating-md text-sm font-semibold"
                      >
                        Delete lecture
                      </button>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default DisplayLectures;
