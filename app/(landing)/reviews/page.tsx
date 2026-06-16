import Link from "next/link";

const reviews = [
  {
    text: "Your photographer can’t be everywhere - this gave us so many angles and candid photos we wouldn’t have gotten (500+)! And no waiting to see it",
    avatar: "SJ",
    name: "Stacy J.",
    country: "🇺🇸 United States"
  },
  {
    text: "We tested a few photo sharing apps for our upcoming company event and eventually went with EverSnapz. Everyone liked it and we got ton of good feedback from all our participants!",
    avatar: "DM",
    name: "Dana M.",
    country: "🇨🇦 Canada"
  },
  {
    text: "EverSnapz made our wedding an unforgettable experience! The photo slideshow was a hit among our guests, who loved being able to share their photos and videos.",
    avatar: "RW",
    name: "Rushi's Wedding",
    country: "🇸🇬 Singapore"
  },
  {
    text: "The setup was extremely straightforward, and it kept guests engaged through the entire reception. Strongly recommended for any milestone event.",
    avatar: "MK",
    name: "Marcus K.",
    country: "🇬🇧 United Kingdom"
  },
  {
    text: "No one wants to navigate app stores during a celebration. The browser framework upload is pure genius. Simple, accessible, and fast.",
    avatar: "JL",
    name: "Jessica L.",
    country: "🇦🇺 Australia"
  }
];

export default function ReviewsPage() {
  return (
    <div className="bg-white">
      <div className="bg-bg-light border-b border-border-color py-3.5">
        <div className="container">
          <Link href="/" className="text-gray-text no-underline font-semibold text-sm inline-flex items-center gap-2 hover:text-primary-lilac transition-colors">
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </Link>
        </div>
      </div>

      <section className="bg-bg-light section-padding border-t border-border-color min-h-screen">
        <div className="container text-center">
          <h3 className="text-[2.5rem] font-extrabold tracking-tight mb-3">Don’t just take our word for it</h3>
          <p className="text-gray-text text-[1.15rem] max-w-[700px] mx-auto mb-[60px]">We are honored to help thousands of hosts worldwide to make their events more memorable.</p>

          <div className="flex flex-col items-center gap-2 mb-12">
            <div className="text-[#ffb100] text-xl flex gap-1">
              <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
            </div>
            <div className="text-[15px] text-gray-text font-medium">Rated <strong>4.7</strong> based on 500+ reviews.</div>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white border border-border-color rounded-xl p-6 break-inside-avoid shadow-sm text-left">
                <p className="text-sm text-dark-text mb-4 italic leading-relaxed font-serif">"{review.text}"</p>
                <div className="flex items-center gap-3 border-t border-border-color pt-4">
                  <div className="w-10 h-10 rounded-full bg-light-lavender flex items-center justify-center font-bold text-dark-lilac text-sm">
                    {review.avatar}
                  </div>
                  <div className="text-left">
                    <h5 className="text-sm font-bold m-0">{review.name}</h5>
                    <span className="text-xs text-gray-text block">{review.country}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
