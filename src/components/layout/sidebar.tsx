"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  NotebookPen,
  Astroid,
  ToggleLeft,
  CircleUserRound,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }: Props) => {
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
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky lg:top-0 z-50 h-screen w-[250px] border-r bg-gray-100 p-4 text-black transition-transform duration-300 lg:sticky lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <Link
              href="/dashboard"
              className="flex cursor-pointer items-center gap-3"
            >
              <Image
                src="/logo.png"
                alt="logo Image"
                width={32}
                height={32}
                className="object-contain"
              />

              <p className="text-2xl font-bold">FlowMind AI</p>
            </Link>

            <div className="mt-8 flex flex-col gap-2">
              {sidebarLinks.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        setSidebarOpen(false);
                      }
                    }}
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
          </div>
          <div className="flex items-center md:hidden gap-4">
            <ToggleLeft
              size={32}
              className="cursor-pointer text-gray-700 transition-colors hover:text-black"
            />

            <CircleUserRound
              size={32}
              className="cursor-pointer text-gray-700 transition-colors hover:text-black"
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
