"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTasks } from "@/context/TasksContext";

export default function TaskCarousel() {
  const { tasks } = useTasks();

  // Sort by status visually: todo → progress → done
  const ordered = ["todo", "progress", "done"];
  const sortedTasks = [...tasks].sort(
    (a, b) => ordered.indexOf(a.status) - ordered.indexOf(b.status)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "todo":
        return "bg-red-500/20 text-red-400";
      case "progress":
        return "bg-yellow-500/20 text-yellow-400";
      case "done":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <Carousel>
        <CarouselContent>
          {sortedTasks.length === 0 && (
            <CarouselItem>
              <div className="p-6 bg-[#111827] border border-gray-800 rounded-xl text-gray-400">
                No tasks yet. Add some!
              </div>
            </CarouselItem>
          )}

          {sortedTasks.map((task) => (
            <CarouselItem key={task.id}>
              <div className="p-6 bg-[#111827] border border-gray-800 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">{task.title}</h3>

                <span
                  className={`px-3 py-1 text-sm rounded-full ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status === "todo" && "To Do"}
                  {task.status === "progress" && "In Progress"}
                  {task.status === "done" && "Completed"}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
