import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs"; //bs means bootStrap icons
import { footerData } from "../Data/footerData";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  return (
    <>
      <footer className=" w-full px-10 py-8 bg-[#1f2937]">
        {/* Footer links section */}
        <div className="flex flex-col gap-8 sm:flex-row text-center sm:text-left justify-between md:justify-evenly  list-none">
          {/* subjects section */}
          <div className=" flex flex-col gap-2 items-center ">
            <h1 className=" text-xl sm:text-2xl font-bold text-center">{footerData[0].title}</h1>
            <div className=" bg-slate-400 h-[2px] w-[40%] sm:w-full "></div>
            <div>
              <div>
                {footerData[0].links.map((sub, index) => (
                  <li key={index} className=" font-semibold hover:text-white transition-all duration-300 ease-in-out">
                    <Link to={sub.link}>{sub.title}</Link>
                  </li>
                ))}
              </div>
            </div>
          </div>

          {/* languages section */}
          <div  className=" flex flex-col gap-2 items-center">
            <h1 className=" text-xl sm:text-2xl font-bold text-center">{footerData[1].title}</h1>
            <div className=" bg-slate-400 h-[2px] w-[40%] sm:w-full "></div>
            <div>
              <div>
                {footerData[1].links.map((lan, index) => (
                  <li key={index} className=" font-semibold hover:text-white transition-all duration-300 ease-in-out ">
                    <Link to={lan.link}>{lan.title}</Link>
                  </li>
                ))}
              </div>
            </div>
          </div>

          {/* career building section */}
          <div  className=" flex flex-col gap-2 items-center">
            <h1 className=" text-xl sm:text-2xl font-bold text-center">{footerData[2].title}</h1>
            <div className=" bg-slate-400 h-[2px] w-[40%] sm:w-full "></div>
            <div>
              <div>
                {footerData[2].links.map((data, index) => (
                  <li key={index} className=" font-semibold hover:text-white transition-all duration-300 ease-in-out">
                    <Link to={data.link}>{data.title}</Link>
                  </li>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-10 shadow-[0_0_10px_black] py-4 items-center justify-between px-4 md:px-0 md:justify-evenly mt-10 ">
          <section className=" text-lg flex">
            Copyright {year} | All Rights Reserved
          </section>
          <section className=" text-center">
            <h1 className=" text-white font-bold">Tech. Edu.</h1>
            <span>an educational platform</span>
            <p>- By -</p>
            <p className=" text-white font-bold">Abhishek Kumar</p>
          </section>
          <section className="flex items-center flex-row sm:flex-col justify-start lg:flex-row lg:justify-center gap-5 text-xl sm:text-2xl">
            <a className=" cursor-pointer hover:text-white transition-all ease-in-out duration-300">
              <BsFacebook />
            </a>

            <a className=" cursor-pointer hover:text-white transition-all ease-in-out duration-300">
              <BsInstagram />
            </a>

            <a className=" cursor-pointer hover:text-white transition-all ease-in-out duration-300">
              <BsLinkedin />
            </a>

            <a className=" cursor-pointer hover:text-white transition-all ease-in-out duration-300">
              <BsTwitter />
            </a>
          </section>
        </div>
      </footer>
    </>
  );
};

export default Footer;
