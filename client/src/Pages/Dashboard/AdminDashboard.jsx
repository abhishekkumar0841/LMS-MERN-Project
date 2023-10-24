import React, { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import {
  Chart as ChartJs,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { Bar, Pie } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";

//registering ChartJs
ChartJs.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);
  const { allPayments, monthlySalesRecord } = useSelector(
    (state) => state.razorpay
  );

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedCount],
        backgroundColor: ["yellow", "green"],
        borderWidth: 1,
        borderColor: ["yellow", "green"],
      },
    ],
  };

  const sellsData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dev",
    ],
    fontColor: "white",
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: ["rgb(255, 99, 132)"],
        borderColor: ["white"],
        borderWidth: 2,
      },
    ],
  };

  const myCourses = useSelector((state) => state?.course?.courseData);

  async function onCourseDelete(id) {
    if (window.confirm("Are you sure to want to delete this course ?")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
      }
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <HomeLayout>
      <div className=" min-h-[90vh] py-12 px-5 flex flex-col flex-wrap gap-10 text-white">
        <h1 className=" text-center text-3xl sm:text-4xl md:text-5xl font-semibold text-yellow-500">
          Admin Dashboard
        </h1>
        <div className=" grid grid-cols-1 lg:grid-cols-2 content-center gap-5 m-auto mx-10">
          <div className=" flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            <div className=" w-80 h-80">
              <Pie data={userData} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className=" flex items-center flex-col lg:flex-row justify-between p-5 gap-5 rounded-md shadow-md">
                <div className=" flex flex-col items-center">
                  <p className=" font-semibold">Registered Users</p>
                  <h3 className=" text-4xl font-bold">{allUsersCount}</h3>
                </div>
                <FaUsers className=" text-yellow-500 text-5xl " />
              </div>

              <div className=" flex items-center flex-col lg:flex-row justify-between p-5 gap-5 rounded-md shadow-md">
                <div className=" flex flex-col items-center">
                  <p className=" font-semibold">Subscribed Users</p>
                  <h3 className=" text-4xl font-bold">{subscribedCount}</h3>
                </div>
                <FaUsers className=" text-green-500 text-5xl " />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            <div className=" h-80 relative w-full border">
              <Bar className="absolute bottom-0 h-96 lg:h-80 w-full" data={sellsData} />
            </div>

            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className=" flex items-center flex-col md:flex-row justify-between p-5 gap-5 rounded-md shadow-md">
                <div className=" flex flex-col items-center">
                  <p className=" font-semibold">Subscription Count</p>
                  <h3 className=" text-4xl font-bold">{allPayments?.count}</h3>
                </div>
                <FcSalesPerformance className=" text-yellow-500 text-5xl " />
              </div>

              <div className=" flex items-center flex-col md:flex-row justify-between p-5 gap-5 rounded-md shadow-md">
                <div className=" flex flex-col items-center">
                  <p className=" font-semibold">Total Revenue</p>
                  {allPayments?.count && (
                    <h3 className=" text-4xl font-bold">
                      {allPayments?.count * 499}
                    </h3>
                  )}
                </div>
                <GiMoneyStack className=" text-yellow-500 text-5xl " />
              </div>
            </div>
          </div>
        </div>

        <div className=" mx-auto w-[95%] flex flex-col items-center justify-center gap-10 mb-10 shadow-[0_0_10px_black] p-4 rounded-md">
          <div className="flex w-full flex-col sm:flex-row gap-5 items-center justify-between">
            <h1 className=" text-center text-3xl font-semibold">
              Course Overview
            </h1>

            <button
              onClick={() => navigate("/course/create")}
              className=" rounded py-2 px-4 font-semibold text-lg cursor-pointer bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 ease-in-out w-fit"
            >
              Create new course
            </button>
          </div>

          <div className="w-full overflow-x-scroll">
          <table className=" table table-auto ">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Course Title</th>
                <th>Course Category</th>
                <th>Instructor</th>
                <th>Total Lectures</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCourses?.map((course, idx) => (
                <tr key={course?._id}>
                  <td> {idx + 1} </td>
                  <td>
                    <textarea
                      readOnly
                      value={course?.title}
                      className=" w-40 h-auto bg-transparent resize-none"
                    ></textarea>
                  </td>
                  <td>{course?.category}</td>
                  <td>{course?.createdBy}</td>
                  <td>{course?.numbersOfLectures}</td>
                  <td className=" max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                    <textarea
                      value={course?.description}
                      readOnly
                      className=" w-80 h-auto bg-transparent resize-none"
                    ></textarea>
                  </td>
                  <td className=" flex items-center gap-4">
                    <button
                      className=" bg-green-500 hover:bg-green-600 transition-all duration-300 ease-in-out text-xl py-2 px-4 rounded-md font-bold"
                      onClick={() =>
                        navigate("/course/displaylectures", {
                          state: { ...course },
                        })
                      }
                    >
                      <BsCollectionPlayFill />
                    </button>

                    <button
                      className=" bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in-out text-xl py-2 px-4 rounded-md font-bold"
                      onClick={() => onCourseDelete(course._id)}
                    >
                      <BsTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        
      </div>
    </HomeLayout>
  );
};

export default AdminDashboard;
