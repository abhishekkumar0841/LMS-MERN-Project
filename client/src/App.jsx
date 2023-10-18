import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from './Pages/HomePage'
import AboutUs from "./Pages/AboutUs";
import NotFound from "./Components/NotFound";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>

        {/* Error Page Route */}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
