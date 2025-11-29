"use client";
import React from "react";

export default function TaskCardPreview({ title, description, status }) {
  const statusStyles = {
    todo: "bg-yellow-900/40 border-yellow-800 text-yellow-300",
    progress: "bg-blue-900/40 border-blue-800 text-blue-300",
    done: "bg-green-900/40 border-green-800 text-green-300",
  };

  return (
    <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-6 shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold text-white">{title}</h2>

      {description && (
        <p className="mt-2 text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      )}

      <div
        className={`mt-4 inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full border ${statusStyles[status]}`}
      >
        {status === "todo" && "To Do"}
        {status === "progress" && "In Progress"}
        {status === "done" && "Completed"}
      </div>
    </div>
  );
}
