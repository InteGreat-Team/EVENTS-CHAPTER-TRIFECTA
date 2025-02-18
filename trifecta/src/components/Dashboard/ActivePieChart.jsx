import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const ActivePieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate the count of active and inactive statuses
  const getStatusCount = () => {
    const activeCount = data.filter(
      (item) => item.activestatus === true
    ).length;
    const inactiveCount = data.length - activeCount;
    return [
      { name: "Active", value: activeCount },
      { name: "Unactive", value: inactiveCount },
    ];
  };

  // Colors for the pie chart
  const COLORS = ["#00a67e", "#A0AEC0"];
  return (
    <>
      <div className="border-2 border-black mt-4 md:ml-4 rounded-md md:py-5 shadow-lg">
        <h1 className="flex justify-center font-semibold md:text-[20px]">
          Active Status
        </h1>
        <div className="w-[290px] h-[270px] flex justify-center items-center flex-col ">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={getStatusCount()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col justify-center items-center md:text-[16px]">
          <h1>Active Items: {getStatusCount()[0].value}</h1>
          <h1>Inactive Items: {getStatusCount()[1].value}</h1>
        </div>
      </div>
    </>
  );
};

export default ActivePieChart;
