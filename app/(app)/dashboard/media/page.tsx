"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getEvents } from "@/lib/actions/event";
import { getPhotos } from "@/lib/actions/media";

function MediaContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("moderation");
  const [events, setEvents] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: "moderation", name: "Moderation", icon: "fa-solid fa-shield-check" },
    { id: "qr", name: "QR & Sharing", icon: "fa-solid fa-qrcode" },
    { id: "settings", name: "Settings", icon: "fa-solid fa-gear" },
  ];

  useEffect(() => {
    async function loadData() {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
        
        const eventId = searchParams.get("eventId");
        const activeEvent = eventId 
          ? eventsData.find(e => e.id === eventId) 
          : eventsData[0];

        if (activeEvent) {
          const photosData = await getPhotos(activeEvent.id);
          setPhotos(photosData);
        }
      } catch (error) {
        console.error("Failed to load media data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [searchParams]);

  const eventId = searchParams.get("eventId");
  const activeEvent = eventId 
    ? events.find(e => e.id === eventId) 
    : events[0];

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-[24px] sm:text-[32px] font-extrabold text-dark-text tracking-tighter m-0 leading-tight">
            {activeEvent ? `${activeEvent.name} Media` : "Photos & Videos"}
          </h2>
          <p className="text-gray-text m-0 mt-1">Manage and moderate all media uploaded to your event.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link href={activeEvent ? `/live-wall/${activeEvent.slug}` : "/live-wall"} className="btn btn-primary py-2 px-4 rounded-lg font-bold text-sm shadow-lg shadow-primary-lilac/10">
            <i className="fa-solid fa-tv mr-2"></i> Live Wall
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border-color shadow-sm overflow-hidden min-h-[600px] flex flex-col">
        {/* Tabs Header */}
        <div className="flex border-b border-border-color px-4 sm:px-8 bg-white sticky top-0 z-10 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-8 py-4 sm:py-5 text-[14px] font-bold transition-all relative shrink-0 ${
                activeTab === tab.id 
                  ? "text-primary-lilac" 
                  : "text-gray-text opacity-40 hover:opacity-100"
              }`}
            >
              {tab.name}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-lilac rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-4 sm:p-8 animate-in fade-in duration-500">
          {activeTab === "moderation" && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h4 className="text-[18px] font-black text-dark-text m-0 tracking-tight">
                    {photos.length > 0 ? "All Uploads" : "No Uploads Yet"}
                  </h4>
                  <p className="text-[13px] text-gray-text font-medium mt-1">{photos.length} items shared by guests</p>
                </div>
                {photos.length > 0 && (
                  <div className="flex gap-3 w-full sm:w-auto justify-end">
                    <button className="px-4 py-2 rounded-lg border border-border-color bg-white text-gray-600 font-bold text-[12px] hover:bg-bg-light transition-colors">Reject All</button>
                    <button className="px-4 py-2 rounded-lg bg-primary-lilac text-white font-bold text-[12px] hover:bg-dark-lilac transition-colors shadow-lg shadow-primary-lilac/10">Approve All</button>
                  </div>
                )}
              </div>

              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border-color bg-bg-light animate-pulse"></div>
                  ))}
                </div>
              ) : photos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {photos.map((photo) => (
                    <div key={photo.id} className="relative aspect-square rounded-xl overflow-hidden border border-border-color bg-bg-light flex items-center justify-center group cursor-pointer transition-all hover:border-primary-lilac">
                      <img src={photo.url} className="w-full h-full object-cover" alt={`By ${photo.guestName}`} />
                      
                      {/* Action Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5">
                        <button className="flex-1 h-8 rounded-lg bg-success text-white border-none flex items-center justify-center hover:scale-[1.05] active:scale-95 transition-all">
                          <i className="fa-solid fa-check text-xs"></i>
                        </button>
                        <button className="flex-1 h-8 rounded-lg bg-danger text-white border-none flex items-center justify-center hover:scale-[1.05] active:scale-95 transition-all">
                          <i className="fa-solid fa-xmark text-xs"></i>
                        </button>
                      </div>
                      
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/40 backdrop-blur-md rounded text-[9px] text-white font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                        {photo.guestName}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 bg-bg-light rounded-full flex items-center justify-center mb-4">
                    <i className="fa-regular fa-image text-2xl text-gray-text/20"></i>
                  </div>
                  <h5 className="font-bold text-dark-text">No photos yet</h5>
                  <p className="text-sm text-gray-text">Once guests start uploading, they will appear here.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "qr" && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-[500px] mx-auto py-20">
              <div className="w-24 h-24 bg-light-lavender rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-primary-lilac/5 border border-primary-lilac/10">
                <i className="fa-solid fa-qrcode text-4xl text-primary-lilac"></i>
              </div>
              <h4 className="text-2xl font-black mb-3 tracking-tight">QR Code & Print Bundle</h4>
              <p className="text-[15px] text-gray-text leading-relaxed mb-10 font-medium">
                Download high-resolution QR codes and professional printing templates for your tables to encourage guest participation.
              </p>
              <button className="btn btn-primary px-10 py-4 shadow-xl shadow-primary-lilac/20 rounded-xl font-black uppercase tracking-widest text-xs">
                Generate Print Bundle
              </button>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-[600px] animate-in slide-in-from-top-4 duration-500">
              <div className="mb-10">
                <h4 className="text-[16px] font-bold text-dark-text mb-1">Moderation Mode</h4>
                <p className="text-[14px] text-gray-text mb-4">Control how photos and videos appear on your live wall.</p>
                <div className="flex flex-col gap-3">
                  {[
                    { id: "auto", label: "Approve all automatically", desc: "Fastest way to get photos live." },
                    { id: "manual", label: "Manual approval (recommended)", desc: "You review everything before it goes live." }
                  ].map((opt) => (
                    <div 
                      key={opt.id}
                      className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                        opt.id === "manual" 
                          ? "border-primary-lilac bg-light-lavender/30 shadow-lg shadow-primary-lilac/5" 
                          : "border-border-color bg-white hover:border-primary-lilac/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-dark-text">{opt.label}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${opt.id === "manual" ? "border-primary-lilac" : "border-gray-300"}`}>
                          {opt.id === "manual" && <div className="w-2.5 h-2.5 rounded-full bg-primary-lilac"></div>}
                        </div>
                      </div>
                      <p className="text-[13px] text-gray-text font-medium m-0">{opt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button className="btn btn-primary px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs">
                Save Media Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MediaPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MediaContent />
    </Suspense>
  );
}
