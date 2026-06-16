"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", name: "General", icon: "fa-solid fa-sliders" },
    { id: "appearance", name: "Appearance", icon: "fa-solid fa-paint-roller" },
    { id: "photoWall", name: "Photo Wall", icon: "fa-solid fa-tv" },
    { id: "moderation", name: "Moderation", icon: "fa-solid fa-shield-halved" },
    { id: "collaborators", name: "Collaborators", icon: "fa-solid fa-users" },
  ];

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
        {activeTab === "general" && (
          <div className="flex flex-col gap-10">
            {/* Event Name */}
            <div>
              <div className="mb-4">
                <h4 className="text-[16px] font-bold text-dark-text mb-1">Event Name</h4>
                <p className="text-[14px] text-gray-text">It&apos;ll be used through the app and will be showed to your guests.</p>
              </div>
              <input 
                type="text" 
                defaultValue="J&S Wedding" 
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
                  defaultValue="2026-06-15"
                  className="w-full p-4 rounded-xl border border-border-color bg-white outline-none focus:border-primary-lilac transition-all font-medium appearance-none"
                />
              </div>
            </div>

            {/* Event Type */}
            <div>
              <div className="mb-4">
                <h4 className="text-[16px] font-bold text-dark-text mb-1">Event Type</h4>
                <p className="text-[14px] text-gray-text">We&apos;ll adjust the experience according to your event type.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "💍 Wedding", value: "wedding" },
                  { label: "🎉 Party", value: "party" },
                  { label: "🎤 Conference", value: "conference" },
                  { label: "🎂 Birthday", value: "birthday" },
                  { label: "❓ Other", value: "other" }
                ].map((type) => (
                  <button
                    key={type.value}
                    className={`px-6 py-3 rounded-xl border font-bold text-[14px] transition-all ${
                      type.value === "wedding"
                        ? "bg-primary-lilac text-white border-primary-lilac shadow-lg shadow-primary-lilac/20"
                        : "bg-white text-gray-text border-border-color hover:border-primary-lilac hover:text-primary-lilac"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Event Custom Link */}
            <div>
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-[16px] font-bold text-dark-text m-0">Event Custom Link</h4>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary-lilac/10 text-primary-lilac text-[10px] font-black uppercase tracking-widest border border-primary-lilac/20">
                    <i className="fa-solid fa-star text-[8px]"></i> Pro
                  </div>
                  <span className="text-[10px] font-bold text-primary-lilac uppercase tracking-widest cursor-pointer hover:underline">Upgrade</span>
                </div>
                <p className="text-[14px] text-gray-text">Choose a unique link ending to easily share your event with guests.</p>
              </div>
              <div className="flex max-w-[500px]">
                <div className="px-4 py-4 border border-r-0 border-border-color bg-bg-light rounded-l-xl text-gray-text font-medium text-[14px] shrink-0">
                  app.eversnapz.com/
                </div>
                <input 
                  type="text" 
                  disabled
                  defaultValue="j-s-wedding" 
                  className="flex-1 p-4 border border-border-color bg-gray-50 text-gray-400 outline-none font-medium cursor-not-allowed"
                />
                <button disabled className="px-6 border border-l-0 border-border-color bg-gray-50 text-gray-300 rounded-r-xl font-bold uppercase tracking-widest text-[12px] cursor-not-allowed">
                  Save
                </button>
              </div>
              <div className="mt-3">
                <button disabled className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-color bg-white text-gray-400 font-bold text-[12px] cursor-not-allowed">
                  <i className="fa-solid fa-wand-magic-sparkles text-primary-lilac opacity-30"></i>
                  Suggest
                </button>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border-color flex justify-between items-center">
              <button className="btn btn-primary px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs">
                Save All Changes
              </button>
              <button className="text-danger font-black uppercase tracking-widest text-[11px] hover:underline bg-transparent border-none cursor-pointer">
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
      </div>
    </div>
  );
}
