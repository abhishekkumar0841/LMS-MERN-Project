import React, { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { changePassword } from "../../Redux/Slices/AuthSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputText, setInputText] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [oldPassword, setOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);

  function onInputChange(e) {
    const { name, value } = e.target;
    setInputText({
      ...inputText,
      [name]: value,
    });
  }

  function toggleOldPassword() {
    setOldPassword(!oldPassword);
  }

  function toggleNewPassword() {
    setNewPassword(!newPassword);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputText);
    const res = await dispatch(changePassword(inputText));
    console.log("Res of change password->", res);

    if (res?.payload?.success) {
      setInputText({
        oldPassword: "",
        newPassword: "",
      });
      navigate('/user/profile')
    }
  }

  return (
    <HomeLayout>
      <div className=" min-h-[90vh] flex items-center justify-center">
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center font-semibold text-2xl">
            Change Password
          </h1>
          <div className=" flex flex-col relative">
            <label
              htmlFor="oldPassword"
              className=" text-xl font-semibold mb-2"
            >
              Old Password
            </label>
            <input
              type={`${oldPassword ? "text" : "password"}`}
              name="oldPassword"
              value={inputText.oldPassword}
              onChange={onInputChange}
              placeholder="Enter your old password"
              className=" bg-transparent border px-3 py-1"
            />

            {!oldPassword ? (
              <AiFillEyeInvisible
                onClick={toggleOldPassword}
                className="absolute right-2 top-11 text-xl"
              />
            ) : (
              <AiFillEye
                onClick={toggleOldPassword}
                className="absolute right-2 top-11 text-xl"
              />
            )}
          </div>

          <div className=" flex flex-col relative">
            <label
              htmlFor="newPassword"
              className=" text-xl font-semibold mb-2"
            >
              New Password
            </label>
            <input
              type={`${newPassword ? "text" : "password"}`}
              name="newPassword"
              value={inputText.newPassword}
              onChange={onInputChange}
              placeholder="Enter your new password"
              className=" bg-transparent border px-3 py-1"
            />

            {!newPassword ? (
              <AiFillEyeInvisible
                onClick={toggleNewPassword}
                className="absolute right-2 top-11 text-xl"
              />
            ) : (
              <AiFillEye
                onClick={toggleNewPassword}
                className="absolute right-2 top-11 text-xl"
              />
            )}
          </div>

          <button
            type="submit"
            className=" bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 ease-in-out py-2 text-white rounded-sm text-lg"
          >
            Change Password
          </button>

          <Link to={"/user/profile"}>
            <p className="flex items-center justify-center gap-4 w-full text-accent cursor-pointer">
              <AiOutlineArrowLeft /> Go Back to Your Profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ChangePassword;
