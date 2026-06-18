
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
  action: string;
  type: "task" | "complete" | "delete" | "note" | "ai";
  createdAt: string;
};


// for ai page
export type MessageType = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export type ConversationType = {
  id: number;
  title: string;
  createdAt: string;
  messages: MessageType[];
};