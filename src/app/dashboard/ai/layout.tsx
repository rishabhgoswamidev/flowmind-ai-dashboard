"use client";

import AIHistorySidebar from "@/components/ai/AIHistorySidebar";

const AILayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen">
      <AIHistorySidebar />

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default AILayout;