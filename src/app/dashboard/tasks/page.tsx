"use client";

import { Plus } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { ActivityType } from "@/types/dataTypes";

const Page = () => {
  const [input, setInput] = useState("");
  const tasks = useAppStore((state) => state.tasks);
  const setTasks = useAppStore((state) => state.setTasks);
  const setActivities = useAppStore((state) => state.setActivities);
  const activities = useAppStore((state) => state.activities);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);
  const taskRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const searchParams = useSearchParams();
  const taskId = searchParams.get("id");

  useEffect(() => {
    if (!taskId) return;

    const id = Number(taskId);
    setHighlightedId(id);

    setTimeout(() => {
      taskRefs.current[id]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);

    const timeout = setTimeout(() => {
      setHighlightedId(null);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [taskId]);

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    const task = {
      id: Date.now(),
      text: input,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, task]);

    const activity: ActivityType = {
      id: Date.now(),
      action: `Created task "${task.text}"`,
      type: "task",
      createdAt: new Date().toISOString(),
    };

    setActivities([activity, ...activities]);

    setInput("");
  };

  const handleCompleted = (id: number) => {
    const currentTask = tasks.find((task) => task.id === id);

    if (!currentTask) return;

    const updatedTasks = tasks.map((task) => {
      if (task.id !== id) return task;

      const isNowCompleted = !task.completed;

      return {
        ...task,
        completed: isNowCompleted,
        completedAt: isNowCompleted ? new Date().toISOString() : undefined,
      };
    });

    const activity: ActivityType = {
      id: Date.now(),
      action: `Completed "${currentTask.text}"`,
      type: "complete",
      createdAt: new Date().toISOString(),
    };

    setActivities([activity, ...activities]);
    setTasks(updatedTasks);
  };

  const handleDelete = (id: number) => {
    const task = tasks.find((task) => task.id === id);

    if (!task) return;

    const updatedTasks = tasks.filter((task) => task.id !== id);

    const activity: ActivityType = {
      id: Date.now(),
      action: `Deleted task "${task.text}"`,
      type: "delete",
      createdAt: new Date().toISOString(),
    };

    setActivities([activity, ...activities]);

    setTasks(updatedTasks);
  };

  return (
    <div className="mx-auto max-w-7xl bg-gray-50 p-4 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Tasks</h1>
          <p className="mt-2 text-gray-500">Manage your tasks effectively</p>
        </div>

        <form onSubmit={handleForm} className="flex w-full gap-2 md:w-auto">
          <input
            type="text"
            placeholder="Write a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-md border border-gray-200 bg-gray-50 p-2 outline-none transition hover:border-gray-300 focus:border-purple-400 md:w-[300px]"
          />
          <button className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-purple-600 px-4 py-2 font-semibold text-white transition hover:shadow-md">
            <Plus size={20} />

            <span className="hidden sm:block">Add Task</span>
          </button>
        </form>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {tasks.map((item) => {
          const isSelected = highlightedId === item.id;
          return (
            <div
              key={item.id}
              ref={(el) => {
                taskRefs.current[item.id] = el;
              }}
              className={`flex flex-col gap-4 overflow-hidden rounded-xl border bg-white p-4 transition-all duration-300 md:flex-row md:items-center md:justify-between ${
                isSelected ? "ring-2 ring-purple-500" : ""
              }`}
            >
              <div className="min-w-0 flex-1 overflow-hidden">
                <p
                  className={`break-all text-lg ${
                    item.completed ? "text-gray-400 line-through" : "text-black"
                  }`}
                >
                  {item.text}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCompleted(item.id)}
                  className={`rounded-md px-4 py-2 font-medium transition ${
                    item.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.completed ? "Completed" : "Pending"}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-md bg-red-100 px-4 py-2 font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
