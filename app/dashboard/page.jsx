"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [mood, setMood] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);

    const savedMood = localStorage.getItem("moodToday");
    if (savedMood) setMood(savedMood);
  }, []);

  const todayTasks = tasks.filter((t) => !t.completed);
  const completedToday = tasks.filter((t) => t.completed).length;

  return (
    <div className="dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card: Today's Tasks */}
        <div className="p-6 border dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Today's Tasks</h2>
          {todayTasks.length === 0 ? (
            <p className="opacity-75">No tasks for today 🎉</p>
          ) : (
            <ul className="space-y-2">
              {todayTasks.slice(0, 5).map((task) => (
                <li key={task.id}>• {task.text}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Card: Stats */}
        <div className="p-6 border dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Daily Stats</h2>
          <p>Completed tasks: {completedToday}</p>
          <p>Pending tasks: {todayTasks.length}</p>
        </div>

        {/* Card: Mood */}
        <div className="p-6 border dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Your Mood</h2>

          {mood ? (
            <div className="text-4xl">{mood}</div>
          ) : (
            <p>No mood logged yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
