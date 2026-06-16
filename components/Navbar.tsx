"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center px-10 py-6 border-b border-border-color sticky top-0 bg-white/95 backdrop-blur-md z-[1000]">
      <Link href="/" className="flex items-center gap-2 no-underline">
        <span className="text-2xl font-black text-dark-text tracking-tighter">EverSnapz<span className="text-primary-lilac">.</span></span>
      </Link>

      <nav id="main-nav" className="hidden md:flex items-center gap-12">
        <div className="relative group inline-block">
          <div className="flex items-center gap-1.5 cursor-pointer text-gray-text font-medium text-[15px] group-hover:text-primary-lilac transition-colors py-2">
            Use Cases <i className="fa-solid fa-chevron-down text-[10px]"></i>
          </div>
          {/* Invisible bridge for hover continuity */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 hidden group-hover:block z-[1010]">
            <div className="bg-white w-[280px] rounded-xl border border-border-color shadow-[0_10px_30px_rgba(145,97,242,0.1)] p-3 grid grid-cols-1 gap-1">
              <Link href="/#use-cases" className="flex items-start gap-3 p-2.5 rounded-lg no-underline text-dark-text hover:bg-light-lavender transition-colors">
                <span className="text-lg pt-0.5">💍</span>
                <div className="dropdown-info">
                  <h5 className="text-sm font-semibold mb-0.5">Weddings</h5>
                  <p className="text-xs text-gray-text leading-tight">Capture every photo & video of your big day.</p>
                </div>
              </Link>
              <Link href="/#use-cases" className="flex items-start gap-3 p-2.5 rounded-lg no-underline text-dark-text hover:bg-light-lavender transition-colors">
                <span className="text-lg pt-0.5">🎈</span>
                <div className="dropdown-info">
                  <h5 className="text-sm font-semibold mb-0.5">Birthdays</h5>
                  <p className="text-xs text-gray-text leading-tight">Celebrate every moment of your birthday.</p>
                </div>
              </Link>
              <Link href="/#use-cases" className="flex items-start gap-3 p-2.5 rounded-lg no-underline text-dark-text hover:bg-light-lavender transition-colors">
                <span className="text-lg pt-0.5">🎉</span>
                <div className="dropdown-info">
                  <h5 className="text-sm font-semibold mb-0.5">Parties</h5>
                  <p className="text-xs text-gray-text leading-tight">Take your party to the next level seamlessly.</p>
                </div>
              </Link>
              <Link href="/#use-cases" className="flex items-start gap-3 p-2.5 rounded-lg no-underline text-dark-text hover:bg-light-lavender transition-colors">
                <span className="text-lg pt-0.5">🎙️</span>
                <div className="dropdown-info">
                  <h5 className="text-sm font-semibold mb-0.5">Conferences</h5>
                  <p className="text-xs text-gray-text leading-tight">Level up conference and attendee engagement.</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <Link href="/pricing" className="no-underline text-gray-text font-medium text-[15px] hover:text-primary-lilac transition-colors">
          Pricing
        </Link>
        <Link href="/reviews" className="no-underline text-gray-text font-medium text-[15px] hover:text-primary-lilac transition-colors">
          Wall of Love
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link href="/login" className="btn btn-outline">
          Log in
        </Link>
        <Link href="/signup" className="btn btn-primary">
          Get Started
        </Link>
      </div>
    </header>
  );
}
