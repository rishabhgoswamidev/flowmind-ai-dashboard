"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const [input, setInput] = useState("");

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "New Day",
      completed: true,
    },
  ]);

  const handleCompleted = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const task = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    const newTasks = [...tasks, task];

    setTasks(newTasks);

    setInput("");
  };

  const handleDelete = (id: number) => {
    const updatedTasks = tasks.filter((item) => item.id !== id);

    setTasks(updatedTasks);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Tasks</h1>

          <p className="mt-2 text-gray-500">Manage your tasks effectively</p>
        </div>

        <form onSubmit={handleForm} className="flex gap-2">
          <input
            type="text"
            placeholder="Write a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="rounded-md border border-gray-200 bg-gray-50 p-2 outline-none hover:border-gray-300"
          />

          <button className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-purple-600 px-4 py-2 font-semibold text-white transition hover:shadow-md">
            <Plus size={20} />
            Add Task
          </button>
        </form>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {tasks.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border bg-white p-4"
          >
            <p
              className={`text-lg ${
                item.completed ? "text-gray-400 line-through" : "text-black"
              }`}
            >
              {item.text}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => handleCompleted(item.id)}
                className={`rounded-md px-4 py-2 font-medium transition cursor-pointer ${
                  item.completed
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {item.completed ? "Completed" : "Pending"}
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="rounded-md px-4 py-2 font-medium transition cursor-pointer bg-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
