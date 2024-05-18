import React from "react";

const HostedZoneHeader = ({ id, name }) => {
  return (
    <div className="flex justify-between items-center mb-6 p-4 bg-blue-100 border border-blue-200 rounded-lg shadow-sm">
      <div>
        <h2 className="text-2xl font-bold text-blue-700">
          Hosted Zone Details
        </h2>
        <p className="text-lg">
          <strong>Id:</strong> {id}
        </p>
        <p className="text-lg">
          <strong>Name:</strong> {name}
        </p>
      </div>
    
    </div>
  );
};

export default HostedZoneHeader;
