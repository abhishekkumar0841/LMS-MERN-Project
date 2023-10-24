import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImage from "../assets/Images/aboutMainImage.png";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData";

const AboutUs = () => {
  const totalSlides = celebrities.length;

  return (
    <HomeLayout>
      <div className=" py-20 flex flex-col text-white min-h-[90vh] m-auto">
        <div className=" flex  mx-auto w-[80%] items-center flex-col lg:flex-row gap-5 ">
          <section className=" w-full md:w-[60%] space-y-10 text-center lg:text-left">
            <h1 className=" text-3xl md:text-5xl text-yellow-500 font-semibold">
              Affordable and Quality Education
            </h1>
            <p className=" text-xl text-gray-200">
              Welcome to Tech Edu, your gateway to a world of limitless learning
              possibilities. We are not just another learning management system;
              we are your partners in the journey of education and personal
              growth. In an era where knowledge is key, we understand the
              importance of accessible and quality education. That's why we have
              created a platform where learning meets innovation, where
              curiosity is nurtured, and where skills are honed for the
              challenges of the modern world.{" "}
              </p>
              <p className=" text-xl text-gray-200">
                At Tech Edu, we are driven by a passion for education and a
                commitment to excellence. Our platform, built with the robust
                MERN stack, offers a seamless learning experience tailored to
                your needs. Whether you are a student looking to enhance your
                academic knowledge, a professional aiming to upskill, or an
                educator seeking to inspire, Tech Edu is here to support your
                goals. Our diverse range of courses, interactive modules, and
                expert instructors ensure that your learning journey is not just
                enriching but transformative.
              </p>{" "}
              <p className=" text-xl text-gray-200">
              Join us, and let's embark on a learning adventure together.
              Empower your mind, unlock your potential, and shape a brighter
              future. With Tech Edu, education is not just a destination; it's a
              lifelong exploration. Start your journey with us today.
              </p>
            
          </section>

          <div className=" w-full sm:w-1/2 ">
            <img
              src={aboutMainImage}
              alt="About Main Image"
              id="test1"
              style={{ filter: "drop-shadow(0px 10px 10px rgb(0,0,0))" }}
              className=" drop-shadow-2xl sm:w-auto"
            />
          </div>
        </div>

        {/* Carousal(about us page) */}
        <div className="carousel w-full md:w-1/2  m-auto my-10">
          {celebrities &&
            celebrities.map((celebrity, index) => (
              <CarouselSlide
                {...celebrity}
                key={index}
                totalSlides={totalSlides}
              />
            ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default AboutUs;
