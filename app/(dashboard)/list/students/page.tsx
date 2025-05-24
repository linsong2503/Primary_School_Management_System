import { Student, Class, Grade } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import TableSearch from "@/app/(components)/TableSearch";
import Table from "@/app/(components)/Table";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import Pagination from "@/app/(components)/pagination";
const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  { header: "Grade", accessor: "grade", className: "hidden md:table-cell" },

  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },

  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },

  { header: "Actions", accessor: "actions" },
];
type StudentList = Student & { class: Class } & { grade: Grade };

const RenderRow = (item: StudentList) => {
  return (
    <tr
      key={item.id}
      className="even:bg-slate-100 hover:bg-blue-50 border-b text-sm border-gray-200"
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
          <h2 className=" font-semibold">{item.name}</h2>
          <p className=" text-xs text-gray-600">{item.class.name}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.id}</td>
      <td className="hidden md:table-cell">{item.grade.level}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
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

const StudentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const [data, count] = await prisma.$transaction([
    prisma.student.findMany({
      include: {
        class: true,
        grade: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.student.count(),
  ]);
  return (
    <div className="bg-white p-4 rounded-md m-4 flex-1 mt-0">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold hidden md:block">All Students</h1>
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
      <Pagination page={p} count={count}/>
    </div>
  );
};

export default StudentListPage;
