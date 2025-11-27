"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTasks } from "../../context/TasksContext";

const columns = {
  todo: "To Do",
  progress: "In Progress",
  done: "Done",
};

export default function TasksBoard() {
  const { tasks, setTasks, addTask, deleteTask } = useTasks();
  const [newTask, setNewTask] = useState("");

  // Add a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    addTask(newTask.trim());
    setNewTask("");
  };

  // Handle drag end safely
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
      <h1 className="text-3xl font-bold mb-6">Task Board</h1>

      {/* Add Task */}
      <form onSubmit={handleAddTask} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
          className="flex-1 border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(columns).map((colKey) => {
            const colTasks = tasks
              .filter((t) => t.status === colKey)
              .sort((a, b) => a.id - b.id); // Keep stable order

            return (
              <Droppable droppableId={colKey} key={colKey}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg min-h-[400px]"
                  >
                    <h2 className="text-xl font-bold mb-4">
                      {columns[colKey]}
                    </h2>

                    {colTasks.map((task, index) => (
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-3 mb-3 bg-white dark:bg-gray-700 rounded shadow flex justify-between items-center"
                          >
                            {task.title}
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Delete
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
