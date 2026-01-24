'use client'
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Menu } from "lucide-react";

import {
  Home,
  ClipboardList,
  Box,
  Layers,
  Star,
  Mail,
  Wine,
  MapPin,
  Menu as MenuIcon,
  UtensilsCrossed,
  Image,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "../../lib/utils";

const DashboardMobileHeader = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const dashboardLinks = [
    {
      link: "/dashboard",
      label: "Acasă",
      icon: <Home size={20} />,
      isActive: pathname === '/dashboard',
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
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Meniu</SheetTitle>
          </SheetHeader>
          <ul className="flex flex-col gap-2 items-start justify-center mt-4">
            {dashboardLinks.map((link) => (
              <li key={link.label} className="w-full">
                <Link
                  href={link.link}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center text-lg w-full gap-2  p-2 rounded-md transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-800",
                    link.isActive && "bg-slate-300  dark:bg-slate-700"
                  )}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DashboardMobileHeader;