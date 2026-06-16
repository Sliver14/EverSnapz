"use client";

import { useState, Suspense } from "react";
import Link from "next/link";

function MediaContent() {
  const [activeTab, setActiveTab] = useState("moderation");

  const tabs = [
    { id: "moderation", name: "Moderation", icon: "fa-solid fa-shield-check" },
    { id: "qr", name: "QR & Sharing", icon: "fa-solid fa-qrcode" },
    { id: "settings", name: "Settings", icon: "fa-solid fa-gear" },
  ];

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h2 className="text-[32px] font-extrabold text-dark-text tracking-tighter m-0 leading-tight">Photos & Videos</h2>
          <p className="text-gray-text m-0 mt-1">Manage and moderate all media uploaded to your event.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/guest/j-s-wedding" className="btn btn-outline py-2 px-4 rounded-lg font-bold text-sm shadow-sm">
            <i className="fa-solid fa-eye mr-2 opacity-40"></i> Guest View
          </Link>
          <Link href="/live-wall" className="btn btn-primary py-2 px-4 rounded-lg font-bold text-sm shadow-lg shadow-primary-lilac/10">
            <i className="fa-solid fa-tv mr-2"></i> Live Wall
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border-color shadow-sm overflow-hidden min-h-[600px] flex flex-col">
        {/* Tabs Header */}
        <div className="flex border-b border-border-color px-8 bg-white sticky top-0 z-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-5 text-[14px] font-bold transition-all relative shrink-0 ${
                activeTab === tab.id 
                  ? "text-primary-lilac" 
                  : "text-gray-text opacity-40 hover:opacity-100"
              }`}
            >
              {tab.name}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-lilac rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-8 animate-in fade-in duration-500">
          {activeTab === "moderation" && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h4 className="text-[18px] font-black text-dark-text m-0 tracking-tight">Pending Approval</h4>
                  <p className="text-[13px] text-gray-text font-medium mt-1">12 items waiting for your review</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-lg border border-border-color bg-white text-gray-600 font-bold text-[12px] hover:bg-bg-light transition-colors">Reject All</button>
                  <button className="px-4 py-2 rounded-lg bg-primary-lilac text-white font-bold text-[12px] hover:bg-dark-lilac transition-colors shadow-lg shadow-primary-lilac/10">Approve All</button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border-color bg-bg-light flex items-center justify-center group cursor-pointer transition-all hover:border-primary-lilac">
                    <i className="fa-regular fa-image text-3xl opacity-10 group-hover:scale-110 transition-transform"></i>
                    
                    {/* Action Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5">
                      <button className="flex-1 h-8 rounded-lg bg-success text-white border-none flex items-center justify-center hover:scale-[1.05] active:scale-95 transition-all">
                        <i className="fa-solid fa-check text-xs"></i>
                      </button>
                      <button className="flex-1 h-8 rounded-lg bg-danger text-white border-none flex items-center justify-center hover:scale-[1.05] active:scale-95 transition-all">
                        <i className="fa-solid fa-xmark text-xs"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "qr" && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-[500px] mx-auto py-20">
              <div className="w-24 h-24 bg-light-lavender rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-primary-lilac/5 border border-primary-lilac/10">
                <i className="fa-solid fa-qrcode text-4xl text-primary-lilac"></i>
              </div>
              <h4 className="text-2xl font-black mb-3 tracking-tight">QR Code & Print Bundle</h4>
              <p className="text-[15px] text-gray-text leading-relaxed mb-10 font-medium">
                Download high-resolution QR codes and professional printing templates for your tables to encourage guest participation.
              </p>
              <button className="btn btn-primary px-10 py-4 shadow-xl shadow-primary-lilac/20 rounded-xl font-black uppercase tracking-widest text-xs">
                Generate Print Bundle
              </button>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-[600px] animate-in slide-in-from-top-4 duration-500">
              <div className="mb-10">
                <h4 className="text-[16px] font-bold text-dark-text mb-1">Moderation Mode</h4>
                <p className="text-[14px] text-gray-text mb-4">Control how photos and videos appear on your live wall.</p>
                <div className="flex flex-col gap-3">
                  {[
                    { id: "auto", label: "Approve all automatically", desc: "Fastest way to get photos live." },
                    { id: "manual", label: "Manual approval (recommended)", desc: "You review everything before it goes live." }
                  ].map((opt) => (
                    <div 
                      key={opt.id}
                      className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                        opt.id === "manual" 
                          ? "border-primary-lilac bg-light-lavender/30 shadow-lg shadow-primary-lilac/5" 
                          : "border-border-color bg-white hover:border-primary-lilac/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-dark-text">{opt.label}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${opt.id === "manual" ? "border-primary-lilac" : "border-gray-300"}`}>
                          {opt.id === "manual" && <div className="w-2.5 h-2.5 rounded-full bg-primary-lilac"></div>}
                        </div>
                      </div>
                      <p className="text-[13px] text-gray-text font-medium m-0">{opt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button className="btn btn-primary px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs">
                Save Media Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MediaPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MediaContent />
    </Suspense>
  );
}
