"use client";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
const calendarEvents = [
  {
    title: "Math",
    allDay: false,
    start: new Date(2025, 5, 4, 8, 0),
    end: new Date(2025, 5, 4, 8, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2025, 5, 4, 9, 0),
    end: new Date(2025, 5, 4, 9, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2025, 5, 4, 10, 0),
    end: new Date(2025, 5, 4, 10, 45),
  },
  {
    title: "Physics",
    allDay: false,
    start: new Date(2025, 5, 4, 11, 0),
    end: new Date(2025, 5, 4, 11, 45),
  },
  {
    title: "Chemistry",
    allDay: false,
    start: new Date(2025, 5, 4, 13, 0),
    end: new Date(2025, 5, 4, 13, 45),
  },
  {
    title: "History",
    allDay: false,
    start: new Date(2025, 5, 4, 14, 0),
    end: new Date(2025, 5, 4, 14, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2025, 5, 13, 9, 0),
    end: new Date(2025, 5, 13, 9, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2025, 5, 13, 10, 0),
    end: new Date(2025, 5, 13, 10, 45),
  },
  {
    title: "Physics",
    allDay: false,
    start: new Date(2025, 5, 13, 11, 0),
    end: new Date(2025, 5, 13, 11, 45),
  },

  {
    title: "History",
    allDay: false,
    start: new Date(2025, 5, 13, 14, 0),
    end: new Date(2025, 5, 13, 14, 45),
  },
  {
    title: "Math",
    allDay: false,
    start: new Date(2025, 5, 14, 8, 0),
    end: new Date(2025, 5, 14, 8, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2025, 5, 14, 10, 0),
    end: new Date(2025, 5, 14, 10, 45),
  },

  {
    title: "Chemistry",
    allDay: false,
    start: new Date(2025, 5, 14, 13, 0),
    end: new Date(2025, 5, 14, 13, 45),
  },
  {
    title: "History",
    allDay: false,
    start: new Date(2025, 5, 14, 14, 0),
    end: new Date(2025, 5, 13, 14, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2025, 5, 15, 9, 0),
    end: new Date(2025, 5, 15, 9, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2025, 5, 15, 10, 0),
    end: new Date(2025, 5, 15, 10, 45),
  },
  {
    title: "Physics",
    allDay: false,
    start: new Date(2025, 5, 15, 11, 0),
    end: new Date(2025, 5, 15, 11, 45),
  },

  {
    title: "History",
    allDay: false,
    start: new Date(2025, 5, 15, 14, 0),
    end: new Date(2025, 5, 15, 14, 45),
  },
  {
    title: "Math",
    allDay: false,
    start: new Date(2025, 5, 15, 8, 0),
    end: new Date(2025, 5, 15, 8, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2025, 5, 15, 9, 0),
    end: new Date(2025, 5, 15, 9, 45),
  },

  {
    title: "Physics",
    allDay: false,
    start: new Date(2025, 5, 15, 11, 0),
    end: new Date(2025, 5, 15, 11, 45),
  },
  {
    title: "Chemistry",
    allDay: false,
    start: new Date(2025, 5, 15, 13, 0),
    end: new Date(2025, 5, 15, 13, 45),
  },
  {
    title: "History",
    allDay: false,
    start: new Date(2025, 5, 15, 14, 0),
    end: new Date(2025, 5, 15, 14, 45),
  },
];
const BigCalendar = () => {
  const [view, SetView] = useState<View>(Views.WORK_WEEK);
  const handleOnChange = (selectedView: View) => {
    SetView(selectedView);
  };
  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "98%", width:"100%"}}
      views={["work_week", "day"]}
      view={view}
      onView={handleOnChange}
      min={new Date(2025, 5, 4, 8, 0, 0)} 
      max={new Date(2025, 5, 4, 15, 0, 0)}
    />
  );
};
export default BigCalendar;
