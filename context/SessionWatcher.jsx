"use client";

import { useEffect, useRef } from "react";
import { useSession } from "./SessionContext";
import { useCategories } from "./CategoryContext";
import { useActiveTask } from "./ActiveTaskContext";

export default function SessionWatcher() {
  const { secondsLeft, totalSeconds } = useSession();
  const { addSessionToTask } = useCategories();
  const { activeTask } = useActiveTask();

  const saved = useRef(false);

  useEffect(() => {
    if (
      secondsLeft === 0 &&
      totalSeconds > 0 &&
      activeTask &&
      !saved.current
    ) {
      addSessionToTask(
        activeTask.categoryId,
        activeTask.chapterId,
        activeTask.taskId,
        totalSeconds
      );
      saved.current = true;
    }

    if (secondsLeft > 0) saved.current = false;
  }, [secondsLeft, totalSeconds, activeTask]);

  return null;
}
