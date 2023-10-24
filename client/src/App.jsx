import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs";
import NotFound from "./Components/NotFound";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import CourseList from "./Pages/Course/CourseList";
import Contact from "./Pages/Contact";
import Denied from "./Pages/Denied";
import CourseDescription from "./Pages/Course/CourseDescription";
import RequireAuth from "./Components/Auth/RequireAuth";
import CreateCourse from "./Pages/Course/CreateCourse";
import Profile from "./Pages/User/Profile";
import EditProfile from "./Pages/User/EditProfile";
import Checkout from "./Pages/Payment/Checkout";
import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess";
import CheckoutFailure from "./Pages/Payment/CheckoutFailure";
import DisplayLectures from "./Pages/Dashboard/DisplayLectures";
import AddLecture from "./Pages/Dashboard/AddLecture";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import ChangePassword from "./Pages/User/ChangePassword";
import ForgetPassword from "./Pages/User/ForgetPassword";
import ResetPassword from "./Pages/User/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword/>} />

        {/* Course routes */}
        <Route path="/courses" element={<CourseList />} />
        <Route path="/course/description" element={<CourseDescription />} />

        {/* Contact page routes */}
        <Route path="/contact" element={<Contact />} />

        {/* Denied page routes */}
        <Route path="/denied" element={<Denied />} />

        {/* specific routes only for Admin */}
        <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/course/addlecture" element={<AddLecture />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* user profile routes */}
        <Route element={<RequireAuth allowedRoles={["Admin", "User"]} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/user/changepassword" element={<ChangePassword />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFailure />} />
          <Route path="/course/displaylectures" element={<DisplayLectures />} />
        </Route>

        {/* Error Page Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
