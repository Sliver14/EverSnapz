"use client";

import { useState, useEffect, Suspense } from "react";
import { getEvents, deleteEvent } from "@/lib/actions/event";
import Link from "next/link";
import { useRouter } from "next/navigation";

function EventsListContent() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const data = await getEvents();
      setEvents(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;
    
    try {
      await deleteEvent(id);
      setEvents(events.filter(e => e.id !== id));
      router.refresh();
    } catch (error) {
      console.error("Failed to delete event:", error);
      alert("Failed to delete event.");
    }
  };

  if (loading) return <div className="py-20 text-center font-bold text-gray-text">Loading events...</div>;

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-[24px] sm:text-[32px] font-extrabold text-dark-text tracking-tighter m-0 leading-tight">My Events</h2>
          <p className="text-gray-text font-medium mt-1">Manage all your created events and their settings.</p>
        </div>
        <Link href="/dashboard?new=true" className="btn btn-primary py-2 px-6 rounded-lg font-bold text-sm shrink-0">
          <i className="fa-solid fa-plus mr-2"></i> New Event
        </Link>
      </div>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white p-6 rounded-2xl border border-border-color shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-primary-lilac transition-all">
              <div className="flex flex-row gap-4 sm:gap-5 items-center w-full min-w-0">
                <div className="w-16 h-16 bg-light-lavender rounded-xl flex items-center justify-center text-primary-lilac overflow-hidden shadow-sm shrink-0">
                  {event.coverPhotoUrl ? (
                    <img src={event.coverPhotoUrl} className="w-full h-full object-cover" alt="Cover" />
                  ) : (
                    <i className="fa-solid fa-calendar-check text-2xl opacity-40"></i>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[18px] font-black text-dark-text m-0 truncate">{event.name}</h4>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                    <span className="text-[12px] text-gray-text font-bold truncate block max-w-[150px] sm:max-w-none">/guest/{event.slug}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:inline-block"></span>
                    <span className="text-[12px] text-gray-text font-bold">
                      {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "No date set"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end sm:justify-start border-t sm:border-t-0 pt-4 sm:pt-0 shrink-0">
                <Link 
                  href={`/dashboard?eventId=${event.id}`}
                  className="p-3 rounded-xl bg-bg-light text-dark-text hover:bg-primary-lilac hover:text-white transition-all border-none cursor-pointer flex items-center justify-center"
                  title="Dashboard"
                >
                  <i className="fa-solid fa-chart-line"></i>
                </Link>
                <Link 
                  href={`/dashboard/settings?eventId=${event.id}`}
                  className="p-3 rounded-xl bg-bg-light text-dark-text hover:bg-primary-lilac hover:text-white transition-all border-none cursor-pointer flex items-center justify-center"
                  title="Settings"
                >
                  <i className="fa-solid fa-gear"></i>
                </Link>
                <button 
                  onClick={() => handleDelete(event.id)}
                  className="p-3 rounded-xl bg-bg-light text-danger hover:bg-danger hover:text-white transition-all border-none cursor-pointer flex items-center justify-center"
                  title="Delete Event"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-border-color shadow-sm">
          <div className="w-20 h-20 bg-bg-light rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
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
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<div>Loading Events...</div>}>
      <EventsListContent />
    </Suspense>
  );
}
