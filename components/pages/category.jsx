"use client";

import { useState } from "react";
import { useCategories } from "@/context/CategoryContext";
import ReturnButton from "@/components/ui/returnbutton";

export default function CategoryTaskManager({ setActiveApp }) {
  const {
    categories,
    addCategory,
    addChapter,
    addTask,
    completeTask
  } = useCategories();

  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [newChapter, setNewChapter] = useState("");
  const [newTask, setNewTask] = useState("");

  const activeCategory = categories.find(c => c.id === activeCategoryId);

  // ---------- helpers ----------
  const getChapterProgress = ch => {
    if (ch.tasks.length === 0) return 0;
    const done = ch.tasks.filter(t => t.completed).length;
    return Math.floor((done / ch.tasks.length) * 100);
  };

  const getCategoryProgress = cat => {
    const allTasks = cat.chapters.flatMap(ch => ch.tasks);
    if (allTasks.length === 0) return 0;
    const done = allTasks.filter(t => t.completed).length;
    return Math.floor((done / allTasks.length) * 100);
  };

  return (
    <main>
      <ReturnButton setActiveApp={setActiveApp} />

      <div className="h-[50vh] gap-4 p-4 text-white flex flex-row">
        {/* ================= SIDEBAR ================= */}
        <aside className="w-72 bg-zinc-900 rounded-xl p-4">
          <h2 className="text-lg font-bold mb-3">Categories</h2>

          {categories.map(cat => {
            const percent = getCategoryProgress(cat);
            return (
              <div key={cat.id} className="mb-2">
                <button
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    activeCategoryId === cat.id
                      ? "bg-indigo-600"
                      : "bg-zinc-800 hover:bg-zinc-700"
                  }`}
                >
                  📁 {cat.name} ({percent}%)
                </button>

                <div className="h-1 bg-zinc-700 rounded mt-1">
                  <div
                    className="h-full bg-green-500 transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}

          <input
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            placeholder="New category"
            className="mt-3 w-full p-2 rounded bg-zinc-800"
          />

          <button
            onClick={() => {
              if (!newCategory.trim()) return;
              addCategory(newCategory);
              setNewCategory("");
            }}
            className="mt-2 w-full bg-indigo-500 p-2 rounded"
          >
            + Add Category
          </button>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="flex-1 bg-zinc-900 rounded-xl p-5 overflow-auto">
          {!activeCategory ? (
            <p className="text-zinc-400">Select a category</p>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">
                {activeCategory.name} ({getCategoryProgress(activeCategory)}%)
              </h2>

              {/* Add Chapter */}
              <div className="flex gap-2 mb-4">
                <input
                  value={newChapter}
                  onChange={e => setNewChapter(e.target.value)}
                  placeholder="New chapter"
                  className="flex-1 p-2 rounded bg-zinc-800"
                />
                <button
                  onClick={() => {
                    if (!newChapter.trim()) return;
                    addChapter(activeCategory.id, newChapter);
                    setNewChapter("");
                  }}
                  className="bg-indigo-500 px-4 rounded"
                >
                  + Chapter
                </button>
              </div>

              {/* Chapters */}
              {activeCategory.chapters.map(ch => {
                const percent = getChapterProgress(ch);

                return (
                  <div
                    key={ch.id}
                    className="mb-4 p-4 bg-zinc-800 rounded-lg"
                  >
                    <h3 className="font-semibold mb-1">
                      {ch.title} ({percent}%)
                    </h3>

                    <div className="h-1 bg-zinc-700 rounded mb-3">
                      <div
                        className="h-full bg-green-500 transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    {/* Tasks */}
                    {ch.tasks.map(t => (
                      <button
                        key={t.id}
                        onClick={() =>
                          completeTask(
                            activeCategory.id,
                            ch.id,
                            t.id
                          )
                        }
                        className={`block w-full text-left px-3 py-2 mb-1 rounded ${
                          t.completed
                            ? "bg-green-700 line-through"
                            : "bg-zinc-700 hover:bg-zinc-600"
                        }`}
                      >
                        ▶ {t.title}
                      </button>
                    ))}

                    {/* Add Task */}
                    <div className="flex gap-2 mt-2">
                      <input
                        value={newTask}
                        onChange={e => setNewTask(e.target.value)}
                        placeholder="New task"
                        className="flex-1 p-2 rounded bg-zinc-700"
                      />
                      <button
                        onClick={() => {
                          if (!newTask.trim()) return;
                          addTask(activeCategory.id, ch.id, newTask);
                          setNewTask("");
                        }}
                        className="bg-green-500 px-3 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </main>
      </div>
    </main>
  );
}
