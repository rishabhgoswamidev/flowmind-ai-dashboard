"use client";

import { Search, ToggleLeft, CircleUserRound, Menu } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {useAppStore} from "@/store/useAppStore"

type Props = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ setSidebarOpen }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const { tasks, notes } = useAppStore();
  const router = useRouter();

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
      <Link
        href="/dashboard"
        className="flex items-center justify-start md:hidden gap-2 cursor-pointer"
      >
        <Image src="/logo.png" alt="logo Image" width={32} height={32}></Image>
        <p className="text-lg md:text-2xl font-bold">FlowMind AI</p>
      </Link>

      <div ref={searchRef} className="relative flex-1 max-w-sm hidden md:block">
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
                    onClick={() =>
                      router.push(`/dashboard/tasks?id=${task.id}`)
                    }
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
                    onClick={() =>
                      router.push(`/dashboard/notes?id=${note.id}`)
                    }
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
        <div className="items-center hidden  md:flex gap-4">
          <ToggleLeft
            size={32}
            className="cursor-pointer text-gray-700 transition-colors hover:text-black"
          />

          <CircleUserRound
            size={32}
            className="cursor-pointer text-gray-700 transition-colors hover:text-black"
          />
        </div>
        <div
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="lg:hidden cursor-pointer"
        >
          <Menu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
