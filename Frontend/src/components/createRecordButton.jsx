import React, { useState } from "react";
import { CreateRecord } from "../API/RecordAPI";
import { useParams } from "react-router-dom";

const CreateRecordButton = ({Id,name}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: Id,
    description: "",
    name: name,
    type: "A",
    ttl: 300,
    value: "",
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 

  const handleSubmit = (e) => {
    e.preventDefault();
   
    CreateRecord(formData);
    console.log("created: ", formData);
    location.reload();
  };
  

  return (
    <div className="p-4">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Create Record
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded">
          <div className="mb-4">
            <label className="block text-gray-700">Id</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

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
            <label className="block text-gray-700">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="A">A</option>
              <option value="AAAA">AAAA</option>
              <option value="CNAME">CNAME</option>
              <option value="MX">MX</option>
              <option value="TXT">TXT</option>
              <option value="NS">NS</option>
              <option value="SOA">SOA</option>
              <option value="PTR">PTR</option>
              <option value="SRV">SRV</option>
              <option value="SPF">SPF</option>
              <option value="CAA">CAA</option>
              <option value="DS">DS</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">TTL</label>
            <input
              type="number"
              name="ttl"
              value={formData.ttl}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Value</label>
            <input
              type="text"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
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

export default CreateRecordButton;
