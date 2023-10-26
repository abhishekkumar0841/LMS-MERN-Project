import React, { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";
import { isEmail } from "../../Helpers/regexMatcher";

const ForgetPassword = () => {
  const dispatch = useDispatch();

  const [textInput, setTextInput] = useState({
    email: "",
  });

  //here i trying to send data(email) without object, but its not worked, so i have to make object then i can able to send it.
  function onChange(e) {
    const { name, value } = e.target;
    setTextInput({
      ...textInput,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!textInput.email) {
      toast.error("Please Enter Your Registered Email!");
      return;
    }

    if (!isEmail(textInput.email)) {
      toast.error("Invalid Email!");
      return;
    }

    const res = await dispatch(forgetPassword(textInput));

    if (res?.payload?.success) {
      toast.success(`Check ${textInput.email} for reset password link`);
    }

    setTextInput({
      email: "",
    });
  }

  return (
    <HomeLayout>
      <div className=" min-h-[90vh] flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          noValidate
          className=" text-white shadow-[0_0_10px_black] p-5 flex flex-col justify-center gap-4"
        >
          <div className=" flex flex-col items-center justify-center gap-2 mb-8">
            <h1 className=" text-yellow-500 font-bold text-3xl">
              Are you forget you password ?
            </h1>
            <p className=" text-gray-500 font-semibold">
              No problem, fill this form, we will solve your problem
            </p>
          </div>
          <div className=" flex flex-col gap-2">
            <label htmlFor="email" className=" text-lg justify-start">
              Enter your registered email :
            </label>
            <input
              className=" px-4 py-2 border bg-transparent"
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              value={textInput.email}
              onChange={onChange}
            />
          </div>
          <div className=" w-full text-center">
            <button
              className=" bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 ease-in-out py-2 px-4 rounded-md font-semibold text-xl"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ForgetPassword;
