import { CalendarCheck, Check, Timer, Astroid } from "lucide-react";

const RecentActivity = () => {
  const activityData = [
  {
    id: 1,
    icon: CalendarCheck,
    title: 'New task "Design Landing Page" created',
    time: "2m ago",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    icon: Check,
    title: 'Task "Fix Navbar UI" completed',
    time: "10m ago",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 3,
    icon: Timer,
    title: 'Deadline approaching for "Dashboard Redesign"',
    time: "30m ago",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    id: 4,
    icon: Astroid,
    title: 'AI generated weekly productivity report',
    time: "1h ago",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

  return (
    <div className="col-span-1 xl:col-span-2 border rounded-md min-h-[350px] p-6">
      <h2 className="text-2xl font-semibold">Recent Activity</h2>
      <div className="flex flex-col gap-2 mt-4 w-full">
        {activityData?.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 py-3 px-4 bg-white border rounded-xl ">
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center justify-center p-2 border rounded-md ${item.iconBg} ${item.iconColor}`}
              >
                <item.icon />
              </div>

              <p className="text-gray-800">
                {item.title}
              </p>
            </div>
            <p className="text-sm text-gray-500">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
