"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

interface SidebarProps {
  onUpgradeClick?: () => void;
}

export default function Sidebar({ onUpgradeClick }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { name: "Home", icon: "fa-solid fa-house", href: "/dashboard" },
    { name: "Photos & Videos", icon: "fa-solid fa-image", href: "/dashboard/media" },
    { name: "Event Settings", icon: "fa-solid fa-gear", href: "/dashboard/settings" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-[280px] bg-white border-r border-border-color sticky top-0 h-screen z-[100]">
      <div className="p-6 pb-2">
        <Link href="/" className="no-underline block mb-6">
          <span className="text-2xl font-black text-dark-text tracking-tighter">
            EverSnapz<span className="text-primary-lilac">.</span>
          </span>
        </Link>
      </div>
      
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] font-bold text-gray-text/60 uppercase tracking-widest">Current Event</span>
          <button className="text-[11px] font-bold text-primary-lilac hover:underline uppercase tracking-widest bg-transparent border-none cursor-pointer">
            View All
          </button>
        </div>
        
        <button className="w-full flex justify-between items-center px-4 py-3 rounded-xl border border-border-color bg-white hover:border-primary-lilac transition-all text-left mb-4 group shadow-sm">
          <span className="font-bold text-dark-text truncate">Active Event</span>
          <i className="fa-solid fa-chevron-down text-[10px] text-gray-text group-hover:text-primary-lilac"></i>
        </button>

        <button 
          onClick={onUpgradeClick}
          className="w-full bg-light-lavender/50 border border-primary-lilac/10 rounded-xl p-3 flex items-center gap-3 group cursor-pointer hover:bg-light-lavender transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-primary-lilac flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary-lilac/20">
            <i className="fa-solid fa-star text-xs"></i>
          </div>
          <span className="text-[12px] font-black text-primary-lilac uppercase tracking-widest">Upgrade Event</span>
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl no-underline transition-all ${
                isActive 
                  ? "bg-primary-lilac text-white font-bold shadow-lg shadow-primary-lilac/20" 
                  : "text-gray-text hover:bg-bg-light hover:text-dark-text"
              }`}
            >
              <i className={`${item.icon} text-lg w-5 text-center ${isActive ? "text-white" : "opacity-40"}`}></i>
              <span className="text-[14px] font-bold">{item.name}</span>
            </Link>
          );
        })}
        
        <div className="mt-auto border-t border-border-color pt-4 flex flex-col gap-2">
          <div className="px-4 py-4 rounded-xl flex items-center gap-3.5 hover:bg-bg-light transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary-lilac/10 group-hover:text-primary-lilac transition-colors overflow-hidden">
              {session?.user?.image ? (
                <img src={session.user.image} alt={session.user.name || "User"} className="w-full h-full object-cover" />
              ) : (
                <i className="fa-solid fa-user"></i>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] font-bold text-dark-text truncate">{session?.user?.name || "My Account"}</span>
              <span className="text-[11px] text-gray-text/60 truncate font-medium">{session?.user?.email}</span>
            </div>
          </div>
          
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3.5 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold text-[14px]"
          >
            <i className="fa-solid fa-right-from-bracket w-5 text-center"></i>
            <span>Sign Out</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
