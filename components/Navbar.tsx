"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Click outside to close mobile menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Disable scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="flex justify-between items-center px-6 md:px-10 py-4 md:py-6 border-b border-border-color sticky top-0 bg-white/95 backdrop-blur-md z-[1000]">
      <Link href="/" className="flex items-center gap-2 no-underline">
        <span className="text-2xl font-black text-dark-text tracking-tighter">EverSnapz<span className="text-primary-lilac">.</span></span>
      </Link>

      {/* Desktop Navigation */}
      <nav id="main-nav" className="hidden lg:flex items-center lg:gap-8 xl:gap-12">
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

      {/* Desktop Auth Actions */}
      <div className="hidden lg:flex items-center gap-4">
        <Link href="/login" className="btn btn-outline">
          Log in
        </Link>
        <Link href="/signup" className="btn btn-primary">
          Get Started
        </Link>
      </div>

      {/* Hamburger Menu Button */}
      <button
        ref={hamburgerRef}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full hover:bg-bg-light border border-border-color text-dark-text transition-colors z-[1100] cursor-pointer"
        aria-label="Toggle Menu"
      >
        <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark text-lg' : 'fa-bars text-sm'}`}></i>
      </button>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-dark-text/40 backdrop-blur-sm z-[1050] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Mobile Menu Sidebar / Drawer */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-white h-screen border-l border-border-color z-[1060] p-6 shadow-2xl flex flex-col transition-all duration-300 lg:hidden ${isMobileMenuOpen ? "translate-x-0 visible opacity-100" : "translate-x-full invisible opacity-0"
          }`}
      >
        {/* Top brand */}
        <div className="flex justify-between items-center mb-8 border-b border-border-color pb-4">
          <Link href="/" className="no-underline" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="text-xl font-black text-dark-text tracking-tighter">EverSnapz<span className="text-primary-lilac">.</span></span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-5 flex-1 overflow-y-auto pr-1">
          {/* Accordion Use Cases */}
          <div>
            <button
              onClick={() => setIsUseCasesOpen(!isUseCasesOpen)}
              className="w-full flex justify-between items-center text-left py-2 font-bold text-dark-text border-none bg-transparent cursor-pointer text-lg group"
            >
              <span>Use Cases</span>
              <i className={`fa-solid fa-chevron-down text-xs text-gray-text group-hover:text-primary-lilac transition-transform ${isUseCasesOpen ? 'rotate-180' : ''}`}></i>
            </button>

            <div className={`pl-4 mt-2 flex flex-col gap-3.5 border-l-2 border-border-color overflow-hidden transition-all duration-300 ${isUseCasesOpen ? "max-h-[200px] opacity-100 py-1" : "max-h-0 opacity-0 py-0 pointer-events-none"
              }`}>
              <Link
                href="/#use-cases"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 no-underline text-gray-text hover:text-primary-lilac font-medium text-[15px]"
              >
                <span>💍</span> Weddings
              </Link>
              <Link
                href="/#use-cases"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 no-underline text-gray-text hover:text-primary-lilac font-medium text-[15px]"
              >
                <span>🎈</span> Birthdays
              </Link>
              <Link
                href="/#use-cases"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 no-underline text-gray-text hover:text-primary-lilac font-medium text-[15px]"
              >
                <span>🎉</span> Parties
              </Link>
              <Link
                href="/#use-cases"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 no-underline text-gray-text hover:text-primary-lilac font-medium text-[15px]"
              >
                <span>🎙️</span> Conferences
              </Link>
            </div>
          </div>

          <Link
            href="/pricing"
            onClick={() => setIsMobileMenuOpen(false)}
            className="no-underline py-2 font-bold text-dark-text text-lg hover:text-primary-lilac transition-colors"
          >
            Pricing
          </Link>

          <Link
            href="/reviews"
            onClick={() => setIsMobileMenuOpen(false)}
            className="no-underline py-2 font-bold text-dark-text text-lg hover:text-primary-lilac transition-colors"
          >
            Wall of Love
          </Link>
        </nav>

        {/* Auth actions at the bottom */}
        <div className="flex flex-col gap-3.5 border-t border-border-color pt-6 mt-auto">
          <Link
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn btn-outline w-full py-3 rounded-xl font-bold justify-center"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn btn-primary w-full py-3 rounded-xl font-bold justify-center"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
