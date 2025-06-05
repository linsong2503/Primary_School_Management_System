import React from "react";
import Image from "next/image";
import { Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import BigCalendar from "@/app/(components)/BigCalendar";
import Announcements from "@/app/(components)/Announcements";
import Link from "next/link";
import PerformanceChart from "@/app/(components)/PerformanceChart";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const SingleTeacherPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const teacher:
    | (Teacher & {
        _count: { subjects: number; lessons: number; classes: number };
      })
    | null = await prisma.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
    },
  });
  if (!teacher) {
    return notFound();
  }
  const DoB = teacher?.birthday.getMonth();
  let month;
  if (DoB !== undefined) {
    month = months[DoB];
  }
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER CARD */}
          <div className="bg-blue-200 px-6 py-4 rounded-md flex-1 flex gap-5">
            <div className="w-full md:w-1/3 flex items-center  ">
              <Image
                src={"/noAvatar.png"}
                alt=""
                width={144}
                height={144}
                className="w-35 h-35 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="font-semibold text-xl">
                {teacher?.name + " " + teacher.surname}
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium">
                <div className="w-full md:w-1/3 2xl:w-1/3 lg:w-full items-center flex gap-2">
                  <Image src={"/blood.png"} alt="" width={15} height={15} />
                  <span>{teacher?.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 2xl:w-1/3 lg:w-full items-center flex gap-2">
                  <Image src={"/date.png"} alt="" width={15} height={15} />
                  <span>{`${
                    month + " " + teacher?.birthday.getFullYear()
                  }`}</span>
                </div>
                <div className="w-full md:w-1/3 2xl:w-1/3 lg:w-full items-center flex gap-2">
                  <Image src={"/mail.png"} alt="" width={15} height={15} />
                  <span>{teacher?.email}</span>
                </div>
                <div className="w-full md:w-1/3 2xl:w-1/3 lg:w-full items-center flex gap-2">
                  <Image src={"/phone.png"} alt="" width={15} height={15} />
                  <span>{teacher?.phone}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 flex flex-wrap justify-between gap-4">
            {/* CARD */}
            <div className="w-full md:w-[98%]  xl:w-[45%] 2xl:w-[48%]  bg-white rounded-md p-4 flex items-center gap-5 ">
              <Image
                src={"/singleAttendance.png"}
                alt=""
                width={20}
                height={20}
                className="w-6 h-6"
              />
              <div className="">
                <span className="font-semibold text-xl">100%</span>
                <p>Attendance</p>
              </div>
            </div>
            {/* CARD */}
            <div className="w-full md:w-[98%] xl:w-[45%] 2xl:w-[48%] bg-white rounded-md p-4 flex items-center gap-5 ">
              <Image
                src={"/singleBranch.png"}
                alt=""
                width={20}
                height={20}
                className="w-6 h-6"
              />
              <div className="">
                <span className="font-semibold text-xl">
                  {teacher._count.subjects}
                </span>
                <p>Branches</p>
              </div>
            </div>
            {/* CARD */}
            <div className="w-full md:w-[98%] xl:w-[45%] 2xl:w-[48%] bg-white rounded-md p-4 flex items-center gap-5">
              <Image
                src={"/singleClass.png"}
                alt=""
                width={20}
                height={20}
                className="w-6 h-6"
              />
              <div className="">
                <span className="font-semibold text-xl">
                  {teacher._count.classes}
                </span>
                <p>Classes</p>
              </div>
            </div>
            {/* CARD */}
            <div className="w-full md:w-[98%] xl:w-[45%] 2xl:w-[48%] bg-white rounded-md p-4 flex items-center gap-5">
              <Image
                src={"/singleLesson.png"}
                alt=""
                width={20}
                height={20}
                className="w-6 h-6"
              />
              <div className="">
                <span className="font-semibold text-xl">
                  {teacher._count.lessons}
                </span>
                <p>Lessons</p>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white p-4 rounded-md h-[800px]">
          <h1 className="font-semibold text-xl"> Teacher&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="font-semibold text-xl">Shortcuts</h1>
          <div className="mt-4 gap-3 flex items-center flex-wrap">
            <Link href={""} className="bg-blue-100 p-2 rounded-md w-fit">
              Teacher&apos;s Classes
            </Link>
            <Link href={""} className="bg-green-100 p-2 rounded-md w-fit">
              Teacher&apos;s Students
            </Link>
            <Link href={""} className="bg-pink-100 p-2 rounded-md w-fit">
              Teacher&apos;s Lessons
            </Link>
            <Link href={""} className="bg-purple-100 p-2 rounded-md w-fit">
              Teacher&apos;s Exams
            </Link>
            <Link href={""} className="bg-yellow-100 p-2 rounded-md w-fit">
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
         <PerformanceChart />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
