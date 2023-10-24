import React from "react";
import {TypeAnimation} from "react-type-animation";

const TypingText = () => {
  return (
    <div>
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed once, initially
          "Best Online Courses",
          1000,
          "& Learn With Skilled Instructors",
          1000,
        ]}
        speed={200}
        style={{ fontSize: "1em" }}
        className=" text-yellow-500"
        repeat={Infinity}
      />
    </div>
  );
};

export default TypingText;
