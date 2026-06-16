"use client";

import { useState, useEffect, useRef } from "react";
import { getEvents, deleteEvent, updateEventCoverPhoto } from "@/lib/actions/event";
import Link from "next/link";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [updatingCover, setUpdatingCover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getEvents();
      setEvents(data);
      if (data.length > 0) {
        setSelectedEventId(data[0].id);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const selectedEvent = events.find(e => e.id === selectedEventId);

  const handleCoverPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedEventId) return;

    setUpdatingCover(true);
    try {
      const formData = new FormData();
      formData.append("eventId", selectedEventId);
      formData.append("coverPhoto", file);

      const result = await updateEventCoverPhoto(formData);
      if (result.success) {
        // Update local state
        setEvents(prev => prev.map(ev => 
          ev.id === selectedEventId 
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
      const updatedEvents = events.filter(e => e.id !== id);
      setEvents(updatedEvents);
      if (id === selectedEventId && updatedEvents.length > 0) {
        setSelectedEventId(updatedEvents[0].id);
      } else if (updatedEvents.length === 0) {
        setSelectedEventId("");
        setActiveTab("events");
      }
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
    { id: "events", name: "My Events", icon: "fa-solid fa-calendar-days" },
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
        {activeTab === "general" && selectedEvent && (
          <div className="flex flex-col gap-10">
            {/* Active Event Dropdown */}
            <div>
              <div className="mb-4">
                <h4 className="text-[16px] font-bold text-dark-text mb-1">Selected Event</h4>
                <p className="text-[14px] text-gray-text">Select which event you want to manage.</p>
              </div>
              <select 
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="w-full max-w-[450px] p-4 rounded-xl border border-border-color bg-white outline-none focus:border-primary-lilac transition-all font-bold text-dark-text"
              >
                {events.map(e => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </select>
            </div>

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

            <div className="pt-6 mt-6 border-t border-border-color flex justify-between items-center">
              <button className="btn btn-primary px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs">
                Save All Changes
              </button>
              <button 
                onClick={() => handleDelete(selectedEvent.id)}
                className="text-danger font-black uppercase tracking-widest text-[11px] hover:underline bg-transparent border-none cursor-pointer"
              >
                Delete Event
              </button>
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div>
             <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-black text-dark-text m-0 tracking-tight">My Events</h3>
                <p className="text-gray-text font-medium mt-1">Manage all your created events.</p>
              </div>
              <Link href="/dashboard?new=true" className="btn btn-primary py-2 px-6 rounded-lg font-bold text-sm">
                <i className="fa-solid fa-plus mr-2"></i> New Event
              </Link>
            </div>

            {events.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {events.map((event) => (
                  <div key={event.id} className="bg-white p-6 rounded-2xl border border-border-color shadow-sm flex justify-between items-center group hover:border-primary-lilac transition-all">
                    <div className="flex gap-5 items-center">
                      <div className="w-14 h-14 bg-light-lavender rounded-xl flex items-center justify-center text-primary-lilac overflow-hidden">
                        {event.coverPhotoUrl ? (
                          <img src={event.coverPhotoUrl} className="w-full h-full object-cover" alt="Cover" />
                        ) : (
                          <i className="fa-solid fa-calendar-check text-2xl"></i>
                        )}
                      </div>
                      <div>
                        <h4 className="text-[18px] font-bold text-dark-text m-0">{event.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[12px] text-gray-text font-medium">/guest/{event.slug}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span className="text-[12px] text-gray-text font-medium">
                            {event.date ? new Date(event.date).toLocaleDateString() : "No date set"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => {
                          setSelectedEventId(event.id);
                          setActiveTab("general");
                        }}
                        className="p-3 rounded-xl bg-bg-light text-dark-text hover:bg-primary-lilac hover:text-white transition-all border-none cursor-pointer"
                        title="Edit Settings"
                      >
                        <i className="fa-solid fa-gear"></i>
                      </button>
                      <button 
                        onClick={() => handleDelete(event.id)}
                        className="p-3 rounded-xl bg-bg-light text-danger hover:bg-danger hover:text-white transition-all border-none cursor-pointer"
                        title="Delete Event"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-bg-light rounded-[2rem] border-2 border-dashed border-border-color">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <i className="fa-solid fa-calendar-plus text-3xl text-primary-lilac/30"></i>
                </div>
                <h3 className="text-xl font-bold text-dark-text">No events yet</h3>
                <p className="text-gray-text mb-6">Create your first event to start collecting photos!</p>
                <Link 
                  href="/dashboard?new=true"
                  className="btn btn-primary py-3 px-8 rounded-xl font-bold inline-block"
                >
                  Create My First Event
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab !== "general" && activeTab !== "events" && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-light-lavender flex items-center justify-center mx-auto mb-6">
              <i className={`${tabs.find(t => t.id === activeTab)?.icon} text-3xl text-primary-lilac`}></i>
            </div>
            <h4 className="text-2xl font-black text-dark-text mb-2">{tabs.find(t => t.id === activeTab)?.name} Settings</h4>
            <p className="text-gray-text max-w-[400px] mx-auto">This section is being updated to provide you with more advanced control over your event.</p>
          </div>
        )}
      </div>
    </div>
  );
}
