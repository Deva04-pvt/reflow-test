"use client";
import React, { useState, useEffect } from "react";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/mqtt-output");
        const result = await response.json();

        // Map received data to the correct format
        const formattedData = [
          {
            serialNo: 1,
            readings: result[0]?.CH1 || "N/A",
            calibratedReadings: result[0]?.CalibratedValue1 || "N/A",
            status: result[0]?.ERR1 === 1 ? "Online" : "Offline",
          },
          {
            serialNo: 2,
            readings: result[0]?.CH2 || "N/A",
            calibratedReadings: result[0]?.CalibratedValue2 || "N/A",
            status: result[0]?.ERR2 === 1 ? "Online" : "Offline",
          },
          {
            serialNo: 3,
            readings: result[0]?.CH3 || "N/A",
            calibratedReadings: result[0]?.CalibratedValue3 || "N/A",
            status: result[0]?.ERR3 === 1 ? "Online" : "Offline",
          },
        ];

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Optionally, set an interval to fetch data periodically
    const intervalId = setInterval(fetchData, 5000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full h-full ">
      <div className="bg-white border-2 border-black rounded-3xl overflow-hidden flex flex-col h-full">
        {/* Table Section */}
        <div className="flex-grow">
          <table className="min-w-full bg-[#F0F0F0] border-collapse border-black">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-6 text-center border-white">
                  Serial No
                </th>
                <th className="px-4 py-6 text-center border-white">Readings</th>
                <th className="px-4 py-6 text-center border-white">
                  Calibrated Readings
                </th>
                <th className="px-4 py-6 text-center border-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr
                  key={row.serialNo}
                  className="border-b-2 text-black border-black"
                >
                  <td className="px-4 py-6 text-center border-black text-black">
                    {row.serialNo}
                  </td>
                  <td className="px-4 py-6 text-center text-black border-black">
                    {row.readings}
                  </td>
                  <td className="px-4 py-6 text-center text-black border-black">
                    {row.calibratedReadings}
                  </td>
                  <td
                    className="px-4 py-6 text-center text-black border-black"
                    style={{
                      color: row.status === "Online" ? "#148815" : "#f93737",
                    }}
                  >
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Export Section */}
        <div className="p-4 flex flex-col bg-[#F0F0F0] border-t-1 border-black">
          <div className="bg-black text-white text-center py-6 font-bold border-b-1 border-black">
            Export Data
          </div>
          <div className="p-4 flex flex-col">
            <div className="mb-4">
              <label className="block text-gray-700">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded-3xl text-gray-800"
                style={{ height: "2rem" }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded-3xl text-gray-800"
                style={{ height: "2rem" }}
              />
            </div>
            <button className="w-full py-2 bg-gray-900 text-white rounded-3xl hover:bg-gray-200 hover:text-black">
              Export
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-20 justify-evenly m-20">
        <button className="w-full py-2 bg-gray-900 text-white rounded-3xl ">
          Add New Device
        </button>
        <button className="w-full py-2 bg-gray-900 text-white rounded-3xl ">
          View All Projects
        </button>
      </div>
    </div>
  );
};

export default DataTable;
