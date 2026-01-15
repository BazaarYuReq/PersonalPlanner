"use client";

import { useState } from "react";
import { useCategories } from "@/context/CategoryContext";
import { useActiveTask } from "@/context/ActiveTaskContext";
import ReturnButton from "@/components/ui/returnbutton"
export default function CategoryTaskManager( {setActiveApp} ) {
  const { categories, addCategory, addChapter, addTask } = useCategories();
  const { setActiveTask } = useActiveTask();

  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [newChapter, setNewChapter] = useState("");
  const [newTask, setNewTask] = useState("");

  const activeCategory = categories.find(c => c.id === activeCategoryId);

  return (<main>  <ReturnButton setActiveApp={setActiveApp} />
    <div className=" h-[50vh] gap-4 p-4 text-white flex flex-row">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 bg-zinc-900 rounded-xl p-4">
        <h2 className="text-lg font-bold mb-3">Categories</h2>

        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategoryId(cat.id)}
            className={`w-full text-left px-3 py-2 rounded-lg mb-1 ${
              activeCategoryId === cat.id
                ? "bg-indigo-600"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            📁 {cat.name}
          </button>
        ))}

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
              {activeCategory.name}
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
            {activeCategory.chapters.map(ch => (
              <div
                key={ch.id}
                className="mb-4 p-4 bg-zinc-800 rounded-lg"
              >
                <h3 className="font-semibold mb-2">{ch.title}</h3>

                {/* Tasks */}
                {ch.tasks.map(t => (
                  <button
                    key={t.id}
                    onClick={() =>
                      setActiveTask({
                        categoryId: activeCategory.id,
                        chapterId: ch.id,
                        taskId: t.id,
                        taskName: t.title,
                      })
                    }
                    className="block w-full text-left px-3 py-2 mb-1 rounded bg-zinc-700 hover:bg-zinc-600"
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
            ))}
          </>
        )}
      </main>
    </div>
    </main>
  );
}
