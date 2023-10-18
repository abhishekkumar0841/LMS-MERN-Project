import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleUserInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  function getImage(e) {
    //getting the image
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });

      console.log("Printing signup data->", signupData)

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        console.log("File reader result->", this.result)
        setPreviewImage(this.result);
      });
    }
  }

  async function createNewAccount(e) {
    e.preventDefault();

    if (!signupData.fullName || !signupData.email || !signupData.password) {
      toast.error("Please fill all the fields!");
      return;
    }

    //validating the field length
    if (signupData.fullName.length < 3) {
      toast.error("Name should be at least of 3 characters!");
      return;
    }

    //validating email
    if (!signupData.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
      toast.error("Invalid Email Id!");
    }

    //validate password
    if (!signupData.password.match(/^(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,16}$/)) {
      toast.error(
        "Password should be 6-16 characters with at least 1 uppercase & 1 special character"
      );
      return;
    }

    //if all fields are valid the capture the data of form using FormData()
    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    //dispatch createAccount action
    const response = await dispatch(createAccount(formData));
    console.log("PRINTING RESPONSE from Signup.jsx->", response);

    if (response?.payload?.success) {
      navigate("/login");
    }

    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });

    setPreviewImage("");
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={createNewAccount}
          className="flex flex-col justify-center items-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>

          <label htmlFor="image_uploads" className=" cursor-pointer">
            {previewImage ? (
              <img
                src={previewImage}
                className="w-24 h-24 rounded-full m-auto"
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>

          <input
            onChange={getImage}
            type="file"
            className="hidden"
            accept=".jpg, .jpeg, .png, .svg"
            name="image_uploads"
            id="image_uploads"
          />

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="fullName" className=" font-semibold">
              FullName
            </label>
            <input
              value={signupData.fullName}
              onChange={handleUserInput}
              type="fullName"
              name="fullName"
              id="fullName"
              placeholder="Enter Your Full Name"
              className=" bg-transparent px-2 py-1 border rounded-sm"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className=" font-semibold">
              Email
            </label>
            <input
              value={signupData.email}
              onChange={handleUserInput}
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              className=" bg-transparent px-2 py-1 border rounded-sm"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="password" className=" font-semibold">
              Password
            </label>
            <input
              value={signupData.password}
              onChange={handleUserInput}
              type=""
              name="password"
              id="password"
              placeholder="Enter Your Password"
              className=" bg-transparent px-2 py-1 border rounded-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-yellow-600 hover:bg-yellow-500 px-6 py-2 font-semibold tab-lg transition-all duration-300 ease-in-out rounded-sm"
          >
            Create Account
          </button>

          <p className=" text-center flex items-center justify-between gap-5">
            Already have an account?{" "}
            <Link to={"/login"} className="text-accent font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Signup;
