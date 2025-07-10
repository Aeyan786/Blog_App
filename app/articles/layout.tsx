import LeftSideBar from "@/components/Dashboard/LeftSideBar";
import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Home/Header/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-20" >
     
        <Navbar />
        <div className="flex-1">{children}</div>
        <div className="mt-30">

        <Footer/>
        </div>
      
    </div>
  );
};

export default layout;
