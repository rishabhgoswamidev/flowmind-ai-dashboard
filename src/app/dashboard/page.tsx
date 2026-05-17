import StatsCard from "@/components/dashboard/StatsCard";
import { CalendarCheck, Check, Timer, Astroid } from "lucide-react";
import Dropdown from "@/components/ui/Dropdown";
import ProductivityChart from "@/components/dashboard/ProductivityChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
const DashboardPage = () => {
  const statCardData = [
    {
      icon: CalendarCheck,
      label: "Total Tasks",
      number: 24,
      subtext: "+12% from last week",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      trendColor: "text-green-600",
    },
    {
      icon: Check,
      label: "Completed Tasks",
      number: 16,
      subtext: "+8% from last week",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      trendColor: "text-green-600",
    },
    {
      icon: Timer,
      label: "Pending Tasks",
      number: 8,
      subtext: "-4% from last week",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      trendColor: "text-red-500",
    },
    {
      icon: Astroid,
      label: "AI Requests",
      number: 40,
      subtext: "+20% from last week",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      trendColor: "text-green-600",
    },
  ];

  return (
    <section className="p-4 md:p-8 max-w-7xl mx-auto bg-gray-50">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back, Rishabh 👋</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        {statCardData?.map((item) => (
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
        <div className="col-span-1 xl:col-span-2 min-w-0 border rounded-md min-h-[350px] p-4 md:p-6">
          <div className="flex flex-col xl:flex-row gap-4 items-start xl:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Weekly Productivity</h2>
              <p className="text-sm text-gray-500 mt-1">
                Track completed tasks throughout the week
              </p>
            </div>
            
            <Dropdown />
            
          </div>
          <ProductivityChart />
        </div>

        <RecentActivity/>
      </div>
    </section>
  );
};

export default DashboardPage;
