import React, { useState } from "react";
import { CreateHostedZone } from "../API/HostedZoneAPI";
import { useDispatch, useSelector } from "react-redux";
import Alert from "./error";

const CreateHostedZoneButton = () => {
  
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    Description: "",
    zoneType: 1,
  });
    const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    try {
       e.preventDefault();
       CreateHostedZone(formData);

       location.reload();
       dispatch(setHostedZoneList());
       console.log(formData);
    } catch (error) {
      console.log(error);
      setError(error);
      (error && <Alert message={error.message} onClose={() => setError(null)} />) 
    }
   
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        {showForm ? "Cancel" : "Create Hosted Zone"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Zone Type</label>
            <select
              name="zoneType"
              value={formData.zoneType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value={1}>true</option>
              <option value={0}>false</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateHostedZoneButton;
