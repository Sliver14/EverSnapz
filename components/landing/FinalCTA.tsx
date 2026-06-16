import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-dark-text section-padding-large text-white text-center">
      <div className="container">
        <h3 className="text-[2.5rem] md:text-[3.5rem] font-extrabold mb-8 tracking-tighter leading-tight">
          Ready to capture every <span className="text-primary-lilac">moment</span>?
        </h3>
        <p className="text-xl opacity-70 mb-12 max-w-[700px] mx-auto leading-relaxed">
          Join 12,000+ hosts who have transformed their events with EverSnapz. Setup takes less than 2 minutes.
        </p>
        <div className="flex flex-wrap gap-6 justify-center">
          <Link
            href="/signup"
            className="btn btn-primary px-12 py-5 text-xl"
          >
            Create Your Event
          </Link>
          <Link
            href="/guest-flow-demo"
            className="btn btn-outline px-12 py-5 text-xl text-white border-white/20 hover:border-primary-lilac hover:bg-white/10"
          >
            Try Demo View
          </Link>
        </div>
      </div>
    </section>
  );
}
