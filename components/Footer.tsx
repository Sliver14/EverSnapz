import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#120e1a] text-[#b3a9c9] section-padding pb-12 text-sm">
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20 text-center sm:text-left">
        <div className="flex flex-col gap-4">
          <h4 className="text-white text-xl font-extrabold">
            EverSnapz<span className="text-primary-lilac">.</span>
          </h4>
          <p className="leading-relaxed">
            Bringing event experiences alive through clean, real-time social media gathering tools.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-semibold">Product</h4>
          <ul className="list-none flex flex-col gap-2.5 p-0">
            <li><Link href="/" className="text-[#b3a9c9] no-underline hover:text-white transition-colors">Features</Link></li>
            <li><Link href="/" className="text-[#b3a9c9] no-underline hover:text-white transition-colors">Live TV Streams</Link></li>
            <li><Link href="/pricing" className="text-[#b3a9c9] no-underline hover:text-white transition-colors">Pricing Engine</Link></li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-semibold">Use Cases</h4>
          <ul className="list-none flex flex-col gap-2.5 p-0">
            <li><Link href="/" className="text-[#b3a9c9] no-underline hover:text-white transition-colors">Weddings Hub</Link></li>
            <li><Link href="/" className="text-[#b3a9c9] no-underline hover:text-white transition-colors">Corporate Galas</Link></li>
            <li><Link href="/" className="text-[#b3a9c9] no-underline hover:text-white transition-colors">Birthday Systems</Link></li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-semibold">Legal</h4>
          <ul className="list-none flex flex-col gap-2.5 p-0">
            <li><Link href="#" className="text-[#b3a9c9] no-underline hover:text-white transition-colors">Privacy Framework</Link></li>
            <li><Link href="#" className="text-[#b3a9c9] no-underline hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="text-[#b3a9c9] no-underline hover:text-white transition-colors">Refund Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto text-center border-t border-[#231b30] pt-6 text-xs opacity-80">
        <p>&copy; 2026 EverSnapz Platform Systems Architecture. All rights reserved.</p>
      </div>
    </footer>
  );
}
