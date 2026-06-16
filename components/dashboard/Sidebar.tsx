"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { getEvents } from "@/lib/actions/event";

interface SidebarProps {
  onUpgradeClick?: () => void;
}

export default function Sidebar({ onUpgradeClick }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [events, setEvents] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<any>(null);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    }

    if (isDropdownOpen || isAccountMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isAccountMenuOpen]);

  useEffect(() => {
    async function loadEvents() {
      const data = await getEvents();
      setEvents(data);
      
      const eventId = searchParams.get("eventId");
      if (eventId) {
        const found = data.find(e => e.id === eventId);
        if (found) setActiveEvent(found);
      } else if (data.length > 0) {
        setActiveEvent(data[0]);
      }
    }
    loadEvents();
  }, [searchParams]);

  const handleEventSelect = (event: any) => {
    setActiveEvent(event);
    setIsDropdownOpen(false);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("eventId", event.id);
    router.push(`${pathname}?${params.toString()}`);
  };

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
      
      <div className="px-6 py-4 relative" ref={dropdownRef}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] font-bold text-gray-text/60 uppercase tracking-widest">Current Event</span>
          <Link href="/dashboard/events" className="text-[11px] font-bold text-primary-lilac hover:underline uppercase tracking-widest bg-transparent border-none cursor-pointer">
            View All
          </Link>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex justify-between items-center px-4 py-3 rounded-xl border border-border-color bg-white hover:border-primary-lilac transition-all text-left mb-4 group shadow-sm"
          >
            <span className="font-bold text-dark-text truncate">
              {activeEvent ? activeEvent.name : "Select Event"}
            </span>
            <i className={`fa-solid fa-chevron-down text-[10px] text-gray-text group-hover:text-primary-lilac transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full bg-white border border-border-color rounded-xl shadow-xl z-[110] max-h-[300px] overflow-auto animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2">
                {events.length > 0 ? (
                  events.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => handleEventSelect(event)}
                      className={`w-full flex flex-col items-start px-4 py-3 rounded-lg transition-all text-left mb-1 last:mb-0 ${
                        activeEvent?.id === event.id 
                          ? "bg-primary-lilac text-white" 
                          : "hover:bg-bg-light text-dark-text"
                      }`}
                    >
                      <span className="font-bold text-sm truncate w-full">{event.name}</span>
                      <span className={`text-[10px] truncate w-full ${activeEvent?.id === event.id ? "text-white/70" : "text-gray-text"}`}>
                        /guest/{event.slug}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="text-xs text-gray-text font-bold mb-3">No events found</p>
                    <Link href="/dashboard?new=true" className="text-xs text-primary-lilac font-black uppercase tracking-widest hover:underline">
                      Create Event
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

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
          const href = activeEvent ? `${item.href}?eventId=${activeEvent.id}` : item.href;
          
          return (
            <Link
              key={item.name}
              href={href}
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
        
        <div className="mt-auto border-t border-border-color pt-4 relative" ref={accountRef}>
          <div 
            onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
            className={`px-4 py-4 rounded-xl flex items-center gap-3.5 hover:bg-bg-light transition-all cursor-pointer group ${isAccountMenuOpen ? 'bg-bg-light' : ''}`}
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary-lilac/10 group-hover:text-primary-lilac transition-colors overflow-hidden shrink-0">
              {session?.user?.image ? (
                <img src={session.user.image} alt={session.user.name || "User"} className="w-full h-full object-cover" />
              ) : (
                <i className="fa-solid fa-user"></i>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] font-bold text-dark-text truncate">My Profile</span>
              <span className="text-[11px] text-gray-text/60 truncate font-medium">{session?.user?.email}</span>
            </div>
          </div>

          {isAccountMenuOpen && (
            <div className="absolute bottom-full left-4 right-4 bg-white border border-border-color rounded-2xl shadow-2xl z-[110] mb-2 p-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <Link 
                href="/dashboard/settings" 
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-bg-light text-dark-text no-underline transition-colors"
                onClick={() => setIsAccountMenuOpen(false)}
              >
                <i className="fa-solid fa-user-gear text-sm opacity-40"></i>
                <span className="text-sm font-bold">Manage Account</span>
              </Link>
              <Link 
                href="/dashboard/events" 
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-bg-light text-dark-text no-underline transition-colors"
                onClick={() => setIsAccountMenuOpen(false)}
              >
                <i className="fa-solid fa-calendar-days text-sm opacity-40"></i>
                <span className="text-sm font-bold">View My Events</span>
              </Link>
              <div className="h-px bg-border-color my-1 mx-2"></div>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-500 transition-colors text-left border-none bg-transparent cursor-pointer"
              >
                <i className="fa-solid fa-right-from-bracket text-sm"></i>
                <span className="text-sm font-bold">Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
