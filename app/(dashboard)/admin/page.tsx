"use client";
import React from "react";
import UserCard from "@/app/(components)/UserCard";
import RadChart from "@/app/(components)/RadChart";
import FinanceChart from "@/app/(components)/FinanceChart";
import AttendanceChart from "@/app/(components)/AttendanceChart";
import SideCalendar from "@/app/(components)/Calendar";
import Announcements from "@/app/(components)/Announcements";
const Adminpage = () => {
  return (
    <div className="p-4 flex flex-col md:flex-row gap-4">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8 ">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="Student" />
          <UserCard type="Teacher" />
          <UserCard type="Parent" />
          <UserCard type="Staff" />
        </div>
        {/* Radical and Bar Charts */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Radical chart */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <RadChart />
          </div>
          {/* Bar chart */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>
        {/* Line Chart */}
        <div className="w-full h-[500px] ">
          <FinanceChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col">
        <SideCalendar />
        <Announcements/>
      </div>
    </div>
  );
};

export default Adminpage;
