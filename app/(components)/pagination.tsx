"use client";
import React from "react";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";
const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();
  const changePage = (newPage:number) =>{
      const params = new URLSearchParams(window.location.search);
      params.set("page",newPage.toString());
      router.push(`${window.location.pathname}?${params}`);
  };
  const hasPrev = ITEMS_PER_PAGE*(page-1)>0;
  const hasNext = ITEMS_PER_PAGE*(page)<count;
  return (
    <div className="flex justify-between text-gray-600 items-center p-4">
      <button
        disabled = {!hasPrev}
        className="cursor-pointer px-4 py-2 rounded-md bg-gray-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={()=>{changePage(page-1)}}
      >
        Prev
      </button>

      <div className="flex items-center gap-4 text-sm">
        {Array.from(
          { length: Math.ceil(count / ITEMS_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                className={`px-2 rounded-sm ${
                  page === pageIndex ? "bg-blue-200" : ""
                } cursor-pointer`}
                onClick={()=>{
                  changePage(pageIndex);
                }}
              >{pageIndex}</button>
            );
          }
        )}
      </div>

      <button
         disabled = {!hasNext}
        className="cursor-pointer px-4 py-2 rounded-md bg-gray-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
         onClick={()=>{changePage(page+1)}}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
