import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="bg-white">
      <div className="bg-bg-light border-b border-border-color py-3.5">
        <div className="container">
          <Link href="/" className="text-gray-text no-underline font-semibold text-sm inline-flex items-center gap-2 hover:text-primary-lilac transition-colors">
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </Link>
        </div>
      </div>
      
      <section className="section-padding px-6 md:px-10">
        <div className="container">
          <div className="text-center mb-16">
            <h3 className="text-[2.5rem] font-extrabold tracking-tight mb-3">Plans & Pricing</h3>
            <p className="text-gray-text text-[1.15rem] max-w-[700px] mx-auto mb-16 leading-relaxed font-medium">Choose the plan that fits best to your event size and audience scope.</p>
            <div className="mb-12">
              <div className="bg-light-lavender border-2 border-border-color py-5 px-10 rounded-full inline-flex items-center gap-4 text-lg shadow-xl font-bold">
                <span>✅ <strong>Money Back Guarantee.</strong> If you don&apos;t use it, get a refund under our <Link href="#" className="text-dark-lilac font-black no-underline hover:underline underline-offset-4">Fair Policy</Link>.</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-primary-lilac to-dark-lilac text-white font-black py-3 px-8 rounded-full text-xs inline-block tracking-[0.2em] shadow-2xl uppercase">🔥 50% OFF ON ALL PLANS</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center my-12">
            {/* Free Plan */}
            <div className="card !p-8 border-none shadow-[0_30px_60px_-12px_rgba(0,0,0,0.1)] hover:shadow-2xl hover:-translate-y-2">
              <div className="text-2xl font-black text-dark-text mb-2">Free</div>
              <div className="text-[3rem] font-extrabold text-dark-text mb-1 leading-none"><sup>$</sup>0</div>
              <div className="text-xs font-bold text-gray-text uppercase tracking-widest mb-6">No credit card required</div>
              <p className="text-[15px] text-gray-text mb-8 leading-relaxed">Great for birthdays, family gatherings and other small alternative celebrations.</p>
              <ul className="list-none p-0 flex flex-col gap-4 mb-10">
                {[
                  "Up to 100 uploads",
                  "Unlimited guests & participants",
                  "Uploads are saved for 7 days",
                  "Basic customization options",
                  "Active for 24 hours",
                  "All uploads saved in good quality"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-[15px] text-dark-text font-medium">
                    <span className="text-success font-bold text-lg">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/signup?plan=free" className="btn btn-outline w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm border-2">
                Create Free Event
              </Link>
            </div>

            {/* Plus Plan */}
            <div className="card !p-8 border-none shadow-[0_30px_60px_-12px_rgba(0,0,0,0.1)] hover:shadow-2xl hover:-translate-y-2">
              <div className="text-2xl font-black text-dark-text mb-2">Plus</div>
              <div className="text-[3rem] font-extrabold text-dark-text mb-1 leading-none"><sup>$</sup>39 <span className="text-[1.5rem] line-through opacity-30 ml-2">$79</span></div>
              <div className="text-xs font-bold text-gray-text uppercase tracking-widest mb-6">One-time flat setup fee</div>
              <p className="text-[15px] text-gray-text mb-8 leading-relaxed">Perfect for small weddings, celebrations & other mid-size structured events.</p>
              <ul className="list-none p-0 flex flex-col gap-4 mb-10">
                {[
                  "Up to 500 uploads",
                  "Unlimited guests & participants",
                  "Uploads are saved for 3 months",
                  "Better customization features",
                  "Active for 1 month",
                  "All uploads saved in High-Quality",
                  "Download all photos & videos"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-[15px] text-dark-text font-medium">
                    <span className="text-success font-bold text-lg">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/signup?plan=plus" className="btn btn-outline w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm border-2 hover:bg-light-lavender">
                Select Plus Plan
              </Link>
            </div>

            {/* Pro Plan (Popular) */}
            <div className="card !p-8 border-4 border-primary-lilac shadow-[0_50px_100px_-20px_rgba(145,97,242,0.3)] scale-105 z-10 hover:-translate-y-3 relative">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-lilac to-dark-lilac text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl">🔥 Most Popular</div>
              <div className="text-2xl font-black text-dark-text mb-2">Pro</div>
              <div className="text-[3rem] font-extrabold text-dark-text mb-1 leading-none"><sup>$</sup>99 <span className="text-[1.5rem] line-through opacity-30 ml-2">$199</span></div>
              <div className="text-xs font-bold text-gray-text uppercase tracking-widest mb-6">One-time flat setup fee</div>
              <p className="text-[15px] text-gray-text mb-8 leading-relaxed">The ultimate choice for large-scale weddings, company parties & conferences.</p>
              <ul className="list-none p-0 flex flex-col gap-4 mb-10">
                {[
                  "Unlimited uploads",
                  "Unlimited guests & participants",
                  "Uploads are saved for 1 year",
                  "Best-in-class customization",
                  "Active for 1 year",
                  "Original resolution downloads",
                  "Real-time live slideshow",
                  "Priority support line"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-[15px] text-dark-text font-medium">
                    <span className="text-success font-bold text-lg">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/signup?plan=pro" className="btn btn-primary w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm bg-primary-lilac text-white shadow-[0_20px_40px_-10px_rgba(145,97,242,0.5)]">
                Select Pro Plan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
