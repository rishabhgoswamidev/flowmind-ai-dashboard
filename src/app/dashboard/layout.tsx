import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 border">
        <Navbar />

        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;