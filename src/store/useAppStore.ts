"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  TaskType,
  NoteType,
  ActivityType,
  ConversationType,
} from "@/types/dataTypes";

type AppStore = {
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;

  notes: NoteType[];
  setNotes: (notes: NoteType[]) => void;

  activities: ActivityType[];
  setActivities: (activities: ActivityType[]) => void;

  conversations: ConversationType[];
  setConversations: (conversations: ConversationType[]) => void;

  activeConversationId: number | null;
  setActiveConversationId: (id: number | null) => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      tasks: [],
      notes: [],
      activities: [],
      conversations: [],
      activeConversationId: null,

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
      setConversations: (conversations) =>
        set({
          conversations,
        }),
      setActiveConversationId: (activeConversationId) =>
        set({
          activeConversationId,
        }),
    }),

    {
      name: "flowmind-storage",
    },
  ),
);
