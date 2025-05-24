"use client";
import React from "react";
import Image from "next/image";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mon",
    present: 142,
    absent: 8,
  },
  {
    name: "Tue",
    present: 100,
    absent: 50,
  },
  {
    name: "Wed",
    present: 120,
    absent: 30,
  },
  {
    name: "Thu",
    present: 110,
    absent: 40,
  },
  {
    name: "Fri",
    present: 90,
    absent: 60,
  },
];
const AttendanceChart = () => {
  return (
    <div className="w-full h-full bg-white rounded-2xl p-4">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-[15px]">Attendance</h1>
        <Image
          src={"/moreDark.png"}
          alt=""
          width={20}
          height={20}
          className="font-bold text-gray-600"
        />
      </div>
      <div className="relative w-full h-[75%] ">
        <div className="flex justify-center gap-3 float-left mt-5 mb-5">
          <div className="flex gap-2">
            <div className="w-5 h-5 bg-[#ffc658] rounded-full" />
            <h1 className="font-semibold text-[#ffc658]">present</h1>
          </div>
          <div className="flex gap-2">
            <div className="w-5 h-5 bg-[#83a6ed] rounded-full" />
            <h1 className="font-semibold text-[#83a6ed]">Absent</h1>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={data} barSize={20}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#ddd"
            />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar
              dataKey="present"
              fill="#ffc658"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
              legendType="circle"
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="absent"
              fill="#83a6ed"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
              legendType="circle"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
