"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTasks } from "../../context/TasksContext";
import { Plus, Trash2 } from "lucide-react";

const columns = {
  todo: "To Do",
  progress: "In Progress",
  done: "Done",
};

export default function TasksBoard() {
  const { tasks, setTasks, addTask, deleteTask } = useTasks();
  const [newTask, setNewTask] = useState("");

  // Add new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    addTask(newTask.trim());
    setNewTask("");
  };

  // Drag handler
  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id.toString() === draggableId
          ? { ...t, status: destination.droppableId }
          : t
      )
    );
  };

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-10 text-center">
        🗂️ Task Board
      </h1>

      {/* Add Task Bar */}
      <form
        onSubmit={handleAddTask}
        className="mb-8 flex items-center gap-3 bg-white/10 dark:bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10"
      >
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 bg-transparent border border-white/20 rounded-lg outline-none focus:border-blue-400 transition text-white"
        />

        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-md"
        >
          <Plus size={18} /> Add
        </button>
      </form>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(columns).map((colKey) => {
            const colTasks = tasks
              .filter((t) => t.status === colKey)
              .sort((a, b) => a.id - b.id);

            return (
              <Droppable droppableId={colKey} key={colKey}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`
                      p-5 rounded-xl min-h-[450px] 
                      backdrop-blur-md border
                      transition-all
                      ${
                        colKey === "todo"
                          ? "bg-rose-500/10 border-rose-400/20"
                          : colKey === "progress"
                          ? "bg-blue-500/10 border-blue-400/20"
                          : "bg-green-500/10 border-green-400/20"
                      }
                      ${
                        snapshot.isDraggingOver
                          ? "scale-[1.02] shadow-lg border-white/40"
                          : ""
                      }
                    `}
                  >
                    {/* Column Title */}
                    <h2 className="text-xl font-semibold mb-4 text-white">
                      {columns[colKey]}
                    </h2>

                    {/* Tasks */}
                    {colTasks.map((task, index) => (
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-4 mb-3 rounded-xl flex justify-between items-center shadow-md
                              bg-white dark:bg-gray-800 
                              border border-transparent 
                              transition-all
                              ${
                                snapshot.isDragging
                                  ? "scale-[1.03] shadow-xl border-blue-500/50"
                                  : ""
                              }
                            `}
                          >
                            <span className="font-medium">{task.title}</span>

                            <button
                              onClick={() => deleteTask(task.id)}
                              className="text-red-500 hover:text-red-700 transition"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
