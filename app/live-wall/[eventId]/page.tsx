"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getEventBySlug } from "@/lib/actions/event";
import { getPhotos } from "@/lib/actions/media";
import { QRCodeSVG } from "qrcode.react";

export default function LiveWallPage() {
  const params = useParams();
  const eventSlug = params.eventId as string;
  const [event, setEvent] = useState<any>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const eventData = await getEventBySlug(eventSlug);
        if (eventData) {
          setEvent(eventData);
          const photosData = await getPhotos(eventData.id);
          setPhotos(photosData);
        }
      } catch (error) {
        console.error("Failed to load live wall data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();

    // Polling for new photos every 10 seconds
    const pollInterval = setInterval(loadData, 10000);
    return () => clearInterval(pollInterval);
  }, [eventSlug]);

  useEffect(() => {
    if (photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
      }, 6000); // Change image every 6 seconds
      return () => clearInterval(interval);
    }
  }, [photos.length]);

  const guestUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/guest/${eventSlug}` 
    : "";

  if (loading) return <div className="bg-black h-screen w-full flex items-center justify-center text-white font-black animate-pulse">Initializing Live Wall...</div>;

  const currentMedia = photos.length > 0 ? photos[currentIndex] : null;
  const isVideo = currentMedia?.url?.endsWith(".mp4") || currentMedia?.url?.includes("video");

  return (
    <div className="bg-black h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden relative font-sans">
      
      {/* Branding Header */}
      <div className="absolute top-10 left-10 flex items-center gap-3.5 z-[100]">
        <div className="w-12 h-12 bg-primary-lilac rounded-full flex items-center justify-center font-black text-white shadow-[0_0_20px_rgba(145,97,242,0.4)] text-xl">
          {event?.name?.charAt(0) || "E"}
        </div>
        <div>
          <h2 className="text-2xl font-extrabold m-0 tracking-tight leading-none">{event?.name || "Event Wall"}</h2>
          <p className="text-sm opacity-50 m-0 mt-1 font-medium tracking-wide">#{eventSlug}</p>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="absolute top-12 right-12 z-[100] bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full animate-in fade-in duration-1000">
        <div className="flex items-center gap-3 text-white font-bold text-sm tracking-widest uppercase">
          <div className="w-2 h-2 bg-success rounded-full animate-ping"></div>
          Live Stream
        </div>
      </div>

      {/* Main Slideshow Area */}
      <div className="w-[85%] h-[75%] bg-[#0a0a0a] rounded-[40px] flex flex-col items-center justify-center border border-white/5 shadow-[0_0_100px_rgba(145,97,242,0.08)] relative overflow-hidden group transition-all duration-1000">
        
        {currentMedia ? (
          <div className="w-full h-full relative flex items-center justify-center animate-in zoom-in-95 fade-in duration-1000">
            {/* Background Blur for the individual media */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-[80px] opacity-20 scale-110 transition-all duration-1000"
              style={{ backgroundImage: `url("${currentMedia.url}")` }}
            />
            
            {/* Media Element */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
              {isVideo ? (
                <video 
                  key={currentMedia.id}
                  src={currentMedia.url} 
                  autoPlay 
                  muted 
                  loop 
                  className="max-w-full max-h-full object-contain rounded-[24px] shadow-2xl"
                />
              ) : (
                <img 
                  key={currentMedia.id}
                  src={currentMedia.url} 
                  alt="Moment" 
                  className="max-w-full max-h-full object-contain rounded-[24px] shadow-2xl"
                />
              )}
            </div>

            {/* Guest Attribution Bottom Left of Iframe Area */}
            <div className="absolute bottom-10 left-10 flex items-center gap-4 z-20">
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl animate-in slide-in-from-left duration-700">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-lilac mb-0.5 opacity-80">Shared By</div>
                 <div className="text-white font-bold text-lg">{currentMedia.guestName || "Anonymous"}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center opacity-20">
            <i className="fa-regular fa-image text-[120px] mb-6"></i>
            <h3 className="text-2xl font-black uppercase tracking-widest">Waiting for first photo...</h3>
          </div>
        )}
        
        {/* Engagement Overlay - QR Code */}
        <div className="absolute bottom-10 right-10 text-right bg-black/60 backdrop-blur-xl px-8 py-6 rounded-[24px] border border-white/10 shadow-2xl animate-in slide-in-from-bottom-10 duration-1000 z-50">
          <h3 className="text-lg font-black mb-4 whitespace-nowrap tracking-tight">Scan to share!</h3>
          <div className="inline-block bg-white rounded-xl flex items-center justify-center p-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <QRCodeSVG value={guestUrl} size={90} />
          </div>
          <div className="mt-4 text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 truncate max-w-[120px] ml-auto">
            {guestUrl.replace("https://", "").replace("http://", "")}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 right-10 flex gap-4 opacity-0 hover:opacity-100 transition-opacity duration-300 z-[100]">
        <Link href="/dashboard" className="btn btn-outline border-white/10 text-white hover:bg-white/5 px-6 py-2.5 rounded-full text-sm font-bold no-underline">
          Exit Fullscreen
        </Link>
      </div>

      {/* Global Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-lilac/5 rounded-full blur-[150px] pointer-events-none"></div>
    </div>
  );
}
