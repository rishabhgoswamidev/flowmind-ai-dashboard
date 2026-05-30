export type TaskType = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
};

export type NoteType = {
  id: number;
  text: string;
  bgColor: string;
};

export type ActivityType = {
  id: number;
  type: "TASK_CREATED" | "TASK_COMPLETED" | "TASK_DELETED" | "NOTE_CREATED" | "NOTE_UPDATED" | "NOTE_DELETED";
  message : string;
  createdAt: string;
}