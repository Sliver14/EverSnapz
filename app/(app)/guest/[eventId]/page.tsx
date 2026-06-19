"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { getEventBySlug } from "@/lib/actions/event";
import { getPhotos, uploadMedia } from "@/lib/actions/media";

export default function GuestPage() {
  const params = useParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const eventSlug = params.eventId as string;
  
  const [event, setEvent] = useState<any>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [guestName, setGuestName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [bgImageIndex, setBgImageIndex] = useState(0);

  // Modal States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isMyUploadsOpen, setIsMyUploadsOpen] = useState(false);
  const [isMyLikesOpen, setIsMyLikesOpen] = useState(false);
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

        const photosData = await getPhotos(eventData.id);
        setPhotos(photosData);

        const name = localStorage.getItem(`guestName_${eventData.id}`);
        if (!name) {
          router.push(`/guest/welcome/${eventSlug}`);
        } else {
          setGuestName(name);
        }
      } catch (error) {
        console.error("Failed to load guest data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [eventSlug, router]);

  const handleUploadClick = () => {
    setIsShareMenuOpen(true);
  };

  const handlePickMedia = () => {
    fileInputRef.current?.click();
    setIsShareMenuOpen(false);
  };

  const handleTextPostSubmit = () => {
    if (textPost.trim()) {
      alert(`Text post submitted: ${textPost}`);
      setTextPost("");
      setIsTextModalOpen(false);
      setIsShareMenuOpen(false);
    }
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
      // Refresh photos after upload
      const photosData = await getPhotos(event.id);
      setPhotos(photosData);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload media. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const myUploads = photos.filter(p => p.guestName === guestName);
  const galleryImages = photos.length > 0 ? photos.map(p => p.url) : [];

  useEffect(() => {
    if (galleryImages.length > 1) {
      const interval = setInterval(() => {
        setBgImageIndex((prev) => (prev + 1) % galleryImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [galleryImages.length]);

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-primary-lilac font-black animate-pulse">Loading event...</div>;
  }

  if (!event) return null;

  return (
    <div className="min-h-screen bg-white font-sans text-dark-text overflow-x-hidden">
      {/* Full Screen Desktop Container */}
      <div className="relative w-full min-h-screen flex flex-col bg-white">
        
        {/* Dynamic Background Section - Now limited to 80vh and contains the hero */}
        <div className="relative h-[80vh] w-full overflow-hidden flex flex-col">
          {/* Animated Background Layers */}
          {galleryImages.length > 0 ? (
            galleryImages.map((src, idx) => (
              <div 
                key={src}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${idx === bgImageIndex ? 'opacity-40' : 'opacity-0'}`}
                style={{ backgroundImage: `url("${src}")` }}
              />
            ))
          ) : event.coverPhotoUrl ? (
            <div 
              className={`absolute inset-0 bg-cover bg-center opacity-40`}
              style={{ backgroundImage: `url("${event.coverPhotoUrl}")` }}
            />
          ) : (
             <div className="absolute inset-0 bg-primary-lilac/5"></div>
          )}

          {/* Blur Overlays */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ 
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,1) 100%)',
              backdropFilter: 'blur(4px)'
            }}
          ></div>
          
          {/* Top Bar - Responsive Positioning */}
          <div className="absolute top-6 left-6 right-6 z-30 flex justify-center">
            <div className="w-full max-w-[1400px] flex justify-between items-center">
              {/* Guest Info on the left */}
              {guestName ? (
                <div className="px-3 py-2 md:px-4 md:py-2 bg-white/40 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg">
                  <div className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-primary-lilac opacity-80">Guest Access</div>
                  <div className="text-xs md:text-sm font-bold text-dark-text truncate max-w-[100px] md:max-w-none">{guestName}</div>
                </div>
              ) : <div />}

              {/* Hamburger Icon on the right */}
              <div 
                onClick={() => setIsMenuOpen(true)}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/40 backdrop-blur-lg rounded-2xl cursor-pointer hover:bg-white/60 transition-all shadow-lg border border-white/20"
              >
                <svg viewBox="64 64 896 896" width="20" height="20" md-width="24" md-height="24" fill="currentColor">
                  <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Hero Content - Centered in the 100vh section to ensure visibility of buttons */}
          <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="relative w-full flex flex-col items-center">
              {/* Logo */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary-lilac/10 blur-2xl rounded-full scale-150"></div>
                <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white p-1 rounded-full shadow-2xl border-4 border-white overflow-hidden">
                   <img 
                    src={event.coverPhotoUrl || (photos.length > 0 ? photos[0].url : "https://firebasestorage.googleapis.com/v0/b/kululushapp.appspot.com/o/event_L8TlHAXcAjMRwaxpPQ02%2Fgeneral%2Flogo_2024-07-28_16-56-33_jdwvfd.png?alt=media&token=e1636085-633d-4814-a680-87e6e8027e4a")} 
                    className="w-full h-full object-cover" 
                    alt="event logo" 
                  />
                </div>
              </div>
              
              {/* Event Title */}
              <h1 
                className="text-4xl md:text-6xl font-bold mb-3 text-dark-text drop-shadow-sm max-w-[800px]"
                style={{ fontFamily: "'Abril Fatface', serif" }}
              >
                {event.name}
              </h1>

              {/* Event Date */}
              {event.date && (
                <div className="text-lg md:text-xl font-medium text-gray-text/80 mb-8">
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
              )}
              
              {/* Add to Album Button - Visible within 100vh */}
              <button 
                disabled={uploading}
                onClick={handleUploadClick}
                className="group flex items-center gap-3 px-10 py-5 bg-primary-lilac text-white rounded-3xl font-black text-xl shadow-2xl shadow-primary-lilac/30 hover:scale-105 active:scale-95 transition-all mb-6 uppercase tracking-wider disabled:opacity-50"
              >
                {uploading ? (
                   <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg viewBox="64 64 896 896" width="24" height="24" fill="currentColor" className="group-hover:rotate-90 transition-transform duration-500">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z"></path>
                  </svg>
                )}
                <span>{uploading ? "Sharing..." : "Add to album"}</span>
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
                {photos.length > 0 && (
                  <div className="flex -space-x-2">
                    {photos.slice(0, 3).map((p, i) => (
                      <div key={p.id} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                        <img src={p.url} className="w-full h-full object-cover" alt="avatar" />
                      </div>
                    ))}
                  </div>
                )}
                <span className="text-sm text-gray-text font-bold uppercase tracking-tight">
                  <span className="text-primary-lilac">{photos.length}</span> photos & videos shared
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Media Grid Section - Full width on desktop */}
        <div className="px-2 md:px-8 py-12 flex-1 w-full">
          {photos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-4">
              {/* Real Image Posts */}
              {photos.map((photo, i) => (
                <div key={photo.id} className="relative aspect-square overflow-hidden bg-bg-light rounded-2xl md:rounded-[2rem] group shadow-sm hover:shadow-xl transition-all duration-700 hover:-translate-y-1">
                  <img 
                    src={photo.url} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={`Shared by ${photo.guestName}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 flex flex-col gap-1 text-white drop-shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] font-black uppercase opacity-70">{photo.guestName}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="w-20 h-20 bg-light-lavender rounded-3xl flex items-center justify-center text-primary-lilac mb-6 shadow-lg shadow-primary-lilac/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
              </div>
              <h3 className="text-2xl font-black text-dark-text mb-2 tracking-tight">No memories yet</h3>
              <p className="text-gray-text font-bold opacity-60 max-w-[300px]">Be the first one to share a photo or video from this event!</p>
            </div>
          )}
        </div>

        {/* Back Top Button */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-10 right-10 z-50 p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl cursor-pointer hover:bg-white transition-all hover:scale-110 active:scale-95 border border-border-color"
        >
          <svg viewBox="64 64 896 896" width="24" height="24" className="text-primary-lilac fill-current">
            <path d="M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z"></path>
          </svg>
        </div>

        {/* HAMBURGER MENU OVERLAY */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[1000] flex animate-in fade-in duration-300">
            <div 
              className="absolute inset-0 bg-dark-text/40 backdrop-blur-md"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-[320px] bg-white shadow-2xl animate-in slide-in-from-right duration-500 p-8 flex flex-col">
              <div className="flex justify-between items-center mb-12">
                <div className="text-2xl font-black text-primary-lilac tracking-tighter">EverSnapz</div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 rounded-2xl bg-bg-light flex items-center justify-center text-gray-text"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                </button>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                <button 
                  onClick={() => { setIsMenuOpen(false); setIsMyUploadsOpen(true); }}
                  className="flex items-center gap-4 p-5 rounded-3xl bg-bg-light hover:bg-light-lavender text-dark-text hover:text-primary-lilac transition-all text-lg font-black uppercase tracking-widest"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>
                  My Uploads
                </button>
                <button 
                  onClick={() => { setIsMenuOpen(false); setIsMyLikesOpen(true); }}
                  className="flex items-center gap-4 p-5 rounded-3xl bg-bg-light hover:bg-light-lavender text-dark-text hover:text-primary-lilac transition-all text-lg font-black uppercase tracking-widest"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                  My Likes
                </button>
                <a 
                  href="/"
                  className="flex items-center gap-4 p-5 rounded-3xl bg-primary-lilac/10 text-primary-lilac hover:bg-primary-lilac hover:text-white transition-all text-lg font-black uppercase tracking-widest no-underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" x2="3" y1="12" y2="12"></line></svg>
                  Get EverSnapz
                </a>
              </div>

              <div className="mt-auto pt-8 border-t border-border-color text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-text opacity-40 mb-2">Powered By</p>
                <div className="text-xl font-black text-dark-text opacity-20">EverSnapz</div>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM SHEET - SHARE MENU */}
        {isShareMenuOpen && (
          <div className="fixed inset-0 z-[2000] flex flex-col justify-end animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-dark-text/40 backdrop-blur-sm" onClick={() => setIsShareMenuOpen(false)} />
            <div className="relative bg-white rounded-t-[40px] p-8 pb-12 shadow-2xl animate-in slide-in-from-bottom duration-500 max-w-[600px] mx-auto w-full">
              <div className="w-12 h-1.5 bg-border-color rounded-full mx-auto mb-8" />
              <h3 className="text-2xl font-black text-dark-text mb-8 text-center">Share a memory</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={handlePickMedia}
                  className="flex items-center gap-6 p-6 bg-bg-light rounded-[2rem] border-2 border-transparent hover:border-primary-lilac transition-all group"
                >
                  <div className="w-16 h-16 bg-primary-lilac/10 text-primary-lilac rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-black text-dark-text">Pick Photos & Videos</div>
                    <div className="text-sm text-gray-text font-bold opacity-60">Tap to select files from device</div>
                  </div>
                </button>

                <button 
                  onClick={() => setIsTextModalOpen(true)}
                  className="flex items-center gap-6 p-6 bg-bg-light rounded-[2rem] border-2 border-transparent hover:border-primary-lilac transition-all group"
                >
                  <div className="w-16 h-16 bg-primary-lilac/10 text-primary-lilac rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-black text-dark-text">Add a text post</div>
                    <div className="text-sm text-gray-text font-bold opacity-60">Write a sweet message</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM SHEET - MY UPLOADS */}
        {isMyUploadsOpen && (
          <div className="fixed inset-0 z-[2000] flex flex-col justify-end animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-dark-text/40 backdrop-blur-sm" onClick={() => setIsMyUploadsOpen(false)} />
            <div className="relative bg-white rounded-t-[40px] p-8 h-[80vh] shadow-2xl animate-in slide-in-from-bottom duration-500 max-w-[800px] mx-auto w-full flex flex-col">
              <div className="w-12 h-1.5 bg-border-color rounded-full mx-auto mb-8 flex-shrink-0" />
              <div className="flex justify-between items-center mb-8 flex-shrink-0">
                <h3 className="text-2xl font-black text-dark-text tracking-tighter">My Uploads</h3>
                <button onClick={() => setIsMyUploadsOpen(false)} className="text-gray-text font-bold">Close</button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {myUploads.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 pb-12">
                    {myUploads.map(p => (
                      <div key={p.id} className="aspect-square rounded-2xl overflow-hidden bg-bg-light">
                        <img src={p.url} className="w-full h-full object-cover" alt="upload" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-bg-light rounded-3xl flex items-center justify-center text-gray-text/20 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>
                    </div>
                    <div className="font-black text-dark-text">No uploads yet</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM SHEET - MY LIKES */}
        {isMyLikesOpen && (
          <div className="fixed inset-0 z-[2000] flex flex-col justify-end animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-dark-text/40 backdrop-blur-sm" onClick={() => setIsMyLikesOpen(false)} />
            <div className="relative bg-white rounded-t-[40px] p-8 h-[80vh] shadow-2xl animate-in slide-in-from-bottom duration-500 max-w-[800px] mx-auto w-full flex flex-col">
              <div className="w-12 h-1.5 bg-border-color rounded-full mx-auto mb-8 flex-shrink-0" />
              <div className="flex justify-between items-center mb-8 flex-shrink-0">
                <h3 className="text-2xl font-black text-dark-text tracking-tighter">My Likes</h3>
                <button onClick={() => setIsMyLikesOpen(false)} className="text-gray-text font-bold">Close</button>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center text-center pb-20">
                <div className="w-20 h-20 bg-primary-lilac/5 text-primary-lilac/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                </div>
                <div className="font-black text-dark-text mb-2">Coming Soon</div>
                <div className="text-gray-text font-bold opacity-60 text-sm">You&apos;ll be able to see all your favorites here!</div>
              </div>
            </div>
          </div>
        )}

        {/* TEXT POST MODAL */}
        {isTextModalOpen && (
          <div className="fixed inset-0 z-[2100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-dark-text/40 backdrop-blur-sm" onClick={() => setIsTextModalOpen(false)} />
            <div className="bg-white w-full max-w-[500px] rounded-[32px] shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black text-dark-text tracking-tight">Add a text post</h3>
                  <button onClick={() => setIsTextModalOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-bg-light transition-colors text-gray-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                  </button>
                </div>
                <textarea 
                  autoFocus
                  placeholder="Write something nice..."
                  className="w-full h-[200px] p-6 rounded-[24px] border-2 border-border-color bg-bg-light outline-none focus:border-primary-lilac transition-all text-xl font-bold resize-none"
                  value={textPost}
                  onChange={(e) => setTextPost(e.target.value)}
                />
                <button 
                  disabled={!textPost.trim()}
                  onClick={handleTextPostSubmit}
                  className="btn btn-primary w-full py-5 rounded-[20px] font-black uppercase tracking-widest text-lg shadow-xl shadow-primary-lilac/20 disabled:opacity-30 mt-8"
                >
                  Post to Album
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
