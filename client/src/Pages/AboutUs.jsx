import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImage from "../assets/Images/aboutMainImage.png";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData";

const AboutUs = () => {
  const totalSlides = celebrities.length;
  
  return (
    <HomeLayout>
      <div className=" pl-20 pt-20 flex flex-col text-white">
        <div className=" flex items-center gap-5 mx-10">
          <section className=" w-[60%] space-y-10">
            <h1 className=" text-5xl text-yellow-500 font-semibold">
              Affordable and Quality Education
            </h1>
            <p className=" text-xl text-gray-200">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Asperiores, deserunt illo sed nemo voluptatem magni eos eveniet
              dignissimos natus dolorem culpa explicabo perferendis incidunt
              voluptate minima, aspernatur aliquam ad omnis.
            </p>
          </section>

          <div className=" w-1/2">
            <img
              src={aboutMainImage}
              alt="About Main Image"
              id="test1"
              style={{ filter: "drop-shadow(0px 10px 10px rgb(0,0,0))" }}
              className=" drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Carousal(about us page) */}
        <div className="carousel w-1/2 m-auto">
          {
            celebrities && celebrities.map((celebrity, index) => (
              <CarouselSlide {...celebrity} key={index} totalSlides={totalSlides} />
            ))
          }
        </div>
      </div>
    </HomeLayout>
  );
};

export default AboutUs;
