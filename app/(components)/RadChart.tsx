"use client";
import React from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
const data = [
  {
    name: "total",
    num: 150,
    fill: "white",
  },
  {
    name: "boys",
    num: 82,
    fill: "#83a6ed",
  },
  {
    name: "girls",
    num: 68,
    fill: "#ffc658",
  },
];


const RadChart = () => {
  return (
    <div className="rounded-2xl w-full h-full p-4 bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-[15px]">Students</h1>
        <Image
          src={"/moreDark.png"}
          alt=""
          width={20}
          height={20}
          className="font-bold text-gray-600"
        />
      </div>
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="num" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-[#83a6ed] rounded-full" />
          <h1 className="font-bold">150</h1>
          <h2 className="text-xs text-gray-500">Boys (54.6%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-[#ffc658] rounded-full" />
          <h1 className="font-bold">150</h1>
          <h2 className="text-xs text-gray-500">Girls (45.3%)</h2>
        </div>
      </div>
    </div>
  );
};

export default RadChart;
