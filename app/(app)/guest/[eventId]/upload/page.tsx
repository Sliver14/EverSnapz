"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function GuestUploadPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [guestName, setGuestName] = useState<string | null>(null);

  useEffect(() => {
    const name = localStorage.getItem(`guestName_${eventId}`);
    if (name) {
      setGuestName(name);
    }
  }, [eventId]);

  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [textPost, setTextPost] = useState("");

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log("Selected files:", files);
      alert(`Selected ${files.length} items to upload!`);
    }
  };

  const handleTextPostSubmit = () => {
    if (textPost.trim()) {
      alert(`Text post submitted: ${textPost}`);
      setTextPost("");
      setIsTextModalOpen(false);
    }
  };

  // Format event ID for display
  const eventNameDisplay = eventId ? eventId.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : "John & Rachel Wedding";

  return (
    <div className="min-h-screen bg-white font-sans text-dark-text overflow-hidden flex flex-col">
      {/* Container with dynamic gradient */}
      <div 
        className="flex-1 flex flex-col w-full"
        style={{ background: 'linear-gradient(to bottom, var(--light-lavender) 0%, white 100%)' }}
      >
        {/* Header / Back Button */}
        <div className="p-6 max-w-[600px] mx-auto w-full">
          <Link 
            href={`/guest/${eventId}`}
            className="inline-flex items-center gap-2 text-primary-lilac font-bold hover:opacity-80 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
            Back to album
          </Link>
        </div>

        {/* Main Content Container */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-[600px] mx-auto w-full text-center">
          
          {/* Event Header */}
          <div className="mb-12 flex flex-col items-center gap-4">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/kululushapp.appspot.com/o/event_L8TlHAXcAjMRwaxpPQ02%2Fgeneral%2Flogo_2024-07-28_16-56-33_jdwvfd.png?alt=media&token=e1636085-633d-4814-a680-87e6e8027e4a" 
              className="w-20 h-20 object-contain rounded-full bg-white p-2 shadow-lg border-2 border-white" 
              alt="event logo" 
            />
            <div className="text-2xl md:text-3xl font-black text-dark-text tracking-tight">
              {eventNameDisplay}
            </div>
          </div>

          {/* Upload Card Area */}
          <div className="w-full">
            <label 
              onClick={handleUploadClick}
              className="relative w-full aspect-square max-w-[320px] mx-auto flex flex-col items-center justify-center cursor-pointer group transition-all"
            >
              {/* Animated Circles behind the icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 bg-primary-lilac/5 rounded-full scale-110 animate-pulse"></div>
                <div className="absolute w-36 h-36 bg-primary-lilac/10 rounded-full scale-105"></div>
              </div>

              {/* Icon Container */}
              <div className="relative z-10 w-24 h-24 bg-primary-lilac/20 text-primary-lilac rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </div>

              {/* Labels */}
              <div className="mt-10 relative z-10">
                <div className="text-2xl font-black text-dark-text mb-1">Pick Photos & Videos</div>
                <div className="text-gray-text font-bold opacity-60">Tap to select files</div>
              </div>
            </label>

            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
              multiple
              className="hidden"
            />

            {/* Text Post Link */}
            <div className="mt-16 text-lg font-bold text-gray-text">
              Or add a <span onClick={() => setIsTextModalOpen(true)} className="text-primary-lilac cursor-pointer hover:underline">text post</span>
            </div>
          </div>

        </div>

        {/* Text Post Modal */}
        {isTextModalOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-dark-text/40 backdrop-blur-sm animate-in fade-in duration-300" 
              onClick={() => setIsTextModalOpen(false)}
            ></div>
            
            {/* Modal Card */}
            <div className="bg-white w-full max-w-[500px] rounded-[32px] shadow-2xl relative z-10 animate-in zoom-in-95 fade-in duration-300 overflow-hidden flex flex-col">
              <div className="p-8 flex-1">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black text-dark-text tracking-tight">Add a text post</h3>
                  <button 
                    onClick={() => setIsTextModalOpen(false)}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-bg-light transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x text-gray-text">
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>

                <div className="relative">
                  <textarea 
                    autoFocus
                    placeholder="Write something nice..."
                    className="w-full h-[200px] p-6 rounded-[24px] border-2 border-border-color bg-bg-light outline-none focus:border-primary-lilac transition-all text-xl font-bold resize-none"
                    value={textPost}
                    onChange={(e) => setTextPost(e.target.value)}
                  ></textarea>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <button 
                    disabled={!textPost.trim()}
                    onClick={handleTextPostSubmit}
                    className="btn btn-primary w-full py-5 rounded-[20px] font-black uppercase tracking-widest text-lg shadow-xl shadow-primary-lilac/20 disabled:opacity-30 disabled:pointer-events-none"
                  >
                    Post to Album
                  </button>
                </div>
              </div>
              
              <div className="bg-bg-light p-6 border-t border-border-color text-center">
                <p className="text-sm text-gray-text font-bold opacity-60">
                  This will be visible to all guests in the gallery.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Network status placeholder */}
        <div className="h-2"></div>
      </div>
    </div>
  );
}
