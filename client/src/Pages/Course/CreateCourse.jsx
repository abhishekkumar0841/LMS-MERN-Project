import React, { useReducer, useState } from "react";
import { Link, useInRouterContext, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      //read image as a data url,,,,means--base 64 url-encoded
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.thumbnail ||
      !userInput.createdBy
    ) {
      toast.error("All fields are mandatory!");
      return;
    }

    const response = await dispatch(createNewCourse(userInput));

    if (response?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });
      navigate("/courses");
    }
  }

  return (
    <HomeLayout>
      <div className=" h-[100vh] flex items-center justify-center">
        <form
          onSubmit={onFormSubmit}
          className=" flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
        >
          <Link onClick={()=> navigate(-1)} className=" hidden sm:block absolute top-3 text-4xl text-accent cursor-pointer link">
            <AiOutlineArrowLeft />
          </Link>

          <h1 className=" text-center font-bold text-2xl">Create New Course</h1>

          <main className=" grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <div className=" gap-y-6">
              <div className=" w-full h-44 m-auto flex items-center justify-center border">
                <label htmlFor="image_uploads" className=" cursor-pointer">
                  {userInput.previewImage ? (
                    <img
                      src={userInput.previewImage}
                      className=" w-full h-44 m-auto border"
                    />
                  ) : (
                    <div>
                      <h1 className=" font-bold text-lg">
                        Upload your course thumbnail
                      </h1>
                    </div>
                  )}
                </label>

                <input
                  type="file"
                  className=" hidden"
                  id="image_uploads"
                  accept=".jpg, .jpeg, .png"
                  name="image_uploads"
                  onChange={handleImageUpload}
                />
              </div>

              <div className=" flex flex-col gap-1 mt-4">
                <label htmlFor="title" className=" text-lg font-semibold">
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  name="title"
                  id="title"
                  placeholder="Enter Course Title"
                  className=" bg-transparent px-2 py-1 border"
                  value={userInput.title}
                  onChange={handleUserInput}
                />
              </div>
            </div>

            <div className=" flex flex-col md:gap-1 gap-4 mt-4 md:mt-0">
              <div className=" flex flex-col gap-1">
                <label htmlFor="createdBy" className=" text-lg font-semibold">
                  Course Instructor
                </label>
                <input
                  type="text"
                  required
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter Course Instructor"
                  className=" bg-transparent px-2 py-1 border"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                />
              </div>

              <div className=" flex flex-col gap-1">
                <label htmlFor="category" className=" text-lg font-semibold">
                  Course Category
                </label>
                <input
                  type="text"
                  required
                  name="category"
                  id="category"
                  placeholder="Enter Course Category"
                  className=" bg-transparent px-2 py-1 border"
                  value={userInput.category}
                  onChange={handleUserInput}
                />
              </div>

              <div className=" flex flex-col gap-1">
                <label htmlFor="description" className=" text-lg font-semibold">
                  Course Description
                </label>
                <textarea
                  required
                  name="description"
                  id="description"
                  placeholder="Enter Course description"
                  className=" bg-transparent px-2 py-1 border overflow-y-scroll resize-none h-24"
                  value={userInput.description}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </main>

          <button
            type="submit"
            className=" w-full bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 ease-in-out py-2 rounded-sm font-semibold text-lg cursor-pointer"
          >
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default CreateCourse;
