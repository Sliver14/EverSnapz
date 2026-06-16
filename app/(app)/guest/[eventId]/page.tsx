"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

export default function GuestPage() {
  const params = useParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const eventId = params.eventId as string;
  const [guestName, setGuestName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [bgImageIndex, setBgImageIndex] = useState(0);

  const handleUploadClick = () => {
    router.push(`/guest/${eventId}/upload`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log("Selected files:", files);
      // In a real app, you would start the upload process here
      alert(`Ready to upload ${files.length} items!`);
    }
  };

  const galleryImages = [
    "https://firebasestorage.googleapis.com/v0/b/kululushapp.appspot.com/o/event_L8TlHAXcAjMRwaxpPQ02%2Fmedia_dokg6q_AC6I1318_websize.jpg?alt=media&token=b4812c8f-1790-4e64-b40d-d60e766d9f68",
    "https://firebasestorage.googleapis.com/v0/b/kululushapp.appspot.com/o/event_L8TlHAXcAjMRwaxpPQ02%2Fmedia_i3aang_179A8178_websize.jpg?alt=media&token=0eda7d0a-1094-438a-8cb6-52ed0608277c",
    "https://firebasestorage.googleapis.com/v0/b/kululushapp.appspot.com/o/event_L8TlHAXcAjMRwaxpPQ02%2Fmedia_1q1sjk_179A7597_websize.jpg?alt=media&token=98fb98ca-03da-4d87-a950-93427a529b50",
    "https://firebasestorage.googleapis.com/v0/b/kululushapp.appspot.com/o/event_L8TlHAXcAjMRwaxpPQ02%2Fmedia_48ym23_AC6I0690_websize.jpg?alt=media&token=48f00035-3208-4282-93b8-051db62034eb",
    "https://firebasestorage.googleapis.com/v0/b/kululushapp.appspot.com/o/event_L8TlHAXcAjMRwaxpPQ02%2Fmedia_rkokkz_AC6I0110_websize.jpg?alt=media&token=0bfdf98d-2bf8-4811-a46a-63ba718c358f"
  ];

  useEffect(() => {
    const name = localStorage.getItem(`guestName_${eventId}`);
    if (!name) {
      router.push(`/guest/welcome/${eventId}`);
    } else {
      setGuestName(name);
      setLoading(false);
    }
  }, [eventId, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  }

  // Format event ID for display
  const eventNameDisplay = eventId ? eventId.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : "John & Rachel Wedding";

  return (
    <div className="min-h-screen bg-white font-sans text-dark-text overflow-x-hidden">
      {/* Full Screen Desktop Container */}
      <div className="relative w-full min-h-screen flex flex-col bg-white">
        
        {/* Dynamic Background Section - Now limited to 100vh max and contains the hero */}
        <div className="relative h-[100dvh] w-full overflow-hidden flex flex-col">
          {/* Animated Background Layers */}
          {galleryImages.map((src, idx) => (
            <div 
              key={src}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${idx === bgImageIndex ? 'opacity-40' : 'opacity-0'}`}
              style={{ backgroundImage: `url("${src}")` }}
            />
          ))}

          {/* Blur Overlays */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ 
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,1) 100%)',
              backdropFilter: 'blur(4px)'
            }}
          ></div>
          
          {/* Top Bar - Hamburger on the right for ALL views */}
          <div className="absolute top-6 left-6 right-6 z-30 flex justify-between items-center max-w-[1400px] mx-auto w-full">
            {/* Guest Info on the left */}
            {guestName ? (
              <div className="px-4 py-2 bg-white/40 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg">
                <div className="text-[10px] font-black uppercase tracking-widest text-primary-lilac opacity-80">Guest Access</div>
                <div className="text-sm font-bold text-dark-text">{guestName}</div>
              </div>
            ) : <div />}

            {/* Hamburger Icon on the right */}
            <div className="w-12 h-12 flex items-center justify-center bg-white/40 backdrop-blur-lg rounded-2xl cursor-pointer hover:bg-white/60 transition-all shadow-lg border border-white/20">
              <svg viewBox="64 64 896 896" width="24" height="24" fill="currentColor">
                <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
              </svg>
            </div>
          </div>

          {/* Hero Content - Centered in the 100vh section to ensure visibility of buttons */}
          <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="relative w-full flex flex-col items-center">
              {/* Logo */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary-lilac/10 blur-2xl rounded-full scale-150"></div>
                <img 
                  src="https://firebasestorage.googleapis.com/v0/b/kululushapp.appspot.com/o/event_L8TlHAXcAjMRwaxpPQ02%2Fgeneral%2Flogo_2024-07-28_16-56-33_jdwvfd.png?alt=media&token=e1636085-633d-4814-a680-87e6e8027e4a" 
                  className="relative w-24 h-24 md:w-32 md:h-32 object-contain rounded-full bg-white p-2 shadow-2xl border-4 border-white" 
                  alt="event logo" 
                />
              </div>
              
              {/* Event Title */}
              <h1 
                className="text-4xl md:text-6xl font-bold mb-6 text-dark-text drop-shadow-sm max-w-[800px]"
                style={{ fontFamily: "'Abril Fatface', serif" }}
              >
                {eventNameDisplay}
              </h1>
              
              {/* Add to Album Button - Visible within 100vh */}
              <button 
                onClick={handleUploadClick}
                className="group flex items-center gap-3 px-10 py-5 bg-primary-lilac text-white rounded-3xl font-black text-xl shadow-2xl shadow-primary-lilac/30 hover:scale-105 active:scale-95 transition-all mb-6 uppercase tracking-wider"
              >
                <svg viewBox="64 64 896 896" width="24" height="24" fill="currentColor" className="group-hover:rotate-90 transition-transform duration-500">
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z"></path>
                </svg>
                <span>Add to album</span>
              </button>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                accept="image/*,video/*"
                className="hidden"
              />
              
              {/* Photo Counter */}
              <div className="px-6 py-2 bg-bg-light rounded-full border border-border-color shadow-sm inline-flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="avatar" />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-text font-bold uppercase tracking-tight">
                  <span className="text-primary-lilac">42</span> photos & videos shared
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Media Grid Section - Full width on desktop */}
        <div className="px-2 md:px-8 py-8 flex-1 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-4">
            
            {/* PINNED TEXT POST */}
            <div className="relative aspect-square overflow-hidden bg-bg-light rounded-2xl md:rounded-[2rem] group shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-4 left-4 z-10 text-primary-lilac">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17v5"></path><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"></path></svg>
              </div>
              <div 
                className="w-full h-full p-6 flex items-center justify-center text-center bg-cover bg-center"
                style={{ backgroundImage: 'url("https://media.kululu.me/1_utils/textpost-backgrounds/wedding-bg.jpg")' }}
              >
                <p className="text-sm md:text-base font-black leading-tight text-dark-text">Test out this DEMO event 🤳 Your uploads will be deleted automatically after a while.</p>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white drop-shadow-md bg-black/20 backdrop-blur-md px-2 py-1 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#f3433a" stroke="transparent"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                <span className="text-xs font-black">9</span>
              </div>
            </div>

            {/* SECOND TEXT POST */}
            <div className="relative aspect-square overflow-hidden bg-bg-light rounded-2xl md:rounded-[2rem] group shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div 
                className="w-full h-full p-6 flex items-center justify-center text-center bg-cover bg-center"
                style={{ backgroundImage: 'url("https://media.kululu.me/1_utils/textpost-backgrounds/emoji-bg.jpg")' }}
              >
                <p className="text-sm md:text-base font-black leading-tight text-dark-text">You can also upload text-only posts. How cool is that!</p>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-dark-text bg-white/40 backdrop-blur-md px-2 py-1 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#f3433a" stroke="transparent"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                <span className="text-xs font-black">10</span>
              </div>
            </div>

            {/* IMAGE POSTS */}
            {galleryImages.map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden bg-bg-light rounded-2xl md:rounded-[2rem] group shadow-sm hover:shadow-xl transition-all duration-700 hover:-translate-y-1">
                <img 
                  src={src} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt="event media"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white drop-shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#f3433a" stroke="transparent"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                  <span className="text-xs font-black">{Math.floor(Math.random() * 20) + 5}</span>
                </div>
              </div>
            ))}

            {/* FILLER CARDS */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(i => (
              <div key={i} className="relative aspect-square overflow-hidden bg-bg-light rounded-2xl md:rounded-[2rem] group border border-border-color flex items-center justify-center">
                <div className="text-border-color">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Back Top Button */}
        <div className="fixed bottom-10 right-10 z-50 p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl cursor-pointer hover:bg-white transition-all hover:scale-110 active:scale-95 border border-border-color">
          <svg viewBox="64 64 896 896" width="24" height="24" className="text-primary-lilac fill-current">
            <path d="M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z"></path>
          </svg>
        </div>

      </div>
    </div>
  );
}
