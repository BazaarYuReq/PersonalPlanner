"use client";
import ReturnButton from "@/components/ui/returnbutton";
import { useEffect, useState } from "react";

export default function CalendarPage({ setActiveApp }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay(); // weekday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getTasksForDay = (day) => {
    return tasks.filter((t) => {
      const d = new Date(t.date);
      return (
        d.getDate() === day &&
        d.getMonth() === month &&
        d.getFullYear() === year
      );
    });
  };

  return (
    <main>
      <ReturnButton setActiveApp={setActiveApp} />
      <div className=" dark:bg-black dark:text-white bg-white flex flex-col py-2 w-[950px] h-[485px] px-5">
        {" "}
        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-6 ">
          <button
            onClick={prevMonth}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-800 rounded"
          >
            ←
          </button>

          <h2 className="text-xl font-bold">
            {currentDate.toLocaleString("default", {
              month: "long",
            })}{" "}
            {year}
          </h2>

          <button
            onClick={nextMonth}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-800 rounded"
          >
            →
          </button>
        </div>
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-3 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="font-bold">
              {d}
            </div>
          ))}

          {/* Empty cells */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={i}></div>
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayTasks = getTasksForDay(day);

            return (
              <div
                key={i}
                className="p-2 h-16 border rounded dark:border-gray-300 flex flex-col items-start border-black"
              >
                <div className="font-bold">{day}</div>

                <div className="overflow-y-auto w-full text-left flex">
                  {dayTasks.slice(0, 3).map((t) => (
                    <div
                      key={t.id}
                      className="text-xs text-yellow-500 bg-purple-700 rounded px-1 mt-1 x-[50px] h-[50px]"
                    >
                      {t.text}
                    </div>
                  ))}
                  {dayTasks.length > 3 && (
                    <div className="text-xs opacity-50 mt-1">
                      +{dayTasks.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
