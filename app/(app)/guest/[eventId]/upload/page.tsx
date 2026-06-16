"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getEventBySlug } from "@/lib/actions/event";
import { uploadMedia } from "@/lib/actions/media";

export default function GuestUploadPage() {
  const params = useParams();
  const router = useRouter();
  const eventSlug = params.eventId as string;
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  
  const [event, setEvent] = useState<any>(null);
  const [guestName, setGuestName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [textPost, setTextPost] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const eventData = await getEventBySlug(eventSlug);
        if (!eventData) {
          router.push("/404");
          return;
        }
        setEvent(eventData);

        const name = localStorage.getItem(`guestName_${eventData.id}`);
        if (!name) {
          router.push(`/guest/welcome/${eventSlug}`);
        } else {
          setGuestName(name);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [eventSlug, router]);

  const handleGalleryClick = () => {
    galleryInputRef.current?.click();
  };

  const handlePhotoClick = () => {
    photoInputRef.current?.click();
  };

  const handleVideoClick = () => {
    videoInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !event || !guestName) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        formData.append("eventId", event.id);
        formData.append("guestName", guestName);
        await uploadMedia(formData);
      }
      router.push(`/guest/${eventSlug}`);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload media. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleTextPostSubmit = () => {
    if (textPost.trim()) {
      alert(`Text post submitted: ${textPost}`);
      setTextPost("");
      setIsTextModalOpen(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  }

  if (!event) return null;

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
            href={`/guest/${eventSlug}`}
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
            <div className="w-20 h-20 bg-white p-1 rounded-full shadow-lg border-2 border-white overflow-hidden">
               <img 
                src={event.coverPhotoUrl || "https://firebasestorage.googleapis.com/v0/b/kululushapp.appspot.com/o/event_L8TlHAXcAjMRwaxpPQ02%2Fgeneral%2Flogo_2024-07-28_16-56-33_jdwvfd.png?alt=media&token=e1636085-633d-4814-a680-87e6e8027e4a"} 
                className="w-full h-full object-cover" 
                alt="event logo" 
              />
            </div>
            <div className="text-2xl md:text-3xl font-black text-dark-text tracking-tight">
              {event.name}
            </div>
          </div>

          {/* Upload Card Area */}
          <div className="w-full max-w-[400px] mx-auto space-y-6">
            
            {uploading ? (
              <div className="relative aspect-square w-full max-w-[320px] mx-auto flex flex-col items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-primary-lilac/5 rounded-full scale-110 animate-spin border-4 border-dashed border-primary-lilac/20"></div>
                  <div className="absolute w-36 h-36 bg-primary-lilac/10 rounded-full scale-105"></div>
                </div>
                <div className="relative z-10 w-24 h-24 bg-primary-lilac/20 text-primary-lilac rounded-full flex items-center justify-center shadow-xl">
                  <svg className="animate-spin h-10 w-10 text-primary-lilac" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <div className="mt-10 relative z-10">
                  <div className="text-2xl font-black text-dark-text mb-1">Uploading...</div>
                  <div className="text-gray-text font-bold opacity-60">Please wait while we process your memories</div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 w-full">
                {/* Photo Option */}
                <button 
                  onClick={handlePhotoClick}
                  className="flex items-center gap-6 p-6 bg-white rounded-[2rem] shadow-xl shadow-primary-lilac/5 border border-border-color hover:border-primary-lilac transition-all group"
                >
                  <div className="w-16 h-16 bg-primary-lilac/10 text-primary-lilac rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-black text-dark-text">Take Photo</div>
                    <div className="text-sm text-gray-text font-bold opacity-60">Open your camera</div>
                  </div>
                </button>

                {/* Video Option */}
                <button 
                  onClick={handleVideoClick}
                  className="flex items-center gap-6 p-6 bg-white rounded-[2rem] shadow-xl shadow-primary-lilac/5 border border-border-color hover:border-primary-lilac transition-all group"
                >
                  <div className="w-16 h-16 bg-primary-lilac/10 text-primary-lilac rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"></path><rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect></svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-black text-dark-text">Record Video</div>
                    <div className="text-sm text-gray-text font-bold opacity-60">Capture a moment</div>
                  </div>
                </button>

                {/* Gallery Option */}
                <button 
                  onClick={handleGalleryClick}
                  className="flex items-center gap-6 p-6 bg-white rounded-[2rem] shadow-xl shadow-primary-lilac/5 border border-border-color hover:border-primary-lilac transition-all group"
                >
                  <div className="w-16 h-16 bg-primary-lilac/10 text-primary-lilac rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-black text-dark-text">Choose from Library</div>
                    <div className="text-sm text-gray-text font-bold opacity-60">Pick from your gallery</div>
                  </div>
                </button>
              </div>
            )}

            <input 
              type="file" 
              ref={galleryInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
              multiple
              className="hidden"
            />

            <input 
              type="file" 
              ref={photoInputRef}
              onChange={handleFileChange}
              accept="image/*"
              capture="environment"
              className="hidden"
            />

            <input 
              type="file" 
              ref={videoInputRef}
              onChange={handleFileChange}
              accept="video/*"
              capture="environment"
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
