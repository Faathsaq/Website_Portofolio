import React from "react";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-[#F3F8FF] flex items-center justify-center">
      <div className="relative">
        {/* Soft glow blob */}
        <div className="absolute -inset-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>

        <div className="relative flex flex-col items-center gap-4 p-8">
          {/* Spinner */}
          <div className="w-12 h-12 rounded-full border-4 border-blue-400/30 border-t-blue-500 animate-spin"></div>

          {/* Text */}
          <span className="text-slate-600 text-sm tracking-wide">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;