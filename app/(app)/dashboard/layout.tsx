"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import BottomNav from "@/components/dashboard/BottomNav";
import UpgradeModal from "@/components/dashboard/UpgradeModal";

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

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
        <header className="bg-white px-6 md:px-10 h-16 flex items-center border-b border-border-color sticky top-0 z-50">
          <div className="bg-[#fffbe6] border border-[#ffe58f] px-4 py-2 rounded-lg flex items-center justify-between w-full">
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
        <main className="p-6 pb-28 md:pb-6 flex-1 overflow-auto">
          {children}
        </main>
      </div>
      <BottomNav onUpgradeClick={() => setIsUpgradeModalOpen(true)} />
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
