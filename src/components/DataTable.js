"use client";
import React, { useState, useEffect } from "react";

// Simulated data fetch (Replace this with your actual API call)
const fetchData = async () => {
  return [
    {
      serialNo: 1,
      readings: 23,
      calibratedReadings: 22,
      readingsLevel: 75,
      status: "Online",
    },
    {
      serialNo: 2,
      readings: 30,
      calibratedReadings: 29,
      readingsLevel: 50,
      status: "Offline",
    },
    {
      serialNo: 3,
      readings: 45,
      calibratedReadings: 44,
      readingsLevel: 90,
      status: "Online",
    },
  ];
};

const DataTable = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const columns = [
    { key: "serialNo", label: "Serial No" },
    { key: "readings", label: "Readings" },
    { key: "calibratedReadings", label: "Calibrated Readings" },
    { key: "readingsLevel", label: "Readings Level" },
    { key: "status", label: "Status" },
  ];

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
    };
    getData();
  }, []);

  return (
    <div className="w-full h-full p-4 bg-gray-100">
      <div className="bg-white border-2 border-black rounded-3xl overflow-hidden flex">
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
                      index === columns.length - 1 ? "border-r-2" : "border-r-2"
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
                          ? "border-r-2"
                          : "border-r-2"
                      } border-black ${
                        column.key === "status" ? "text-black" : "text-black"
                      }`}
                      style={{
                        backgroundColor:
                          column.key === "status"
                            ? row[column.key] === "Online"
                              ? "#148815"
                              : "#f93737"
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
                          <div className="bg-gray-200 h-4 w-full rounded-full"></div>
                        </div>
                      ) : column.key === "status" ? (
                        row[column.key]
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
        <div className="w-64 flex flex-col bg-[#F0F0F0] border-l-1 border-black">
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
    </div>
  );
};

export default DataTable;
