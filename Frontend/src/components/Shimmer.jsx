import React from "react";

const Shimmer = () => {
  return (
    <div className="overflow-hidden">
      <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
    </div>
  );
};

export default Shimmer;
