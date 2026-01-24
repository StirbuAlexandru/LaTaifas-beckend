'use client';

import Logo from "../../components/logo/Logo";
import React from "react";
import Notification from "../notification/Notification";
import DashboardMobileHeader from "./DashboardMobileHeader";
import LogoutButton from "../auth/LogoutButton";

const DashboardHeader = () => {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 backdrop-blur-md border-b-2 border-red-200 shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          <LogoutButton />
          <Notification />
          <DashboardMobileHeader />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;