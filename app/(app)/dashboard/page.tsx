"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import CreateEventModal from "@/components/dashboard/CreateEventModal";
import { getEvents } from "@/lib/actions/event";
import { QRCodeSVG } from "qrcode.react";

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      const data = await getEvents();
      setEvents(data);
      setLoading(false);
    }
    loadEvents();
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.get("new") === "true") {
      setIsModalOpen(true);
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("new");
      const queryString = newParams.toString();
      router.replace(`/dashboard${queryString ? `?${queryString}` : ""}`);
    }
  }, [searchParams, router]);

  const eventId = searchParams.get("eventId");
  const activeEvent = eventId 
    ? events.find(e => e.id === eventId) 
    : events[0];

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-[32px] font-extrabold text-dark-text tracking-tighter m-0 leading-tight">
            {activeEvent ? activeEvent.name : "My Events"}
          </h2>
          <p className="text-gray-text m-0 mt-1">Manage your event, view uploads, and launch your live wall.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#f5f5f5] px-3 py-1 rounded-md text-sm font-medium border border-border-color">
            Plan: <b className="text-primary-lilac">Free</b>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary py-2 px-4 rounded-lg font-bold text-sm shadow-lg shadow-primary-lilac/10"
          >
            <i className="fa-solid fa-plus mr-2"></i> New Event
          </button>
        </div>
      </div>

      {!activeEvent && !loading ? (
        <div className="card text-center py-20 bg-gray-50/50 border-dashed border-2">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <i className="fa-solid fa-calendar-plus text-3xl text-primary-lilac/30"></i>
          </div>
          <h3 className="text-xl font-bold text-dark-text">No events yet</h3>
          <p className="text-gray-text mb-6">Create your first event to start collecting photos!</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary py-3 px-8 rounded-xl font-bold"
          >
            Create My First Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Digital Album Guide */}
          <div className="card shadow-sm">
            <div className="text-[20px] font-bold text-dark-text mb-3">Your Digital Album</div>
            <p className="text-sm text-gray-text leading-relaxed mb-4">
              The digital album lets your guests upload new photos or view existing ones. Share it via a direct link or QR code.
            </p>
            
            <div className="flex mb-4">
              <input 
                readOnly 
                className="flex-1 px-4 py-3 border border-border-color rounded-l-lg bg-[#f9f9f9] text-gray-text font-mono text-sm outline-none" 
                type="text" 
                value={activeEvent ? `${typeof window !== 'undefined' ? window.location.origin : ''}/guest/${activeEvent.slug}` : ""} 
              />
              <button 
                onClick={() => navigator.clipboard.writeText(`${window.location.origin}/guest/${activeEvent?.slug}`)}
                className="bg-primary-lilac text-white px-5 rounded-r-lg font-bold hover:bg-dark-lilac transition-all active:scale-95"
              >
                Copy
              </button>
            </div>

            <div className="flex gap-6 items-center mt-6">
              <div className="w-[150px] text-center shrink-0">
                <div className="aspect-square border border-border-color rounded-xl flex items-center justify-center bg-white mb-3 shadow-sm p-2">
                  {activeEvent && (
                    <QRCodeSVG 
                      value={`${typeof window !== 'undefined' ? window.location.origin : ''}/guest/${activeEvent.slug}`} 
                      size={130}
                    />
                  )}
                </div>
                <button className="btn btn-outline w-full text-xs py-2 rounded-lg font-bold">
                  <i className="fa-solid fa-download mr-1"></i> Download QR
                </button>
              </div>
              <button 
                onClick={() => setIsPreviewOpen(true)}
                className="flex-1 w-full min-h-[150px] bg-[#f0f0f0] border border-border-color rounded-xl flex flex-col justify-center items-center text-center p-4 hover:bg-[#e8e8e8] transition-all group"
              >
                <i className="fa-solid fa-mobile-screen text-4xl text-primary-lilac opacity-20 mb-2 group-hover:scale-110 transition-transform"></i>
                <span className="text-[11px] text-gray-text font-bold uppercase tracking-widest opacity-60">Open Guest View</span>
              </button>
            </div>
          </div>

          {/* Photo Wall Guide */}
          <div className="card shadow-sm">
            <div className="text-[20px] font-bold text-dark-text mb-3">Your Photo Wall</div>
            <p className="text-sm text-gray-text leading-relaxed mb-4">
              Every upload automatically appears on your Photo Wall. Connect it to projectors, TVs, or big screens.
            </p>
            
            <div className="flex mb-4">
              <input 
                readOnly 
                className="flex-1 px-4 py-3 border border-border-color rounded-l-lg bg-[#f9f9f9] text-gray-text font-mono text-sm outline-none" 
                type="text" 
                value={activeEvent ? `${typeof window !== 'undefined' ? window.location.origin : ''}/live-wall/${activeEvent.slug}` : ""} 
              />
              <button 
                onClick={() => navigator.clipboard.writeText(`${window.location.origin}/live-wall/${activeEvent?.slug}`)}
                className="bg-primary-lilac text-white px-5 rounded-r-lg font-bold hover:bg-dark-lilac transition-all active:scale-95"
              >
                Copy
              </button>
            </div>

            <div>
              <Link 
                href={activeEvent ? `/live-wall/${activeEvent.slug}` : "#"}
                className="h-[200px] bg-[#f0f0f0] rounded-xl flex flex-col items-center justify-center gap-4 text-dark-text border border-border-color relative overflow-hidden group hover:bg-[#e8e8e8] transition-all"
              >
                <i className="fa-solid fa-tv text-6xl opacity-10 group-hover:scale-110 transition-transform"></i>
                <span className="text-xs font-bold opacity-40 uppercase tracking-widest">Launch Live Wall</span>
              </Link>
              <div className="flex items-center gap-5 mt-6 py-3 px-5 bg-bg-light rounded-lg border border-border-color">
                <span className="text-[10px] text-gray-text font-bold uppercase tracking-widest opacity-50">Display on:</span>
                <div className="flex gap-5">
                  <i className="fa-solid fa-video text-gray-text/30 hover:text-primary-lilac transition-all cursor-help text-lg" title="Projector"></i>
                  <i className="fa-solid fa-tv text-gray-text/30 hover:text-primary-lilac transition-all cursor-help text-lg" title="Smart TV"></i>
                  <i className="fa-solid fa-laptop text-gray-text/30 hover:text-primary-lilac transition-all cursor-help text-lg" title="Computer"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE PREVIEW MODAL */}
      {isPreviewOpen && activeEvent && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark-text/60 backdrop-blur-md" onClick={() => setIsPreviewOpen(false)} />
          
          <div className="relative z-10 animate-in zoom-in-95 duration-500 flex flex-col items-center">
            {/* Close Button */}
            <button 
              onClick={() => setIsPreviewOpen(false)}
              className="absolute -top-12 right-0 md:-right-12 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-50"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>

            {/* Mobile Device Mockup */}
            <div className="relative w-[320px] h-[650px] md:w-[375px] md:h-[760px] bg-dark-text rounded-[55px] p-3 shadow-2xl border-[2px] border-white/10">
              {/* Device Buttons */}
              <div className="absolute -left-[2px] top-24 w-[3px] h-12 bg-white/10 rounded-r-lg"></div>
              <div className="absolute -left-[2px] top-40 w-[3px] h-12 bg-white/10 rounded-r-lg"></div>
              <div className="absolute -right-[2px] top-32 w-[3px] h-16 bg-white/10 rounded-l-lg"></div>

              {/* Screen Container */}
              <div className="w-full h-full bg-white rounded-[44px] overflow-hidden relative border border-white/5">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-dark-text rounded-b-3xl z-20 flex items-center justify-center gap-2">
                  <div className="w-8 h-1 bg-white/10 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/10 rounded-full"></div>
                </div>
                
                <iframe 
                  src={`/guest/${activeEvent.slug}`} 
                  className="w-full h-full border-none"
                  title="Guest View Preview"
                />
              </div>
            </div>

            <div className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-lg rounded-full text-white/60 text-xs font-bold uppercase tracking-widest">
              Live Preview Mode
            </div>
          </div>
        </div>
      )}

      <CreateEventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default function DashboardHome() {
  return (
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
