import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-base font-medium text-gray-800 dark:text-gray-200">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
