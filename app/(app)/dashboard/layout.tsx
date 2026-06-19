"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import BottomNav from "@/components/dashboard/BottomNav";
import UpgradeModal from "@/components/dashboard/UpgradeModal";
import { getEvents } from "@/lib/actions/event";
import Link from "next/link";

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [events, setEvents] = useState<any[]>([]);
  const [activeEvent, setActiveEvent] = useState<any>(null);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setIsMobileDropdownOpen(false);
      }
    }

    if (isMobileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileDropdownOpen]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();
        setEvents(data);
        
        const eventId = searchParams.get("eventId");
        if (eventId) {
          const found = data.find(e => e.id === eventId);
          if (found) setActiveEvent(found);
        } else if (data.length > 0) {
          setActiveEvent(data[0]);
        }
      } catch (error) {
        console.error("Failed to load events in layout:", error);
      }
    }
    loadEvents();
  }, [searchParams]);

  const handleEventSelect = (event: any) => {
    setActiveEvent(event);
    setIsMobileDropdownOpen(false);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("eventId", event.id);
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (searchParams.get("upgrade") === "true") {
      setIsUpgradeModalOpen(true);
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("upgrade");
      const queryString = newParams.toString();
      router.replace(`${window.location.pathname}${queryString ? `?${queryString}` : ""}`);
    }
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <Sidebar onUpgradeClick={() => setIsUpgradeModalOpen(true)} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white px-6 md:px-10 h-16 flex items-center border-b border-border-color sticky top-0 z-50 justify-between">
          {/* Mobile Header: Logo + Event Selector */}
          <div className="flex md:hidden items-center justify-between w-full gap-2">
            <Link href="/" className="no-underline shrink-0">
              <span className="text-xl font-black text-dark-text tracking-tighter">
                EverSnapz<span className="text-primary-lilac">.</span>
              </span>
            </Link>
            
            {/* Event Selector for Mobile */}
            <div className="relative shrink-0" ref={mobileDropdownRef}>
              <button 
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-color bg-white hover:border-primary-lilac transition-all text-left shadow-sm max-w-[150px] xs:max-w-[180px]"
              >
                <span className="font-bold text-xs text-dark-text truncate">
                  {activeEvent ? activeEvent.name : "Select Event"}
                </span>
                <i className={`fa-solid fa-chevron-down text-[8px] text-gray-text transition-transform ${isMobileDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {isMobileDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-[200px] bg-white border border-border-color rounded-xl shadow-xl z-[150] max-h-[250px] overflow-auto animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2">
                    {events.length > 0 ? (
                      events.map((event) => (
                        <button
                          key={event.id}
                          onClick={() => handleEventSelect(event)}
                          className={`w-full flex flex-col items-start px-3 py-2 rounded-lg transition-all text-left mb-1 last:mb-0 ${
                            activeEvent?.id === event.id 
                              ? "bg-primary-lilac text-white" 
                              : "hover:bg-bg-light text-dark-text"
                          }`}
                        >
                          <span className="font-bold text-xs truncate w-full">{event.name}</span>
                          <span className={`text-[9px] truncate w-full ${activeEvent?.id === event.id ? "text-white/70" : "text-gray-text"}`}>
                            /guest/{event.slug}
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-4 text-center">
                        <p className="text-[10px] text-gray-text font-bold mb-2">No events found</p>
                        <Link href="/dashboard?new=true" onClick={() => setIsMobileDropdownOpen(false)} className="text-[10px] text-primary-lilac font-black uppercase tracking-widest hover:underline">
                          Create Event
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Header: Warning Banner */}
          <div className="hidden md:flex bg-[#fffbe6] border border-[#ffe58f] px-4 py-2 rounded-lg items-center justify-between w-full">
            <div className="flex items-center gap-3 text-sm font-medium">
              <i className="fa-solid fa-circle-exclamation text-warning"></i>
              <span className="truncate whitespace-nowrap overflow-hidden max-w-[200px] sm:max-w-none">You&apos;re currently using the limited free plan. Upgrade your event to unlock all features!</span>
            </div>
            <button 
              onClick={() => setIsUpgradeModalOpen(true)}
              className="btn btn-outline py-1.5 px-3 text-xs rounded-md shrink-0 ml-4 border-[#ffe58f] hover:bg-[#fff9e6]"
            >
              Upgrade Plan
            </button>
          </div>
        </header>

        {/* Mobile Warning Banner: Placed just under the header */}
        <div className="block md:hidden bg-[#fffbe6] border-b border-[#ffe58f] px-4 py-2.5 z-40">
          <div className="flex items-center justify-between gap-3 text-xs font-medium max-w-[1200px] mx-auto">
            <div className="flex items-center gap-2 min-w-0">
              <i className="fa-solid fa-circle-exclamation text-warning shrink-0"></i>
              <span className="truncate">You&apos;re using the free plan. Upgrade to unlock all features!</span>
            </div>
            <button 
              onClick={() => setIsUpgradeModalOpen(true)}
              className="btn btn-outline py-1 px-2.5 text-[10px] rounded-md shrink-0 border-[#ffe58f] hover:bg-[#fff9e6] font-bold"
            >
              Upgrade
            </button>
          </div>
        </div>

        <main className="p-6 pb-28 md:pb-6 flex-1 overflow-auto">
          {children}
        </main>
      </div>
      <BottomNav onUpgradeClick={() => setIsUpgradeModalOpen(true)} activeEventId={activeEvent?.id} />
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)} 
      />
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </Suspense>
  );
}
