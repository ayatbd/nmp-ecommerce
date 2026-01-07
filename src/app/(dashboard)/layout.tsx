"use client";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative h-full min-h-screen font-[sans-serif]">
      <div className="flex items-start">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <div className="w-full h-full flex flex-col min-h-screen">
          {/* Overlay for mobile when sidebar is open */}
          {isSidebarOpen && (
            <div
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-90 lg:hidden"
            />
          )}

          <Navbar toggleSidebar={toggleSidebar} />

          <section className="flex-1 p-6">{children}</section>
        </div>
      </div>
    </div>
  );
}
