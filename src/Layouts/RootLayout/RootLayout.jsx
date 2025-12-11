import React from "react";
import Home from "../Home/Home";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-base-100 shadow-md">
        <Navbar />
      </div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
