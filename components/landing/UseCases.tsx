import Link from "next/link";

export default function UseCases() {
  const cases = [
    { emoji: "💍", title: "Weddings", desc: "Collect every moment of it", href: "/wedding-photo-sharing-app" },
    { emoji: "🎉", title: "Parties & Celebrations", desc: "Share photos & have fun", href: "/party-photo-sharing" },
    { emoji: "🎈", title: "Birthdays", desc: "Celebrate with your loved ones", href: "/birthday-party-photo-sharing-app" },
    { emoji: "🎙️", title: "Conferences & Public Events", desc: "Engage with your audience", href: "/conferences-photo-sharing" },
    { emoji: "🍾", title: "Corporate & Company Events", desc: "Connect with your people", href: "/corporate-event-photo-sharing-app" },
    { emoji: "🦄", title: "Whatever Event!", desc: "We got you covered", href: "/signup" },
  ];

  return (
    <section className="container py-[60px] pb-[100px]" id="use-cases">
      <h3 className="text-center text-[2.5rem] font-extrabold tracking-tight mb-3">Built for Any Occasion</h3>
      <p className="text-center text-gray-text text-[1.15rem] max-w-[700px] mx-auto mb-[60px]">Tailored spaces built to host every special celebration type beautifully.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((item, index) => (
          <div key={index} className="border border-border-color p-8 rounded-xl text-center hover:border-primary-lilac transition-colors group">
            <span className="text-[2.5rem] block mb-3 group-hover:scale-110 transition-transform">{item.emoji}</span>
            <h4 className="text-lg font-bold mb-2 text-dark-text">{item.title}</h4>
            <p className="text-sm text-gray-text mb-4">{item.desc}</p>
            <Link href={item.href} className="text-primary-lilac font-bold text-sm no-underline hover:underline">
              Learn More →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
