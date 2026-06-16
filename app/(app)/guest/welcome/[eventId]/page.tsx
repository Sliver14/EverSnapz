"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function GuestWelcomePage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;
  const [guestName, setGuestName] = useState("");

  // Format event ID for display
  const eventNameDisplay = eventId ? eventId.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : "John & Rachel Wedding";

  const handleEnter = () => {
    // In a real app, we'd save the name to local storage or a state management system
    if (guestName.trim()) {
      localStorage.setItem(`guestName_${eventId}`, guestName);
    }
    router.push(`/guest/${eventId}`);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center overflow-hidden bg-black animate-in fade-in duration-700">
      {/* Blurred Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60 scale-110"
        style={{ backgroundImage: 'url("https://media.kululu.me/event_L8TlHAXcAjMRwaxpPQ02/general/asset_2024-07-28_16-57-38_p53fii.png")' }}
      ></div>

      {/* Welcome Card - Optimized for 100vh visibility */}
      <div 
        className="relative z-10 w-full max-w-[450px] h-[90dvh] md:h-auto md:min-h-[650px] bg-cover bg-center border-[6px] border-primary-lilac rounded-[40px] shadow-2xl flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-500"
        style={{ backgroundImage: 'url("https://media.kululu.me/event_L8TlHAXcAjMRwaxpPQ02/general/asset_2024-07-28_16-57-38_p53fii.png")' }}
      >
        <div className="absolute inset-0 bg-black/20 rounded-[34px]"></div>
        
        <div className="relative z-20 flex flex-col items-center w-full max-w-[320px]">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/kululushapp.appspot.com/o/event_L8TlHAXcAjMRwaxpPQ02%2Fgeneral%2Flogo_2024-07-28_16-56-33_jdwvfd.png?alt=media&token=e1636085-633d-4814-a680-87e6e8027e4a" 
            alt="event logo" 
            className="w-20 md:w-24 mb-6 md:mb-10 animate-in slide-in-from-top-4 duration-700"
          />
          
          <h1 
            className="text-3xl md:text-5xl text-white mb-4 animate-in slide-in-from-top-6 duration-700 delay-200"
            style={{ fontFamily: "'Abril Fatface', serif", fontWeight: 400 }}
          >
            {eventNameDisplay}
          </h1>
          
          <p className="text-white text-base md:text-xl font-medium mb-8 md:mb-12 leading-relaxed animate-in slide-in-from-top-8 duration-700 delay-400">
            Please Share your photos & videos with us for this special day! ♥️
          </p>

          <div className="w-full mb-6 md:mb-8 animate-in fade-in duration-700 delay-500">
            <label className="block text-white text-xs md:text-sm font-bold uppercase tracking-widest mb-3 text-left">Name</label>
            <input 
              type="text" 
              placeholder="Enter your name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full p-4 rounded-xl border-none bg-white/90 text-dark-text outline-none focus:ring-4 ring-primary-lilac/30 transition-all font-bold text-lg"
            />
          </div>

          <button 
            onClick={handleEnter}
            className="w-full py-4 md:py-5 rounded-2xl bg-primary-lilac text-white font-black uppercase tracking-widest text-lg shadow-2xl hover:scale-[1.02] active:scale-95 transition-all animate-in slide-in-from-bottom-6 duration-700 delay-700"
          >
            Let&apos;s Go!
          </button>
        </div>
      </div>
    </div>
  );
}
