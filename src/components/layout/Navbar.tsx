"use client";

import { Search, ToggleLeft, CircleUserRound } from "lucide-react";

import { useEffect, useState, useRef } from "react";

type TaskType = {
  id: number;
  text: string;
  completed: boolean;
};

type NoteType = {
  id: number;
  text: string;
  bgColor: string;
};

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const taskData = localStorage.getItem("Tasks Data");

    const noteData = localStorage.getItem("Notes Data");

    if (taskData) {
      setTasks(JSON.parse(taskData));
    }

    if (noteData) {
      setNotes(JSON.parse(noteData));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const hasResults = filteredTasks.length > 0 || filteredNotes.length > 0;

  return (
    <nav className="sticky top-0 z-10 flex h-20 gap-4 items-center justify-between border-b bg-white px-4 md:px-8">
      <div ref={searchRef} className="relative flex-1 max-w-sm">
        <div className="flex h-11 items-center gap-2 rounded-full border border-gray-200 pr-4 transition focus-within:border-purple-400 focus-within:bg-white">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks or notes..."
            className="flex-1 bg-transparent p-2 pl-4 text-sm outline-none"
          />

          <Search size={18} className="shrink-0 text-gray-500" />
        </div>

        {searchQuery.trim() && (
          <div className="absolute top-14 z-50 max-h-[400px] w-full overflow-y-auto rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
            {filteredTasks.length > 0 && (
              <div>
                <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Tasks
                </p>

                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="cursor-pointer rounded-xl p-3 transition hover:bg-gray-100"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="line-clamp-1 text-sm font-medium text-gray-800">
                        {task.text}
                      </p>

                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          task.completed
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {task.completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredNotes.length > 0 && (
              <div className="mt-2">
                <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Notes
                </p>

                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className="cursor-pointer rounded-xl p-3 transition hover:bg-gray-100"
                  >
                    <p className="line-clamp-2 text-sm font-medium text-gray-800">
                      {note.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {!hasResults && (
              <div className="py-6 text-center">
                <p className="text-sm text-gray-500">No results found</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <ToggleLeft
          size={32}
          className="cursor-pointer text-gray-700 transition-colors hover:text-black"
        />

        <CircleUserRound
          size={32}
          className="cursor-pointer text-gray-700 transition-colors hover:text-black"
        />
      </div>
    </nav>
  );
};

export default Navbar;
