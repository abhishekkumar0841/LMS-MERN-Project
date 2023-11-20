import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./Redux/Store.js";
import ScrollToTop from "./Components/ScrollToTop.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
      <Toaster />
    </BrowserRouter>
  </Provider>
);
