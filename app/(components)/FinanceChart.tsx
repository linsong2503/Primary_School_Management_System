"use client";
import React from "react";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
  },
  {
    name: "Mar",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Apr",
    income: 2780,
    expense: 3908,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
  },
  {
    name: "Jun",
    income: 2390,
    expense: 3800,
  },
  {
    name: "Jul",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Aug",
    income: 5490,
    expense: 4300,
  },
  {
    name: "Sep",
    income: 7490,
    expense: 4300,
  },
  {
    name: "Oct",
    income: 3490,
    expense: 8300,
  },
  {
    name: "Nov",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Dec",
    income: 3390,
    expense: 1500,
  },
];
const FinanceChart = () => {
  return (
    <div className="bg-white rounded-2xl p-4 w-full h-full">
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-semibold text-[15px]">Finance</h1>
        <Image
          src={"/moreDark.png"}
          alt=""
          width={20}
          height={20}
          className="font-bold text-gray-600"
        />
      </div>
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
            />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
             <Line
            type="monotone"
            dataKey="income"
            stroke="#8884d8"
            strokeWidth={5}
          />
          <Line type="monotone" dataKey="expense" stroke="#5DE2E7" strokeWidth={5}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceChart;
