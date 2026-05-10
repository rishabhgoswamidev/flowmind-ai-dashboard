"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  NotebookPen,
  Astroid,
  Settings,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname();

  const sidebarLinks = [
    {
      id: 1,
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      id: 2,
      icon: ClipboardList,
      label: "Tasks",
      href: "/dashboard/tasks",
    },
    {
      id: 3,
      icon: NotebookPen,
      label: "Notes",
      href: "/dashboard/notes",
    },
    {
      id: 4,
      icon: Astroid,
      label: "AI Assistant",
      href: "/dashboard/ai",
    },
    {
      id: 5,
      icon: Settings,
      label: "Settings",
      href: "/dashboard/settings",
    },
  ];

  return (
    <aside className="min-h-screen w-[250px] border-r bg-gray-100 p-4 text-black">
      <p className="p-2 text-2xl font-bold">FlowMind AI</p>

      <div className="mt-4 flex flex-col gap-2">
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-4 rounded-md border p-3 transition-colors ${
                isActive
                  ? "border-gray-300 bg-white font-medium"
                  : "border-transparent hover:border-gray-300 hover:bg-white"
              }`}
            >
              <item.icon size={20} />

              <span className="text-base">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
