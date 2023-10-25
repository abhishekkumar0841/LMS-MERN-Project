import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    previewImage: "",
    fullName: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?._id),
  });

  function handleImageUpload(e) {
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!data.fullName && !data.avatar) {
      toast.error("Nothing here to update");
      return;
    }

    if (data.fullName && data.fullName.length < 2) {
      toast.error("Enter your proper name for update");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);

    await dispatch(updateProfile([data.userId, formData]));

    await dispatch(getUserData());

    navigate("/user/profile");
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className=" text-center font-semibold text-2xl">Edit Profile</h1>
          <label htmlFor="image_uploads" className=" cursor-pointer">
            {data.previewImage ? (
              <img
                className=" w-28 h-28 m-auto rounded-full"
                src={data.previewImage}
              />
            ) : (
              <BsPersonCircle className=" w-28 h-28 rounded-full m-auto" />
            )}
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="hidden"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .jpeg, .png"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className=" text-lg font-semibold">
              Full Name
            </label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Enter Your Name"
              className=" bg-transparent px-2 py-1 border"
              value={data.fullName}
              onChange={handleInputChange}
            />
          </div>
          <button
            className=" w-full bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 ease-in-out rounded-sm py-2 text-lg cursor-pointer"
            type="submit"
          >
            Update Profile
          </button>
          <Link to={"/user/profile"}>
            <p className=" w-full text-accent cursor-pointer flex items-center justify-center gap-2">
              {" "}
              <AiOutlineArrowLeft /> Go Back To Your Profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
};

export default EditProfile;
