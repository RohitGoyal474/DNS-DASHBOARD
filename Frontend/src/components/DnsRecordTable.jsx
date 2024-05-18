import React, { useState } from "react";
import Modal from "./Modal"; // Ensure the correct path to your Modal component
import { DeleteRecord, UpdateRecord } from "../API/RecordAPI";
import { useParams } from "react-router-dom";

const HostedZoneTable = ({ data }) => {
  const [visibleZoneId, setVisibleZoneId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCriterion, setFilterCriterion] = useState("Name");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentZone, setCurrentZone] = useState(null);
  const [updatedRecord, setUpdatedRecord] = useState({
    id: "",
    name: "",
    type: "",
    ttl: "",
    value: "",
  });
  const { Id } = useParams();
  console.log("Id", Id);
  if (!data) return null;

  const handleNameClick = (index) => {
    setVisibleZoneId(visibleZoneId === index ? null : index);
  };

  const handleChangeButton1 = (zone) => {
    setCurrentZone(zone);
    console.log("Zone", data);
    setUpdatedRecord({
      id: Id,
      name: zone.Name,
      type: zone.Type,
      ttl: zone.TTL,
      value: zone.ResourceRecords[0]?.Value || "",
    });
    setIsModalOpen(true);
  };

  const handleChangeButton2 = async (zone) => {
    const input = {
      Id: Id,
      RecordName: zone.Name,
      RecordType: zone.Type,
      RecordValues: [zone.ResourceRecords[0]?.Value || ""],
      TTL: zone.TTL,
    };

    const data = await DeleteRecord(input);
    console.log("deleted :", data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRecord((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    UpdateRecord(updatedRecord);

    console.log("Updated Record: ", updatedRecord);
    setIsModalOpen(false);
  };

  const filteredZones = data.data.filter((zone) => {
    const field = zone[filterCriterion];
    const searchTermString = searchTerm.toString(); // Convert search term to string
    if (typeof field === "string") {
      return field.toLowerCase().includes(searchTermString.toLowerCase());
    } else if (typeof field === "number") {
      return field.toString() === searchTermString; // Convert field to string for comparison
    }
    return false; // Return false for other types
  });

  return (
    <div className="overflow-x-auto p-4">
      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <select
          value={filterCriterion}
          onChange={(e) => setFilterCriterion(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="Name">Name</option>
          <option value="Type">Type</option>
          <option value="TTL">TTL</option>
        </select>
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm text-gray-700">
              Name
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm text-gray-700">
              Type
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm text-gray-700">
              TTL
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm text-gray-700">
              Resource Records
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredZones.map((zone, index) => (
            <tr
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              key={index}
            >
              <td
                className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800 cursor-pointer"
                onClick={() => handleNameClick(index)}
              >
                {zone.Name}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                {zone.Type}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                {zone.TTL}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                {zone.ResourceRecords.map((record, i) => (
                  <div key={i}>{record.Value}</div>
                ))}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleChangeButton1(zone)}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleChangeButton2(zone)}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Update Resource Record</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              ID
            </label>
            <input
              type="text"
              name="id"
              value={updatedRecord.id}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={updatedRecord.name}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <input
              type="text"
              name="type"
              value={updatedRecord.type}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              TTL
            </label>
            <input
              type="number"
              name="ttl"
              value={updatedRecord.ttl}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Value
            </label>
            <input
              type="text"
              name="value"
              value={updatedRecord.value}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-1 px-3 rounded"
          >
            Update
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default HostedZoneTable;
