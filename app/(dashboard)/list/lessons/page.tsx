import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Class, Lesson, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import TableSearch from "@/app/(components)/TableSearch";
import Table from "@/app/(components)/Table";
import Pagination from "@/app/(components)/pagination";

type LessonList = Lesson & { teacher: Teacher } & { class: Class };
const columns = [
  {
    header: "Subject name",
    accessor: "subjectname",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const RenderRow = (item: LessonList) => {
  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-blue-50"
    >
      <td className="hidden md:table-cell">{item.name}</td>
      <td className="hidden md:table-cell">{item.class.name}</td>
      <td className="hidden md:table-cell">{item.teacher.name}</td>
      <td>
        <div className="flex items-center gap-3">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full object-cover bg-green-200 cursor-pointer">
              <Image src={"/view.png"} alt="" width={15} height={15} />
            </button>
          </Link>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-300 cursor-pointer">
            <Image src="/delete.png" alt="" width={15} height={15} />
          </button>
        </div>
      </td>
    </tr>
  );
};

const LessonListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const [data, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      include: {
        class: true,
        teacher: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.lesson.count(),
  ]);
  return (
    <div className="bg-white p-4 m-4 mt-0 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl hidden md:block">All teachers</h1>
        <div className="flex flex-col md:flex-row w-full md:w-auto justify-between gap-5 items-center">
          <TableSearch />
          <div className="flex items-center gap-5 self-end">
            <button className="bg-amber-200 rounded-full object-cover p-2 w-8 h-8 cursor-pointer">
              <Image src={`/filter.png`} alt="" width={20} height={20} />
            </button>
            <button className="bg-amber-200 rounded-full w-8 h-8 object-cover p-2 cursor-pointer">
              <Image src={"/sort.png"} alt="" width={20} height={20} />
            </button>
            <button className="bg-amber-200 rounded-full w-8 h-8 object-cover p-2 cursor-pointer">
              <Image src={"/create.png"} alt="" width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={RenderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default LessonListPage;
