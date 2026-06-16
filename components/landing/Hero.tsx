import Link from "next/link";

export default function Hero() {
  return (
    <section className="container py-20 flex flex-col md:flex-row items-center justify-between gap-[60px]">
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.15] mb-6 font-extrabold tracking-tighter">
          Easily Collect Photos From Every Guest At Your <span className="text-primary-lilac">Event</span>
        </h2>
        <p className="text-xl text-gray-text mb-9 max-w-[520px] mx-auto md:mx-0">
          Never miss a memory
        </p>
        <Link
          href="/signup"
          className="btn btn-primary px-8 py-3.5 text-lg"
        >
          Create Your Event
        </Link>
      </div>

      <div className="flex-1 w-full max-w-[500px]">
        <div className="bg-white p-4 rounded-[32px] border border-border-color shadow-2xl relative">
          <div className="bg-[#191524] w-full h-[300px] md:h-[380px] rounded-2xl flex flex-col items-center justify-center text-white relative overflow-hidden group">
            <i className="fa-regular fa-image text-primary-lilac text-[3rem] mb-4 opacity-40 group-hover:scale-110 transition-transform duration-[10s]"></i>
            <span className="text-xl font-semibold tracking-tight">Live Event Dashboard Stream</span>
            
            {/* Decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary-lilac/20 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
