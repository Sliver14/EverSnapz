"use client";

import { useState, useRef } from "react";
import { createEvent } from "@/lib/actions/event";
import { useRouter } from "next/navigation";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateEventModal({ isOpen, onClose }: CreateEventModalProps) {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName || !eventDate) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", eventName);
      formData.append("date", eventDate);
      if (coverPhoto) {
        formData.append("coverPhoto", coverPhoto);
      }

      const newEvent = await createEvent(formData);
      
      setEventName("");
      setEventDate("");
      setCoverPhoto(null);
      setPreviewUrl(null);
      onClose();
      router.push(`/dashboard?eventId=${newEvent.id}`);
      router.refresh();
    } catch (error) {
      console.error("Failed to create event:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-dark-text/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>
      
      {/* Modal Card */}
      <div className="bg-white w-full max-w-[500px] rounded-[24px] shadow-2xl relative z-10 animate-in zoom-in-95 fade-in duration-300 overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-black text-dark-text tracking-tight">Create New Event</h3>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-bg-light transition-colors"
            >
              <i className="fa-solid fa-xmark text-lg text-gray-text"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="form-label text-[14px]">Event Name</label>
              <input 
                type="text" 
                placeholder="e.g. Sarah & Mark's Wedding" 
                className="form-input !py-4"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required 
              />
              <p className="text-[12px] text-gray-text mt-2">This will be shown on your digital album header.</p>
            </div>

            <div>
              <label className="form-label text-[14px]">Event Date</label>
              <input 
                type="date" 
                className="form-input !py-4"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required 
              />
            </div>

            {/* Cover Photo Upload */}
            <div>
              <label className="form-label text-[14px]">Cover Photo (Optional)</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 w-full aspect-video rounded-xl border-2 border-dashed border-border-color bg-bg-light flex flex-col items-center justify-center cursor-pointer hover:border-primary-lilac transition-all overflow-hidden relative"
              >
                {previewUrl ? (
                  <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <>
                    <i className="fa-solid fa-image text-3xl text-gray-text/20 mb-2"></i>
                    <span className="text-xs text-gray-text font-bold uppercase tracking-widest opacity-60">Upload Cover Image</span>
                  </>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden" 
              />
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <button 
                disabled={loading}
                type="submit" 
                className="btn btn-primary w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary-lilac/20 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Event"}
              </button>
              <button 
                type="button" 
                onClick={onClose}
                className="btn btn-outline w-full py-4 rounded-2xl font-bold text-sm border-none hover:bg-bg-light"
              >
                Maybe Later
              </button>
            </div>
          </form>
        </div>
        
        <div className="bg-bg-light p-6 border-t border-border-color text-center">
          <p className="text-xs text-gray-text font-medium leading-relaxed">
            By creating an event, you agree to EverSnapz&apos;s <br /> 
            <span className="text-primary-lilac cursor-pointer hover:underline">Terms of Service</span> and <span className="text-primary-lilac cursor-pointer hover:underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
