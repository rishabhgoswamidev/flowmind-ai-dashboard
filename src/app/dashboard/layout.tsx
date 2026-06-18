"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { useState } from "react";
import { usePathname } from "next/navigation";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isAIPage = pathname.startsWith("/dashboard/ai");

  if (isAIPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;