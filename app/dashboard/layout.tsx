import LeftSideBar from "@/components/Dashboard/LeftSideBar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col md:flex-row">
     
        <div className="w-full md:w-64 border-r">
          <LeftSideBar />
        </div>

     
        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
