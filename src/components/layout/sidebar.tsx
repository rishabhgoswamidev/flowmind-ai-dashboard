import {
  LayoutDashboard,
  ClipboardList,
  NotebookPen,
  Astroid,
  Settings,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
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
    <aside className="min-h-screen w-[250px] p-2 ">
      <p className="p-2 font-bold text-2xl">FlowMind AI</p>
      <div className="flex flex-col gap-2 mt-4">
        {sidebarLinks?.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex gap-4 p-2 items-center border border-transparent hover:border-gray-500 rounded-md transition-colors"
          >
            <item.icon size={20}/>
            <span className="text-md text-base">{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
