import React from "react";

const CarouselSlide = ({
  image,
  title,
  description,
  slideNumber,
  totalSlides,
}) => {
  return (
    <div id={`slide${slideNumber}`} className="carousel-item relative w-full">
      <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
        <img
          src={image}
          className="w-40 rounded-full border-2 border-green-400"
        />
        <p className=" text-xl text-gray-200 text-center">{description}</p>
        <h3 className=" text-2xl font-semibold">{title}</h3>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a
            href={`#slide${slideNumber === 1 ? totalSlides : slideNumber - 1}`}
            className="btn btn-circle"
          >
            ❮
          </a>

          {/* I commented this logic because it is little bit tough to understand, second one is good option👍  */}
          {/* <a href={`#slide${(slideNumber) % totalSlides + 1}`} className="btn btn-circle">
            ❯
          </a> */}

          <a
            href={`#slide${slideNumber < totalSlides ? (slideNumber + 1) : 1}`}
            className="btn btn-circle"
          >
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarouselSlide;
