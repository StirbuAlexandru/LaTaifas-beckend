'use client'
import Link from "next/link";
import React from "react";
import {
  Home,
  ClipboardList,
  Box,
  Layers,
  Star,
  Mail,
  Wine,
  MapPin,
  UtensilsCrossed,
  Image,
  Calendar,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const DashboardSidebar = () => {

  const pathname = usePathname();

  const dashboardLinks = [
    {
      link: "/dashboard",
      label: "Acasă",
      icon: <Home size={20} />,
      isActive: pathname === "/dashboard",
    },
    {
      link: "/dashboard/orders",
      label: "Comenzi",
      icon: <ClipboardList size={20} />,
      isActive: pathname.includes("dashboard/orders"),
    },
    {
      link: "/dashboard/products",
      label: "Produse",
      icon: <Box size={20} />,
      isActive: pathname.includes("dashboard/products"),
    },
    {
      link: "/dashboard/wines",
      label: "Vinuri",
      icon: <Wine size={20} />,
      isActive: pathname.includes("dashboard/wines"),
    },
    {
      link: "/dashboard/categories",
      label: "Categorii",
      icon: <Layers size={20} />,
      isActive: pathname.includes("dashboard/categories"),
    },
    {
      link: "/dashboard/delivery-zones",
      label: "Zone de Livrare",
      icon: <MapPin size={20} />,
      isActive: pathname.includes("dashboard/delivery-zones"),
    },
    {
      link: "/dashboard/location-gallery",
      label: "Galerie Locație",
      icon: <Image size={20} />,
      isActive: pathname.includes("dashboard/location-gallery"),
    },
    {
      link: "/dashboard/event-gallery",
      label: "Galerie Evenimente",
      icon: <Calendar size={20} />,
      isActive: pathname.includes("dashboard/event-gallery"),
    },
    {
      link: "/dashboard/menu-manager",
      label: "Meniu",
      icon: <UtensilsCrossed size={20} />,
      isActive: pathname.includes("dashboard/menu-manager"),
    },
    {
      link: "/dashboard/reviews",
      label: "Recenzii",
      icon: <Star size={20} />,
      isActive: pathname.includes("dashboard/reviews"),
    },
    {
      link: "/dashboard/messages",
      label: "Mesaje",
      icon: <Mail size={20} />,
      isActive: pathname.includes("dashboard/messages"),
    },
  ];

  return (
    <nav className="w-64 min-h-[88vh] px-3 py-4 rounded-2xl border-2 border-gray-200 hidden lg:block bg-white/80 backdrop-blur-sm shadow-sm">
      {/* Sidebar Links */}
      <div>
        <ul className="flex flex-col gap-2 items-start justify-center">
          {dashboardLinks.map((link) => (
            <li key={link.label} className="w-full">
              <Link
                href={link.link}
                className={cn(
                  "flex items-center text-base font-semibold w-full gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                  link.isActive 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md' 
                    : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                )}
              >
                <span className={cn(
                  "transition-transform duration-300",
                  link.isActive ? "scale-110" : "group-hover:scale-110"
                )}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default DashboardSidebar;