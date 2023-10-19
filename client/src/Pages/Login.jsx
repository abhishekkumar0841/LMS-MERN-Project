import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../Redux/Slices/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  async function onLogin(e) {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the fields!");
      return;
    }

    //dispatch login action
    const response = await dispatch(login(loginData));
    console.log("PRINTING RESPONSE from Login.jsx->", response);

    if (response?.payload?.success) {
      navigate("/");
    }

    setLoginData({
      email: "",
      password: "",
    });
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={onLogin}
          className="flex flex-col justify-center items-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Login Page</h1>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className=" font-semibold">
              Email
            </label>
            <input
              value={loginData.email}
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
              value={loginData.password}
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
            Login
          </button>

          <p className=" text-center flex items-center justify-between gap-5">
            Do not have an account?{" "}
            <Link to={"/signup"} className="text-accent font-semibold">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Login;