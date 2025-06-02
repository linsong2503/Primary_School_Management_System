import React from "react";
import Image from "next/image";
import { Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
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
  const DoB = teacher?.birthday.getMonth().toString();
  const month = months[DoB];
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
              <h1 className="font-semibold text-xl">{teacher?.name}</h1>
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
          <div className="flex-1">
                  
          </div>
        </div>
        {/* BOTTOM */}
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3">r</div>
    </div>
  );
};

export default SingleTeacherPage;
