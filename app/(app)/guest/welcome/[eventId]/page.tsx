"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getEventBySlug } from "@/lib/actions/event";

export default function GuestWelcomePage() {
  const params = useParams();
  const router = useRouter();
  const eventSlug = params.eventId as string;
  const [guestName, setGuestName] = useState("");
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await getEventBySlug(eventSlug);
        if (data) {
          setEvent(data);
        } else {
          router.push("/404");
        }
      } catch (error) {
        console.error("Failed to load event:", error);
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, [eventSlug, router]);

  const handleEnter = () => {
    if (guestName.trim()) {
      localStorage.setItem(`guestName_${event.id}`, guestName);
    }
    router.push(`/guest/${eventSlug}`);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black">
        <div className="text-white font-bold animate-pulse">Loading Event...</div>
      </div>
    );
  }

  if (!event) return null;

  const bgImage = event.coverPhotoUrl || "https://media.kululu.me/event_L8TlHAXcAjMRwaxpPQ02/general/asset_2024-07-28_16-57-38_p53fii.png";

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center overflow-hidden bg-black animate-in fade-in duration-700">
      {/* Blurred Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60 scale-110"
        style={{ backgroundImage: `url("${bgImage}")` }}
      ></div>

      {/* Welcome Card - Optimized for 100vh visibility */}
      <div 
        className="relative z-10 w-full max-w-[450px] h-[90dvh] md:h-auto md:min-h-[650px] bg-cover bg-center border-[6px] border-primary-lilac rounded-[40px] shadow-2xl flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-500"
        style={{ backgroundImage: `url("${bgImage}")` }}
      >
        <div className="absolute inset-0 bg-black/20 rounded-[34px]"></div>
        
        <div className="relative z-20 flex flex-col items-center w-full max-w-[320px]">
          <div className="w-24 h-24 mb-6 md:mb-10 bg-white p-1 rounded-full shadow-2xl border-4 border-white overflow-hidden animate-in slide-in-from-top-4 duration-700">
             <img 
              src={event.coverPhotoUrl || "https://firebasestorage.googleapis.com/v0/b/kululushapp.appspot.com/o/event_L8TlHAXcAjMRwaxpPQ02%2Fgeneral%2Flogo_2024-07-28_16-56-33_jdwvfd.png?alt=media&token=e1636085-633d-4814-a680-87e6e8027e4a"} 
              alt="event logo" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 
            className="text-3xl md:text-5xl text-white mb-4 animate-in slide-in-from-top-6 duration-700 delay-200"
            style={{ fontFamily: "'Abril Fatface', serif", fontWeight: 400 }}
          >
            {event.name}
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
            disabled={!guestName.trim()}
            onClick={handleEnter}
            className="w-full py-4 md:py-5 rounded-2xl bg-primary-lilac text-white font-black uppercase tracking-widest text-lg shadow-2xl hover:scale-[1.02] active:scale-95 transition-all animate-in slide-in-from-bottom-6 duration-700 delay-700 disabled:opacity-50"
          >
            Let&apos;s Go!
          </button>
        </div>
      </div>
    </div>
  );
}
