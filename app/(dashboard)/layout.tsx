'use client';

import DashboardHeader from "../../dashboard/header/DashboardHeader";
import DashboardSidebar from "../../dashboard/sidebar/DashboardSidebar";
import ScrollToTop from "../../components/shared/ScrollToTop";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    // Client-side auth check
    const checkAuth = () => {
      if (typeof window === 'undefined') return;
      
      const sessionCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('admin_session='));
      
      if (!sessionCookie) {
        router.push('/login');
        return;
      }

      try {
        const sessionValue = sessionCookie.split('=')[1];
        JSON.parse(decodeURIComponent(sessionValue));
      } catch {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);
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
    </div>
  );
};

export default layout;