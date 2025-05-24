import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Parent, Student } from "@prisma/client";
import prisma from "@/lib/prisma";
import TableSearch from "@/app/(components)/TableSearch";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import Table from "@/app/(components)/Table";
import Pagination from "@/app/(components)/pagination";
type ParentList = Parent & { students: Student[] };

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student Names",
    accessor: "studentnames",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const RenderRow = (item: ParentList) => {
  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-blue-50"
    >
      <td className="hidden md:table-cell">
        <div className="flex flex-col">
          <h1 className="font-semibold hidden md:block">{item.name}</h1>
          <p className="text-xs">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        {item.students.map((student) => student.name).join(",")}
      </td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-3">
          <Link href={`/list/parents/${item.id}`}>
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
const ParentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const [data, count] = await prisma.$transaction([
    prisma.parent.findMany({
      include: {
        students: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.parent.count(),
  ]);
  return (
    <div className="bg-white p-4 my-4 flex-1 mt-0 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold hidden md:block">All Parents</h1>
        <div className="flex flex-col md:flex-row md:w-auto w-full justify-between items-center gap-5">
          <TableSearch />
          <div className="flex items-center gap-5 self-end">
            <button className="bg-amber-200 rounded-full object-cover p-2 w-8 h-8 cursor-pointer">
              <Image src={"/filter.png"} alt="" width={16} height={16} />
            </button>
            <button className="bg-amber-200 rounded-full object-cover p-2 w-8 h-8 cursor-pointer">
              <Image src={"/sort.png"} alt="" width={16} height={16} />
            </button>
            <button className="bg-amber-200 rounded-full object-cover p-2 w-8 h-8 cursor-pointer">
              <Image src={"/create.png"} alt="" width={16} height={16} />
            </button>
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={RenderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ParentListPage;
