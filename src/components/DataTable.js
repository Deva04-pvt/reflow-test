"use client";
import React, { useState, useEffect } from "react";

// Hardcoded data fetching function (for demo purposes)
// You can replace this with your actual API call if necessary
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
        readingsLevel: calculateLevel(result[0]?.CH1 || 0), // Example level calculation
        status: result[0]?.ERR1 === 1 ? "Online" : "Offline",
      },
      {
        serialNo: 2,
        readings: result[0]?.CH2 || "N/A",
        calibratedReadings: result[0]?.CalibratedValue2 || "N/A",
        readingsLevel: calculateLevel(result[0]?.CH2 || 0), // Example level calculation
        status: result[0]?.ERR2 === 1 ? "Online" : "Offline",
      },
      {
        serialNo: 3,
        readings: result[0]?.CH3 || "N/A",
        calibratedReadings: result[0]?.CalibratedValue3 || "N/A",
        readingsLevel: calculateLevel(result[0]?.CH3 || 0), // Example level calculation
        status: result[0]?.ERR3 === 1 ? "Online" : "Offline",
      },
    ];

    return formattedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Example level calculation function (customize as needed)
const calculateLevel = (reading) => {
  const maxReading = 100; // Set your max reading value here
  return (reading / maxReading) * 100;
};

const DataTable = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
    };

    getData();

    // Optionally, set an interval to fetch data periodically
    const intervalId = setInterval(getData, 5000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const columns = [
    { key: "serialNo", label: "Serial No" },
    { key: "readings", label: "Readings" },
    { key: "calibratedReadings", label: "Calibrated Readings" },
    { key: "readingsLevel", label: "Readings Level" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="w-full h-full bg-gray-100">
      <div className="bg-white border-4 border-black rounded-lg overflow-hidden flex">
        {/* Table Section */}
        <div className="flex-grow">
          <table className="min-w-full bg-[#F0F0F0] border-collapse border-black">
            <thead className="bg-black text-white">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={column.key}
                    className={`px-4 py-6 text-center ${
                      index === 0 ? "border-l-0" : ""
                    } ${
                      index === columns.length - 1 ? "border-r-0" : "border-r-2"
                    } border-white`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border-b-2 border-black">
                  {columns.map((column, colIndex) => (
                    <td
                      key={column.key}
                      className={`px-4 py-6 text-center ${
                        colIndex === 0 ? "border-l-0" : ""
                      } ${
                        colIndex === columns.length - 1
                          ? "border-r-0"
                          : "border-r-2"
                      } border-black ${
                        column.key === "status" ? "text-black" : "text-black"
                      }`}
                      style={{
                        backgroundColor:
                          column.key === "status"
                            ? row[column.key] === "Online"
                              ? "#d4edda"
                              : "#f8d7da"
                            : "inherit",
                      }}
                    >
                      {column.key === "readingsLevel" ? (
                        <div className="relative">
                          <div
                            className="absolute top-0 left-0 bg-blue-500 h-full rounded-full"
                            style={{
                              width: `${row[column.key]}%`,
                              height: "100%",
                            }}
                          ></div>
                          <div className="bg-[#A5A5A5] h-4 w-full rounded-full"></div>
                        </div>
                      ) : (
                        row[column.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Export Section */}
        <div className="w-64 flex flex-col bg-white border-l-2 border-black">
          <div className="bg-black text-white text-center py-6 font-bold border-b-1 border-black">
            Export Data
          </div>
          <div className="p-4 flex flex-col h-full">
            <div className="mb-4">
              <label className="block text-gray-700">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded-2xl text-black"
                style={{ height: "2rem" }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded-2xl text-black"
                style={{ height: "2rem" }}
              />
            </div>
            <button className="w-full py-2 bg-gray-800 text-white rounded-3xl hover:bg-gray-600">
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
