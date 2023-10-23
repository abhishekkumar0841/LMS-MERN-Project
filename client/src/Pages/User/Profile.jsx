import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const userData = useSelector((state) => state?.auth?.data);

  const dispatch = useDispatch();
  const navigate  = useNavigate()

  async function handleCancellation() {
    toast("Initializing Cancellation!")

    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());

    toast.success("Your Cancellation Completed, Go And Enjoy Your Life😂👍")
    navigate('/')
  }

  return (
    <HomeLayout>
      <div className=" min-h-[90vh] flex items-center justify-center">
        <div className=" my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <img
            src={userData?.avatar?.secure_url}
            className=" w-40 m-auto rounded-full border border-black"
          />

          <h3 className=" text-2xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h3>

          <div className="grid grid-cols-2 ">
            <p>Email:</p> <p>{userData?.email}</p>
            <p>Role:</p> <p>{userData?.role}</p>
            {/* TODO: only show subscription if user is not admin */}
            <p>Subscription:</p>{" "}
            <p>
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>

          <div className=" flex items-center justify-between gap-2">
            <Link
              to={"/user/changepassword"}
              className=" w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 ease-in-out rounded-sm cursor-pointer text-center font-semibold py-2"
            >
              <button>Change Password</button>
            </Link>

            <Link
              to={"/user/editprofile"}
              className=" w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 ease-in-out rounded-sm cursor-pointer text-center font-semibold py-2"
            >
              <button>Edit Profile</button>
            </Link>
          </div>

          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCancellation}
              className=" w-full bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in-out rounded-sm cursor-pointer text-center font-semibold py-2"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Profile;
