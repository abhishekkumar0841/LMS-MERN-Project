import React from "react";
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";

const HomeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //for checking if user is loggedIn
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  //for displaying the options according to role
  const role = useSelector((state) => state?.auth?.role);

  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  };

  const hideDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  };

  const handleLogout = async () => {
    // e.preventDefault();
    const res = await dispatch(logout());
    // console.log("Res on logout->",res)

    if (res?.meta?.requestStatus === 'fulfilled') {
      navigate("/");
    }
  };

  return (
    <div className=" min-h-[90vh]">
      <div className=" drawer absolute left-0 z-50 w-full">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className=" cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className=" font-bold text-white m-4"
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-[100vw] sm:w-80 h-[100%] bg-base-200 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            <li className="text-2xl font-semibold">
              <Link to={"/"}>Home</Link>
            </li>

            {/* only render this li if user is logged in and his/her role is of Admin */}
            {isLoggedIn && role === "Admin" && (
              <li className="text-2xl font-semibold">
                <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
              </li>
            )}

            {isLoggedIn && role === "Admin" && (
              <li className="text-2xl font-semibold">
                <Link to={"/course/create"}>Add New Course</Link>
              </li>
            )}

            <li className="text-2xl font-semibold">
              <Link to={"/courses"}>All Courses</Link>
            </li>
            <li className="text-2xl font-semibold">
              <Link to={"/contact"}>Contact Us</Link>
            </li>
            <li className="text-2xl font-semibold">
              <Link to={"/about"}>About Us</Link>
            </li>

            {/* show only if user is not LoggedIn */}
            {!isLoggedIn && (
              <li className=" absolute bottom-4 w-[90%]">
                <div className=" w-full flex flex-col items-center gap-5 justify-center">
                  <button className=" btn-primary px-4 py-2 text-2xl font-semibold rounded-md w-full">
                    <Link to={"/login"}>Login</Link>
                  </button>
                  <button className=" btn-secondary px-4 py-2 text-2xl font-semibold rounded-md w-full">
                    <Link to={"/signup"}>Signup</Link>
                  </button>
                </div>
              </li>
            )}

            {/* show only if user is LoggedIn */}
            {isLoggedIn && (
              <li className=" absolute bottom-4 w-[90%]">
                <div className=" w-full flex flex-col items-center gap-5 justify-center">
                  <button className=" btn-primary px-4 py-2 text-2xl  font-semibold rounded-md w-full">
                    <Link to={"/user/profile"}>Profile</Link>
                  </button>
                  <button className=" btn-secondary px-4 py-2 text-2xl  font-semibold rounded-md w-full">
                    <Link onClick={handleLogout}>Logout</Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {children}

      <Footer />
    </div>
  );
};

export default HomeLayout;
