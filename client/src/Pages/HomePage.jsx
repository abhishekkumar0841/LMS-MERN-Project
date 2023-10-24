import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import homePageMainImage from "../assets/Images/homePageMainImage.png";
// import TypingText from "../Components/TypingText";
import { TypeAnimation } from "react-type-animation";

const HomePage = () => {
  return (
    <HomeLayout>
      <div className=" text-white py-4 sm:py-10 px-4 sm:px-10 flex flex-col md:flex-row items-center justify-center gap-10 mx-auto sm:mx-16 min-h-[90vh] text-center md:text-left overflow-x-hidden">
        <div className=" w-full md:w-1/2 space-y-6">
          <h1 className="lg:text-5xl md:text-4xl text-3xl font-semibold">
            Welcome To{" "}
            <span className=" font-bold text-yellow-500">Tech. Edu.</span>
            <p className=" text-lg text-gray-600 px-[21%] font-bold tracking-widest">an Educational Platform</p>
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
              <button className=" bg-yellow-500 px-2 py-1 lg:px-5 lg:py-3 rounded-md font-semibold text-lg lg:text-xl cursor-pointer hover:bg-yellow-700 transition-all ease-in-out duration-300">
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

        <div className="w-[400px] md:w-1/2 flex justify-center items-center">
          <img
            src={homePageMainImage}
            alt="Home Page Image"
            className="h-[200px] md:h-auto"
          />
        </div>
      </div>
    </HomeLayout>
  );
};

export default HomePage;
