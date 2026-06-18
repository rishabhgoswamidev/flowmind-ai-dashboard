import { useAppStore } from "@/store/useAppStore";
import type { ActivityType } from "@/types/dataTypes";
import {
  CalendarCheck,
  NotebookPen,
  Check,
  Timer,
  Astroid,
  LucideIcon,
} from "lucide-react";

const RecentActivity = () => {
  const activities = useAppStore((state) => state.activities);

  const activityConfig: Record<
    ActivityType["type"],
    {
      icon: LucideIcon;
      iconBg: string;
      iconColor: string;
    }
  > = {
    task: {
      icon: CalendarCheck,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },

    complete: {
      icon: Check,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },

    delete: {
      icon: Timer,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },

    note: {
      icon: NotebookPen,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },

    ai: {
      icon: Astroid,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  };

  const getTimeAgo = (dateString: string) => {
    const seconds = Math.floor(
      (Date.now() - new Date(dateString).getTime()) / 1000,
    );

    if (seconds < 60) {
      return `${seconds}s ago`;
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);

    return `${days}d ago`;
  };

  const sortedActivities = [...activities]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    )
    .slice(0, 6);

  return (
    <div className="col-span-1 rounded-md border p-4 md:col-span-2 md:p-6">
      <h2 className="text-2xl font-semibold">
        Recent Activity
      </h2>

      <div className="mt-4 flex flex-col gap-2">
        {sortedActivities.length === 0 ? (
          <div className="rounded-xl border bg-white p-4 text-gray-500">
            No recent activity yet.
          </div>
        ) : (
          sortedActivities.map((item) => {
            const activityType =
              item.type &&
              item.type in activityConfig
                ? item.type
                : "task";

            const config =
              activityConfig[activityType];

            const Icon = config.icon;

            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-xl border bg-white px-4 py-3"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div
                    className={`flex items-center justify-center rounded-md p-2 ${config.iconBg} ${config.iconColor}`}
                  >
                    <Icon size={18} />
                  </div>

                  <p className="truncate text-sm text-gray-800">
                    {item.action}
                  </p>
                </div>

                <p className="shrink-0 text-sm text-gray-500">
                  {getTimeAgo(item.createdAt)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentActivity;