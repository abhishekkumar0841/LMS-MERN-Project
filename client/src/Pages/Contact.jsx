import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { isEmail, isValidPassword } from "../Helpers/regexMatcher";
import axiosInstance from "../Helpers/axiosInstance";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All Fields Are Mandatory!");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("Please provide us a valid email!");
      return;
    }

    try {
      const response = axiosInstance.post("/contact", userInput);
      toast.promise(response, {
        loading: "Sending Message",
        success: "Message send successfully, We connect with you ASAP",
        error: "Message cannot be send, try again",
      });

      const contactResponse = await response;

      if (contactResponse?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Error while sending message, try again later");
    }
  }

  return (
    <HomeLayout>
      <div className=" flex items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          noValidate
          className=" flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem] relative"
        >
          <Link
            onClick={() => navigate(-1)}
            className=" absolute top-5 left-2 text-4xl text-accent cursor-pointer link"
          >
            <AiOutlineArrowLeft />
          </Link>
          <h1 className=" text-3xl font-semibold">Contact Form</h1>

          <div className="flex flex-col w-full gap-1 ">
            <label htmlFor="name" className=" text-lg font-semibold">
              Name
            </label>
            <input
              value={userInput.name}
              onChange={handleInput}
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name"
              className=" bg-transparent border px-2 py-1 rounded-sm"
            />
          </div>

          <div className="flex flex-col w-full gap-1 ">
            <label htmlFor="email" className=" text-lg font-semibold">
              Email
            </label>
            <input
              value={userInput.email}
              onChange={handleInput}
              type="text"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              className=" bg-transparent border px-2 py-1 rounded-sm"
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message">Message</label>
            <textarea
              value={userInput.message}
              onChange={handleInput}
              name="message"
              id="message"
              className=" bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
            ></textarea>
          </div>

          <button
            type="submit"
            className=" w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold tab-lg cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Contact;
