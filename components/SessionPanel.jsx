"use client";

import { useSession } from "@/context/SessionContext";
import { useActiveTask } from "@/context/ActiveTaskContext";

export default function SessionPanel() {
  const { running, secondsLeft, start, stop } = useSession();
  const { activeTask } = useActiveTask();

  return (
    <div className="bg-zinc-900 p-6 rounded-xl text-center">
      <h2 className="text-2xl font-bold mb-3">Pomodoro</h2>

      {activeTask ? (
        <p className="text-sm text-green-400 mb-3">
          Studying: <strong>{activeTask.taskName}</strong>
        </p>
      ) : (
        <p className="text-sm text-red-400 mb-3">
          Select a task to start
        </p>
      )}

      <div className="text-5xl mb-4">
        {Math.floor(secondsLeft / 60)}:
        {(secondsLeft % 60).toString().padStart(2, "0")}
      </div>

      <div className="flex justify-center gap-3">
        <button
          disabled={!activeTask || running}
          onClick={() => start(25)}
          className="px-4 py-2 bg-indigo-600 rounded disabled:opacity-40"
        >
          Start
        </button>

        <button
          onClick={stop}
          className="px-4 py-2 bg-zinc-700 rounded"
        >
          Stop
        </button>
      </div>
    </div>
  );
}
