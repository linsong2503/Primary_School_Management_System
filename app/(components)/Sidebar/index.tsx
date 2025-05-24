"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import {
  Users,
  GraduationCap,
  // LucideIcon,
  Menu,
  User,
  Home,
  ScrollText,
  University,
  NotebookPen,
  Calendar,
  MessageCircle,
  Speaker,
  Timer,
  SquareChartGantt,
  BookA,
  ClipboardCheck,
  ShieldUser,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { role } from "@/lib/data";

const SidebarItems = [
  {
    title: "MENU",
    items: [
      {
        icon: <Home />,
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <GraduationCap />,
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: <Users />,
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: <User />,
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: <ScrollText />,
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: <University />,
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: <NotebookPen />,
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: <Timer />,
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <SquareChartGantt />,
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <BookA />,
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <ClipboardCheck />,
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <Calendar />,
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <MessageCircle />,
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <Speaker />,
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: <ShieldUser />,
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <LogOut />,
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16 overflow-x-hidden" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-y-auto 
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <Image
          src="/school_logo.png"
          alt=""
          width={27}
          height={27}
          className="rounded w-10"
        />
        <h1
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >
          CPS
        </h1>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100 "
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}

      <div className="flex-grow mt-3">
        {SidebarItems.map((i) => (
          <div key={i.title}>
            <span
              className={`hidden lg:block  font-light my-4 ml-7 ${
                isSidebarCollapsed ? "invisible" : ""
              }`}
            >
              {i.title}
            </span>
            {i.items.map((item) => {
              if (item.visible.includes(role)) {
                const isActive = pathname === item.href;
                return (
                  <Link href={item.href} key={item.label}>
                    <div
                      className={`cursor-pointer flex items-center ${
                        isSidebarCollapsed
                          ? "justify-center py-4"
                          : "justify-start px-8 py-4"
                      }
         hover:bg-blue-100 gap-3 transition-colors ${
           isActive ? "bg-blue-200 text-white" : ""
         }
      }`}
                    >
                      <div className="w-6 h-6 text-gray-700">{item.icon}</div>

                      <span
                        className={`${
                          isSidebarCollapsed ? "hidden" : "block"
                        } font-medium text-gray-700`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </Link>
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
