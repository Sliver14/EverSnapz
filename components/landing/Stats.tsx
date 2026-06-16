import Link from "next/link";

export default function Stats() {
  return (
    <section className="bg-bg-light py-[60px] border-t border-border-color">
      <div className="container flex flex-wrap justify-around gap-5 text-center">
        <div>
          <div className="text-[2.5rem] font-extrabold text-primary-lilac leading-tight">1.2M+</div>
          <div className="text-gray-text font-semibold">Events Hosted</div>
        </div>
        <div>
          <div className="text-[2.5rem] font-extrabold text-primary-lilac leading-tight">37M+</div>
          <div className="text-gray-text font-semibold">EverSnapz Captured</div>
        </div>
        <div>
          <div className="text-[2.5rem] font-extrabold text-primary-lilac leading-tight">150+</div>
          <div className="text-gray-text font-semibold">Countries</div>
        </div>
      </div>
    </section>
  );
}
