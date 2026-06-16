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

            <div className="flex flex-wrap items-center gap-6 mt-8">
              <div className="w-[140px] text-center shrink-0">
                <div className="aspect-square border border-border-color rounded-xl flex items-center justify-center bg-white mb-3 shadow-sm p-2">
                  {activeEvent && (
                    <QRCodeSVG 
                      value={`${typeof window !== 'undefined' ? window.location.origin : ''}/guest/${activeEvent.slug}`} 
                      size={120}
                    />
                  )}
                </div>
                <button 
                  onClick={() => {
                    const canvas = document.querySelector('canvas');
                    if (canvas) {
                      const url = canvas.toDataURL("image/png");
                      const link = document.createElement('a');
                      link.download = `qr-${activeEvent?.slug}.png`;
                      link.href = url;
                      link.click();
                    }
                  }}
                  className="btn btn-outline w-full text-[10px] py-1.5 rounded-lg font-bold"
                >
                  <i className="fa-solid fa-download mr-1"></i> Download QR
                </button>
              </div>

              {/* LIVE MOBILE PREVIEW - Integrated Portrait Mockup */}
              <div className="relative w-[190px] h-[380px] bg-dark-text rounded-[40px] p-1.5 shadow-2xl border border-white/10 shrink-0">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-dark-text rounded-b-2xl z-20 flex items-center justify-center gap-1">
                  <div className="w-6 h-0.5 bg-white/10 rounded-full"></div>
                </div>
                
                {/* Screen Container */}
                <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative border border-white/5">
                  <iframe 
                    src={`/guest/${activeEvent?.slug}`} 
                    className="border-none pointer-events-none select-none"
                    style={{ 
                      width: '375px', 
                      height: '750px', 
                      transform: `scale(${178 / 375})`, 
                      transformOrigin: 'top left',
                      position: 'absolute',
                      top: '0',
                      left: '0'
                    }}
                    title="Guest View Preview"
                  />
                </div>
              </div>
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
