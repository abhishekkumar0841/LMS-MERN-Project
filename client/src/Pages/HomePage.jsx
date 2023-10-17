import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <HomeLayout>
      <div className=" text-white pt-10 flex items-center justify-center gap-10 mx-16 h-[90vh]">
        <div className=" w-1/2 space-y-6">
          <h1 className=" text-5xl font-semibold">
            Find Out Best
            <span className=" text-yellow-500 font-bold"> Online Courses</span>
          </h1>
          <p className="text-xl text-gray-200">
            We have a large library of courses taught by skilled and qualified
            Instructors
          </p>
          <div className=" space-x-6">
                <Link to={'/courses'}>
                    <button className=" bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-700 transition-all ease-in-out duration-300">Explore Courses</button>
                </Link>

                <Link to={'/contact'}>
                    <button className="border border-yellow-500  px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-700 transition-all ease-in-out duration-300">Contact Us</button>
                </Link>
          </div>
        </div>

        <div className="  w-1/2 flex justify-center items-center">
            <img src="https://tse4.mm.bing.net/th?id=OIP.XzeycZtcet-ze1II3WdY-QHaHE&pid=Api&P=0&h=380" alt="Home Page Image" />
        </div>
      </div>
    </HomeLayout>
  );
};

export default HomePage;