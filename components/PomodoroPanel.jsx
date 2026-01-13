"use client";

import { useSession } from "@/context/SessionContext";
import { useActiveTask } from "@/context/ActiveTaskContext";

export default function PomodoroPanel() {
  const { secondsLeft, start, stop, running } = useSession();
  const { activeTask } = useActiveTask();

  return (
    <div className="border p-4">
      <h3>
        {activeTask ? `Studying: ${activeTask.taskName}` : "Select a task"}
      </h3>

      <p className="text-2xl my-2">
        {Math.floor(secondsLeft / 60)}:
        {(secondsLeft % 60).toString().padStart(2, "0")}
      </p>

      <button
        disabled={!activeTask || running}
        onClick={() => start(25)}
      >
        Start
      </button>

      <button onClick={stop} className="ml-2">
        Stop
      </button>
    </div>
  );
}
