/* eslint-disable @typescript-eslint/no-unused-vars */
import TableSearch from "@/app/(components)/TableSearch";
import Pagination from "@/app/(components)/pagination";
import { Teacher, Subject, Class } from "@prisma/client";
import Table from "@/app/(components)/Table";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };
const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
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

const TeacherListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.teacher.count(),
  ]);

  const RenderRow = (item: TeacherList) => {
    return (
      <tr
        key={item.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-blue-50"
      >
        <td className="flex items-center gap-4 p-4">
          <Image
            src={item.img || "/noAvatar.png"}
            alt=""
            width={40}
            height={40}
            className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-xs text-gray-500">{item?.email}</p>
          </div>
        </td>
        <td className="hidden md:table-cell pl-1">{item.username}</td>
        <td className="hidden md:table-cell pl-1">
          {item.subjects.map((subject) => subject.name).join(",")}
        </td>
        <td className="hidden md:table-cell pl-1">
          {item.classes.map((classItem) => classItem.name).join(",")}
        </td>
        <td className="hidden md:table-cell pl-1">{item.phone}</td>
        <td className="hidden md:table-cell pl-1">{item.address}</td>
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
  return (
    <div className="bg-white p-4 rounded-md m-4 flex-1 mt-0">
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
      {/* TABLE */}
      <Table columns={columns} renderRow={RenderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default TeacherListPage;
