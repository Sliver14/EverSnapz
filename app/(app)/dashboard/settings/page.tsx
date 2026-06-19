"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getEvents, deleteEvent, updateEventCoverPhoto } from "@/lib/actions/event";
import Link from "next/link";

function SettingsContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("general");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingCover, setUpdatingCover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getEvents();
      setEvents(data);
      setLoading(false);
    }
    loadData();
  }, [searchParams]);

  const eventId = searchParams.get("eventId");
  const selectedEvent = eventId 
    ? events.find(e => e.id === eventId) 
    : events[0];

  const handleCoverPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedEvent) return;

    setUpdatingCover(true);
    try {
      const formData = new FormData();
      formData.append("eventId", selectedEvent.id);
      formData.append("coverPhoto", file);

      const result = await updateEventCoverPhoto(formData);
      if (result.success) {
        setEvents(prev => prev.map(ev => 
          ev.id === selectedEvent.id 
            ? { ...ev, coverPhotoUrl: result.url } 
            : ev
        ));
      }
    } catch (error) {
      console.error("Failed to update cover photo:", error);
      alert("Failed to update cover photo.");
    } finally {
      setUpdatingCover(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;
    
    try {
      await deleteEvent(id);
      setEvents(events.filter(e => e.id !== id));
    } catch (error) {
      console.error("Failed to delete event:", error);
      alert("Failed to delete event.");
    }
  };

  const tabs = [
    ...(events.length > 0 ? [
      { id: "general", name: "General", icon: "fa-solid fa-sliders" },
      { id: "appearance", name: "Appearance", icon: "fa-solid fa-paint-roller" },
      { id: "photoWall", name: "Photo Wall", icon: "fa-solid fa-tv" },
      { id: "moderation", name: "Moderation", icon: "fa-solid fa-shield-halved" },
    ] : []),
    { id: "collaborators", name: "Collaborators", icon: "fa-solid fa-users" },
  ];

  if (loading) return <div className="py-20 text-center font-bold text-gray-text">Loading settings...</div>;

  return (
    <div className="max-w-[1000px] mx-auto">
      {/* Tabs Header */}
      <div className="flex border-b border-border-color mb-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2.5 px-6 py-4 text-[15px] font-bold transition-all relative shrink-0 ${
              activeTab === tab.id 
                ? "text-primary-lilac" 
                : "text-gray-text opacity-50 hover:opacity-100"
            }`}
          >
            <i className={`${tab.icon} text-lg`}></i>
            {tab.name}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-lilac rounded-t-full"></div>
            )}
          </button>
        ))}
      </div>

      <div className="animate-in fade-in duration-500">
        {!selectedEvent ? (
          <div className="py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-border-color shadow-sm">
            <div className="w-20 h-20 bg-bg-light rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <i className="fa-solid fa-calendar-plus text-3xl text-primary-lilac/30"></i>
            </div>
            <h3 className="text-xl font-bold text-dark-text">No event selected</h3>
            <p className="text-gray-text mb-6">Select an event from the sidebar or create a new one.</p>
            <Link href="/dashboard?new=true" className="btn btn-primary py-3 px-8 rounded-xl font-bold">Create New Event</Link>
          </div>
        ) : (
          <>
            {activeTab === "general" && (
              <div className="flex flex-col gap-10">
                {/* Cover Photo */}
                <div>
                  <div className="mb-4">
                    <h4 className="text-[16px] font-bold text-dark-text mb-1">Cover Photo</h4>
                    <p className="text-[14px] text-gray-text">This will be the main background for your event.</p>
                  </div>
                  <div 
                    onClick={() => !updatingCover && fileInputRef.current?.click()}
                    className={`w-full max-w-[450px] aspect-video rounded-2xl border-2 border-dashed border-border-color bg-bg-light flex flex-col items-center justify-center cursor-pointer hover:border-primary-lilac transition-all overflow-hidden relative group ${updatingCover ? 'opacity-50 cursor-wait' : ''}`}
                  >
                    {selectedEvent.coverPhotoUrl ? (
                      <>
                        <img src={selectedEvent.coverPhotoUrl} className="w-full h-full object-cover" alt="Cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white font-bold text-sm">Change Cover Photo</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-image text-4xl text-gray-text/20 mb-3"></i>
                        <span className="text-xs text-gray-text font-bold uppercase tracking-widest opacity-60">Upload Cover Image</span>
                      </>
                    )}
                    {updatingCover && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <i className="fa-solid fa-spinner fa-spin text-primary-lilac text-2xl"></i>
                      </div>
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleCoverPhotoChange}
                    accept="image/*"
                    className="hidden" 
                  />
                </div>

                {/* Event Name */}
                <div>
                  <div className="mb-4">
                    <h4 className="text-[16px] font-bold text-dark-text mb-1">Event Name</h4>
                    <p className="text-[14px] text-gray-text">It&apos;ll be used through the app and will be showed to your guests.</p>
                  </div>
                  <input 
                    type="text" 
                    defaultValue={selectedEvent.name} 
                    className="w-full max-w-[450px] p-4 rounded-xl border border-border-color bg-white outline-none focus:border-primary-lilac transition-all font-medium"
                  />
                </div>

                {/* Event Date */}
                <div>
                  <div className="mb-4">
                    <h4 className="text-[16px] font-bold text-dark-text mb-1">Event Date</h4>
                    <p className="text-[14px] text-gray-text">Set when your event is scheduled to start.</p>
                  </div>
                  <div className="relative max-w-[200px]">
                    <input 
                      type="date" 
                      defaultValue={selectedEvent.date ? new Date(selectedEvent.date).toISOString().split('T')[0] : ""}
                      className="w-full p-4 rounded-xl border border-border-color bg-white outline-none focus:border-primary-lilac transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Event Custom Link */}
                <div>
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-[16px] font-bold text-dark-text m-0">Event Slug</h4>
                    </div>
                    <p className="text-[14px] text-gray-text">Your event is accessible at this unique slug.</p>
                  </div>
                  <div className="flex max-w-[500px]">
                    <div className="px-4 py-4 border border-r-0 border-border-color bg-bg-light rounded-l-xl text-gray-text font-medium text-[14px] shrink-0">
                      /guest/
                    </div>
                    <input 
                      type="text" 
                      readOnly
                      value={selectedEvent.slug} 
                      className="flex-1 p-4 border border-border-color bg-gray-50 text-gray-400 outline-none font-medium cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border-color flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button className="btn btn-primary px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs w-full sm:w-auto">
                    Save All Changes
                  </button>
                  <button 
                    onClick={() => handleDelete(selectedEvent.id)}
                    className="text-danger font-black uppercase tracking-widest text-[11px] hover:underline bg-transparent border-none cursor-pointer py-2"
                  >
                    Delete Event
                  </button>
                </div>
              </div>
            )}

            {activeTab !== "general" && (
              <div className="py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-light-lavender flex items-center justify-center mx-auto mb-6">
                  <i className={`${tabs.find(t => t.id === activeTab)?.icon} text-3xl text-primary-lilac`}></i>
                </div>
                <h4 className="text-2xl font-black text-dark-text mb-2">{tabs.find(t => t.id === activeTab)?.name} Settings</h4>
                <p className="text-gray-text max-w-[400px] mx-auto">This section is being updated to provide you with more advanced control over your event.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsContent />
    </Suspense>
  );
}
