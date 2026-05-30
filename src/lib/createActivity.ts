import type { ActivityType } from "@/types/dataTypes";

export const createActivity = ({
  type,
  message,
}: {
  type: ActivityType["type"];

  message: string;
}): ActivityType => {
  return {
    id: Date.now(),
    type,
    message,
    createdAt: new Date().toISOString(),
  };
};
