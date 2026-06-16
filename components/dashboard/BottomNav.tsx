"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BottomNavProps {
  onUpgradeClick?: () => void;
}

export default function BottomNav({ onUpgradeClick }: BottomNavProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", icon: "fa-solid fa-house", href: "/dashboard" },
    { name: "Media", icon: "fa-solid fa-images", href: "/dashboard/media" },
    { name: "Upgrade", icon: "fa-solid fa-star", onClick: onUpgradeClick, special: true },
    { name: "Settings", icon: "fa-solid fa-gear", href: "/dashboard/settings" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border-color h-20 flex justify-around items-center z-[200] px-4 pb-4 pt-2">
      {navItems.map((item) => {
        const isActive = item.href ? pathname === item.href : false;
        
        if (item.onClick) {
          return (
            <button
              key={item.name}
              onClick={item.onClick}
              className={`flex flex-col items-center gap-2 no-underline text-[10px] font-black uppercase tracking-[0.1em] transition-all bg-transparent border-none ${
                item.special ? "text-primary-lilac" : "text-gray-text opacity-40"
              }`}
            >
              <div className={item.special ? "w-10 h-10 rounded-full bg-light-lavender flex items-center justify-center -mt-4 shadow-lg border border-primary-lilac/20" : ""}>
                <i className={`${item.icon} ${item.special ? "text-xl" : "text-2xl"}`}></i>
              </div>
              <span className={item.special ? "mt-1" : ""}>{item.name}</span>
            </button>
          );
        }

        return (
          <Link
            key={item.name}
            href={item.href || "#"}
            className={`flex flex-col items-center gap-2 no-underline text-[10px] font-black uppercase tracking-[0.1em] transition-all ${
              isActive ? "text-primary-lilac scale-110" : "text-gray-text opacity-40"
            }`}
          >
            <i className={`${item.icon} text-2xl`}></i>
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
