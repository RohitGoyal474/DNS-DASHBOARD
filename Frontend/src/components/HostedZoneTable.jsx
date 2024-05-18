import React, { useState } from "react";
import { DeleteHostedZOne } from "../API/HostedZoneAPI";
import { useHostedZoneList } from "../hooks/useHostedZoneList";
import { useNavigate } from "react-router-dom";

const HostedZoneTable = ({ data }) => {
  const [visibleZoneId, setVisibleZoneId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCriterion, setFilterCriterion] = useState("Name");
  const [setCountFilter, setSetCountFilter] = useState("");

  const navigate = useNavigate();

  if (!data) return null;

  const handleNameClick = (zoneId) => {
    setVisibleZoneId(visibleZoneId === zoneId ? null : zoneId);
  };

  const handleChangeButton1 = (zone) => {
    try {
      const Id = zone.Id;
      const Idwithoutzone = Id.replace("/hostedzone/", "");
      const name = zone.Name;
      console.log("test : ", Idwithoutzone, name);
      navigate("/Record/" + Idwithoutzone + "/" + name);
    } catch (error) {
      console.log("error : ", error);
    }
    
  };

  const handleDelete = async (zoneId) => {
    try {
      const idWithoutHostedZone = zoneId.replace("/hostedzone/", "");
      const deleted = await DeleteHostedZOne(idWithoutHostedZone);
      console.log("deleted : ", deleted);
      setVisibleZoneId(null);
      location.reload();
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const filteredZones = data.data.HostedZones.filter((zone) =>
    zone[filterCriterion].toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((zone) => {
    if (setCountFilter === "") return true;
    return zone.ResourceRecordSetCount === parseInt(setCountFilter);
  });

  const setCounts = Array.from(
    new Set(data.data.HostedZones.map((zone) => zone.ResourceRecordSetCount))
  );

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
          <option value="Id">Id</option>
        </select>
        <select
          value={setCountFilter}
          onChange={(e) => setSetCountFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Set Counts</option>
          {setCounts.map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm text-gray-700">
              Name
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm text-gray-700">
              Id
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm text-gray-700">
              Resource Record Set Count
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredZones.map((zone, index) => (
            <tr
              key={zone.Id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                {zone.Name}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                {zone.Id.replace("/hostedzone/", "")}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                {zone.ResourceRecordSetCount}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleChangeButton1(zone)}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Records
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded"
                    onClick={() => handleDelete(zone.Id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HostedZoneTable;
