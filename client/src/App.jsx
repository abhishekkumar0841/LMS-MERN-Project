import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from './Pages/HomePage'
import AboutUs from "./Pages/AboutUs";
import NotFound from "./Components/NotFound";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import CourseList from "./Pages/Course/CourseList";
import Contact from "./Pages/Contact";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>

        {/* Course routes */}
        <Route path="/courses" element={<CourseList/>}/>

         {/* Contact page routes */}
         <Route path="/contact" element={<Contact/>}/>

        {/* Error Page Route */}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
