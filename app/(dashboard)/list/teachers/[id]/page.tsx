import React from "react";
import { Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
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
        where: {id},
        include: {
          _count: {
            select:{
              subjects:true,
              lessons:true,
              classes:true
            }
          }
        }
      })
      ;
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">l</div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3">r</div>
    </div>
  );
};

export default SingleTeacherPage;
