import Link from "next/link";

export default function HowItWorks() {
  return (
    <section className="container py-[60px]" id="how-it-works">
      <div className="flex flex-col md:flex-row items-center justify-between gap-20 mb-[120px]">
        <div className="flex-1 text-center md:text-left">
          <span className="text-primary-lilac font-bold uppercase text-[0.85rem] tracking-wider mb-3 block">Step 01</span>
          <h3 className="text-[2.25rem] font-extrabold mb-4 tracking-tight leading-tight">Create your digital album setup</h3>
          <p className="text-gray-text text-[1.05rem] mb-6">Customize your custom web app page interface settings. Brand it to match your special wedding, birthday celebration or corporate summit theme design perfectly.</p>
          <Link href="/pricing" className="btn btn-primary px-5 py-2.5 rounded-[30px] font-semibold text-[15px]">
            Get Started Now
          </Link>
        </div>
        <div className="flex-1 w-full">
          <div className="bg-light-lavender h-[320px] rounded-xl flex items-center justify-center text-dark-lilac font-semibold border border-dashed border-border-color">
            Dashboard Setup Console Matrix
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-20 mb-[120px]">
        <div className="flex-1 text-center md:text-left">
          <span className="text-primary-lilac font-bold uppercase text-[0.85rem] tracking-wider mb-3 block">Step 02</span>
          <h3 className="text-[2.25rem] font-extrabold mb-4 tracking-tight leading-tight">Share it directly with your guests</h3>
          <p className="text-gray-text text-[1.05rem] mb-6">Print cards out containing your specific unique room QR code or share direct system links. Guests point their native camera setups to begin connecting access points.</p>
          <ul className="list-none p-0 flex flex-col gap-3 text-center md:text-left">
            <li className="relative pl-7 text-[15px] flex items-start gap-3 justify-center md:justify-start">
              <span className="text-primary-lilac font-extrabold">✓</span>
              <span>No app store marketplace downloads needed ever</span>
            </li>
            <li className="relative pl-7 text-[15px] flex items-start gap-3 justify-center md:justify-start">
              <span className="text-primary-lilac font-extrabold">✓</span>
              <span>Supports any modern iOS or Android smart device browser</span>
            </li>
            <li className="relative pl-7 text-[15px] flex items-start gap-3 justify-center md:justify-start">
              <span className="text-primary-lilac font-extrabold">✓</span>
              <span>Fast instant connection canvas speeds</span>
            </li>
          </ul>
        </div>
        <div className="flex-1 w-full">
          <div className="bg-light-lavender h-[320px] rounded-xl flex items-center justify-center text-dark-lilac font-semibold border border-dashed border-border-color">
            QR Card System Graphic Mockup
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-20">
        <div className="flex-1 text-center md:text-left">
          <span className="text-primary-lilac font-bold uppercase text-[0.85rem] tracking-wider mb-3 block">Step 03</span>
          <h3 className="text-[2.25rem] font-extrabold mb-4 tracking-tight leading-tight">Display memories live at the venue</h3>
          <p className="text-gray-text text-[1.05rem] mb-6">Project incoming uploads onto a digital wall setup or projection configuration screen during event progress dynamically keeping attendees highly engaged continuously.</p>
        </div>
        <div className="flex-1 w-full">
          <div className="bg-light-lavender h-[320px] rounded-xl flex items-center justify-center text-dark-lilac font-semibold border border-dashed border-border-color">
            Live TV Stream Simulation Display
          </div>
        </div>
      </div>
    </section>
  );
}
