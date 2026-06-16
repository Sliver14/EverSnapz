"use client";

import Link from "next/link";

export default function LiveWallPage() {
  return (
    <div className="bg-black h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden relative font-sans">
      {/* Branding Header */}
      <div className="absolute top-10 left-10 flex items-center gap-3.5 z-50">
        <div className="w-12 h-12 bg-primary-lilac rounded-full flex items-center justify-center font-black text-white shadow-[0_0_20px_rgba(145,97,242,0.4)]">E</div>
        <div>
          <h2 className="text-2xl font-extrabold m-0 tracking-tight leading-none">Sarah & Mark</h2>
          <p className="text-sm opacity-50 m-0 mt-1 font-medium tracking-wide">#sarahandmark2026</p>
        </div>
      </div>

      {/* Main Slideshow Area */}
      <div className="w-[85%] h-[75%] bg-[#0a0a0a] rounded-[32px] flex flex-col items-center justify-center border border-white/5 shadow-[0_0_100px_rgba(145,97,242,0.08)] relative overflow-hidden group">
        <i className="fa-regular fa-image text-[120px] opacity-[0.03] group-hover:scale-110 transition-transform duration-[10s]"></i>
        
        {/* Engagement Overlay */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center bg-black/60 backdrop-blur-xl px-12 py-8 rounded-[24px] border border-white/10 shadow-2xl animate-in slide-in-from-bottom-10 duration-1000">
          <h3 className="text-2xl font-black mb-4 whitespace-nowrap tracking-tight">Scan to share your photos!</h3>
          <div className="w-[120px] h-[120px] bg-white mx-auto rounded-2xl flex items-center justify-center p-2.5 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <i className="fa-solid fa-qrcode text-black text-[90px]"></i>
          </div>
          <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">app.eversnapz.com/sarah-mark</div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 right-10 flex gap-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <Link href="/dashboard" className="btn btn-outline border-white/10 text-white hover:bg-white/5 px-6 py-2.5 rounded-full text-sm font-bold">
          Exit Fullscreen
        </Link>
      </div>

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-lilac/5 rounded-full blur-[120px] pointer-events-none"></div>
    </div>
  );
}
