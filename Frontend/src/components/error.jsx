import React from "react";

const Alert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-4 z-50 flex justify-between items-center">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 bg-red-700 hover:bg-red-800 text-white font-bold py-1 px-3 rounded"
      >
        Close
      </button>
    </div>
  );
};

export default Alert;
