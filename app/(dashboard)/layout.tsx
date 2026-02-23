import DashboardHeader from "@/dashboard/header/DashboardHeader";
import DashboardSidebar from "@/dashboard/sidebar/DashboardSidebar";
import ScrollToTop from "@/components/shared/ScrollToTop";
import OrderNotificationSystem from "@/dashboard/notification/OrderNotificationSystem";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-orange-50/10">
      <DashboardHeader />
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-6 px-4 md:px-8 py-6">
        <DashboardSidebar />
        <div className="flex-1">
          {children}
        </div>
      </div>
      <ScrollToTop />
      {/* Sistem de notificare global pentru comenzi noi - funcționează pe toate paginile dashboard */}
      <OrderNotificationSystem />
    </div>
  );
};

export default layout;