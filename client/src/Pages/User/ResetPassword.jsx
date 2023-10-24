import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";
import { isValidPassword } from "../../Helpers/regexMatcher";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const [textInput, setTextInput] = useState({
    password: "",
    confirmPassword: "",
  });

  function onChange(e) {
    const { name, value } = e.target;
    setTextInput({
      ...textInput,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!textInput.password || !textInput.confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (textInput.password !== textInput.confirmPassword) {
      toast.error("New password and confirm new password should be same!");
      return;
    }

    if (!isValidPassword(textInput.password)) {
      toast.error("Choose strong and unique password!");
      return;
    }

    const res = await dispatch(resetPassword([resetToken, textInput]));
    if (res?.payload?.success) {
      navigate("/login");
    }

    setTextInput({
      password: "",
      confirmPassword: "",
    });
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function hideAndShowPassword() {
    setShowPassword(!showPassword);
  }

  function hideAndConfirmShowPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  return (
    <div className=" flex items-center justify-center min-h-[100vh]">
      <form
        onSubmit={handleSubmit}
        noValidate
        className=" text-white shadow-[0_0_10px_black] p-5 flex flex-col justify-center gap-4"
      >
        <h1 className=" text-yellow-500 font-bold text-3xl">
          Reset Your Password
        </h1>
        <div className=" flex flex-col gap-2 relative">
          <label htmlFor="resetPassword" className=" text-lg justify-start">
            New Password
          </label>
          <input
            className=" px-4 py-2 border bg-transparent"
            type={!showPassword ? "password" : "text"}
            name="password"
            id="newPassword"
            placeholder="Enter Your New Password"
            value={textInput.password}
            onChange={onChange}
          />
          <div
            onClick={hideAndShowPassword}
            className=" absolute top-12 text-lg right-2"
          >
            {!showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </div>
        </div>

        <div className=" flex flex-col gap-2 relative">
          <label
            htmlFor="confirmNewPassword"
            className=" text-lg justify-start"
          >
            Confirm New Password
          </label>
          <input
            className=" px-4 py-2 border bg-transparent"
            type={!showConfirmPassword ? "password" : "text"}
            name="confirmPassword"
            id="confirmNewPassword"
            placeholder="Confirm New Password"
            value={textInput.confirmPassword}
            onChange={onChange}
          />
          <div
            onClick={hideAndConfirmShowPassword}
            className=" absolute top-12 text-lg right-2"
          >
            {!showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </div>
        </div>

        <div className=" w-full">
          <button
            className=" w-full bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 ease-in-out py-2 px-4 rounded-md font-semibold text-xl"
            type="submit"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
