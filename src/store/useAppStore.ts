"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TaskType, NoteType, ActivityType } from "@/types/dataTypes";

type AppStore = {
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;

  notes: NoteType[];
  setNotes: (notes: NoteType[]) => void;

  activities: ActivityType[];
  setActivities: (activities: ActivityType[]) => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      tasks: [],
      notes: [],
      activities: [],

      setTasks: (tasks) =>
        set({
          tasks,
        }),
      setNotes: (notes) =>
        set({
          notes,
        }),
      setActivities: (activities) =>
        set({
          activities,
        }),
    }),

    {
      name: "flowmind-storage",
    },
  ),
);
