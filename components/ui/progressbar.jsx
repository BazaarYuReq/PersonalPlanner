"use client";
import { useTasks } from "../../context/TasksContext";

export default function ProgressBar() {
  const { tasks, setTasks } = useTasks(); // we’ll need setTasks to add achievements
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const totalTasks = tasks.length;
  const doneTasksCount = tasks.filter((t) => t.status === "done").length;
  const completionPercent = totalTasks
    ? Math.round((doneTasksCount / totalTasks) * 100)
    : 0;

  const handleReward = () => {
    // Prevent duplicate achievement for today
    const alreadyExists = tasks.find(
      (t) => t.type === "achievement" && t.date === today
    );
    if (alreadyExists) return;

    const newAchievement = {
      id: Date.now(),
      text: `Completed all ${totalTasks} tasks! 🎉`,
      status: "done",
      type: "achievement",
      date: today,
    };

    const updatedTasks = [...tasks, newAchievement];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="fixed top-4 right-4 w-64 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg z-50">
      <h3 className="text-lg font-semibold mb-1 text-gray-700 dark:text-gray-200">
        Completion
      </h3>
      <div className="w-full bg-gray-300 dark:bg-gray-700 h-4 rounded">
        <div
          className="bg-green-500 h-4 rounded transition-all duration-500"
          style={{ width: `${completionPercent}%` }}
        ></div>
      </div>
      <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
        {completionPercent}% completed
      </p>

      {completionPercent === 100 && (
        <button
          className="bg-green-700 rounded px-4 py-2 mt-3 text-white font-semibold animate-bounce w-full"
          onClick={handleReward}
        >
          Receive reward 🎁
        </button>
      )}
    </div>
  );
}
