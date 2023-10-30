import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import banner from "../assets/videos/banner.mp4";
import toast from "react-hot-toast";
import girlStudent from "../assets/Images/girlStudent.webp";
import instructorImg from "../assets/Images/Instructor.png";

const HomePage = () => {
  return (
    <HomeLayout>
      <>
        <div className=" text-white py-14  sm:py-12 px-4 sm:px-10 flex flex-col lg:flex-row items-center justify-center gap-10 mx-auto sm:mx-16 min-h-[100vh] text-center md:text-left overflow-x-hidden">
          <div className=" w-full lg:w-1/2 space-y-6">
            <h1 className="lg:text-5xl md:text-4xl text-3xl font-semibold relative">
              Welcome To{" "}
              <span className=" font-bold text-yellow-500">Tech. Edu.</span>
              <p className=" text-lg text-gray-600 font-bold tracking-widest md:absolute ">
                an Educational Platform
              </p>
            </h1>
            <h2 className=" lg:text-5xl md:text-4xl text-3xl font-semibold">
              Find Out Best Online Courses & Learn With
              {/* <TypingText/> */}
              <div className=" font-bold my-2">
                <TypeAnimation
                  sequence={[
                    // Same substring at the start will only be typed once, initially
                    " Skilled",
                    1000,
                    " Qualified",
                    1000,
                    "& Experienced",
                    1000,
                  ]}
                  speed={200}
                  style={{ fontSize: "1em" }}
                  className=" text-yellow-500"
                  repeat={Infinity}
                />
              </div>
              Instructors
            </h2>

            <div className=" flex gap-5 md:gap-10 justify-center md:justify-start md:flex-row flex-col">
              <Link to={"/courses"}>
                <button className=" bg-yellow-500 px-2 py-1 lg:px-5 lg:py-3 rounded-md font-semibold text-lg lg:text-xl cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                  Explore Courses
                </button>
              </Link>

              <Link to={"/contact"}>
                <button className="border border-yellow-500 px-2 py-1 lg:px-5 lg:py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-700 transition-all ease-in-out duration-300">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center items-center  shadow-[0_0_10px_blue] p-6 rounded-xl">
            <img
              src={instructorImg}
              alt="Home Page Image"
              className="h-[200px] md:h-auto rounded-xl"
            />
          </div>
        </div>

        {/* SECTION TWO */}
        <div className=" flex flex-col items-center justify-center py-10 px-4 sm:px-10">
          {/* video section */}
          <div className=" w-full lg:w-[70%] shadow-[0_0_10px_blue] rounded-2xl p-5 flex items-center justify-center">
            <video autoPlay muted loop className=" w-full rounded-2xl">
              <source src={banner} type="video/mp4" />
            </video>
          </div>
          <button
            onClick={() => toast.success("Fill this form to become an admin")}
            className="bg-yellow-500 px-2 py-1 lg:px-5 lg:py-3 rounded-md font-semibold text-lg lg:text-xl cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300 mt-4 text-white"
          >
            Become an Admin
          </button>
        </div>

        {/* SECTION THIRD */}
        <div className="  flex justify-between flex-col lg:flex-row  gap-10 min-h-[100vh] items-center py-10 px-4 sm:px-10">
          {/* image section */}
          <div className=" p-6 w-full lg:w-1/2 shadow-[0_0_10px_blue] rounded-xl h-auto lg:min-h-[60vh] flex items-center justify-center">
            <img
              src={girlStudent}
              alt="Student Image"
              className=" w-[65%] rounded-xl"
            />
          </div>

          {/* coding section */}
          <div className="flex gap-2 sm:gap-5 lg:gap-10 p-2 lg:p-6  w-full lg:w-1/2 shadow-[0_0_10px_blue] text-[16px] sm:text-lg lg:text-xl font-semibold sm:font-bold h-auto lg:min-h-[60vh] rounded-xl">
            <div className=" text-blue-900">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
              <p>9</p>
              <p>10</p>
              <p>11</p>
              <p>12</p>
              <p className=" xxs:hidden">13</p>
            </div>
            <div className="text-blue-700">
              <TypeAnimation
                sequence={[
                  `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <link rel="stylesheet" href="style.css">
                    <title>Example</title>
                </head>
                <body>
                    <div class="appLayout">
                        <h1>Counter App</h1>
                    </div>
                </body>
                </html>`,
                  1000,
                  "",
                ]}
                repeat={Infinity}
                cursor={true}
                omitDeletionAnimation={true}
                style={{
                  whiteSpace: "pre-line",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </>
    </HomeLayout>
  );
};

export default HomePage;
