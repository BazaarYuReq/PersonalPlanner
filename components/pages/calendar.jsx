"use client";
import ReturnButton from "@/components/ui/returnbutton";
import { useEffect, useState } from "react";

export default function CalendarPage() {
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

  return (<main>   <ReturnButton />
    <div className="dark:text-white w-[100vh] flex flex-col translate-x-[135px] py-10">
      {" "}
  
      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={prevMonth}
          className="px-3 py-1 bg-gray-700 dark:bg-gray-800 rounded"
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
          className="px-3 py-1 bg-gray-700 dark:bg-gray-800 rounded"
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
              className="p-2 h-24 border rounded dark:border-gray-700 flex flex-col items-start"
            >
              <div className="font-bold">{day}</div>

              <div className="overflow-y-auto w-full text-left">
                {dayTasks.slice(0, 3).map((t) => (
                  <div
                    key={t.id}
                    className="text-xs bg-blue-500 text-white rounded px-1 mt-1"
                  >
                    {t.text}
                  </div>
                ))}
                {dayTasks.length > 3 && (
                  <div className="text-xs opacity-60 mt-1">
                    +{dayTasks.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div></main>
  );
}
