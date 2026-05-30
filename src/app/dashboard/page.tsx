"use client";

import StatsCard from "@/components/dashboard/StatsCard";
import { CalendarCheck, Check, Timer, NotebookPen } from "lucide-react";
import Dropdown from "@/components/ui/Dropdown";
import ProductivityChart from "@/components/dashboard/ProductivityChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { useAppContext } from "@/context/AppContext";

const DashboardPage = () => {
  const { tasks, notes } = useAppContext();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const totalNotes = notes.length;
  const statCardData = [
    {
      icon: CalendarCheck,
      label: "Total Tasks",
      number: totalTasks,
      subtext: "+12% from last week",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      trendColor: "text-green-600",
    },

    {
      icon: Check,
      label: "Completed Tasks",
      number: completedTasks,
      subtext: "+8% from last week",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      trendColor: "text-green-600",
    },

    {
      icon: Timer,
      label: "Pending Tasks",
      number: pendingTasks,
      subtext: "-4% from last week",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      trendColor: "text-red-500",
    },

    {
      icon: NotebookPen,
      label: "Total Notes",
      number: totalNotes,
      subtext: "+20% from last week",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      trendColor: "text-green-600",
    },
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const chartData = days.map((day) => {
    const completedCount = tasks.filter((task) => {
      if (!task.completedAt) return false;

      const completedDay = new Date(task.completedAt).toLocaleDateString(
        "en-US",
        {
          weekday: "short",
        },
      );

      return completedDay === day;
    }).length;

    return {
      day,

      tasks: completedCount,
    };
  });

  return (
    <section className="mx-auto max-w-7xl bg-gray-50 p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>

        <p className="mt-2 text-gray-500">Welcome back, Rishabh 👋</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statCardData.map((item) => (
          <StatsCard
            key={item.label}
            Icon={item.icon}
            label={item.label}
            number={item.number}
            subtext={item.subtext}
            iconBg={item.iconBg}
            iconColor={item.iconColor}
            trendColor={item.trendColor}
          />
        ))}

        <div className="col-span-1 min-h-[350px] min-w-0 rounded-md border p-4 md:col-span-2 md:p-6">
          <div className="flex flex-col items-start gap-4 xl:flex-row xl:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Weekly Productivity</h2>

              <p className="mt-1 text-sm text-gray-500">
                Track completed tasks throughout the week
              </p>
            </div>

            <Dropdown />
          </div>

          <ProductivityChart chartData={chartData} />
        </div>

        <RecentActivity />
      </div>
    </section>
  );
};

export default DashboardPage;
