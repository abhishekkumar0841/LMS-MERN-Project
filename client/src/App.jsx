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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Course routes */}
        <Route path="/courses" element={<CourseList />} />

        {/* Contact page routes */}
        <Route path="/contact" element={<Contact />} />

        {/* Denied page routes */}
        <Route path="/denied" element={<Denied />} />

        {/* Error Page Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
