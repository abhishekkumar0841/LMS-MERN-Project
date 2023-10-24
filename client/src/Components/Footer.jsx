import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs"; //bs means bootStrap icons

const Footer = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  return (
    <>
      <footer className="relative left-0 bottom-0 min-h-[10vh] flex flex-col gap-3 sm:flex-row items-center justify-between text-white bg-gray-800 py-5 sm:px-20">
        <section className=" text-lg flex">
          Copyright {year} | All Rights Reserved
        </section>
        <section className="flex items-center justify-center gap-5 text-xl sm:text-2xl text-white">
            <a className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                <BsFacebook/>
            </a>

            <a className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                <BsInstagram/>
            </a>

            <a className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                <BsLinkedin/>
            </a>

            <a className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                <BsTwitter/>
            </a>
        </section>
      </footer>
    </>
  );
};

export default Footer;
