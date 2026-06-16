export default function ComparisonTable() {
  return (
    <section className="container section-padding border-t border-border-color">
      <div className="text-center mb-16">
        <h2 className="text-[2.5rem] font-extrabold tracking-tight mb-3">
          We take event photo sharing <span className="text-primary-lilac italic">seriously</span>
        </h2>
        <p className="text-gray-text text-[1.15rem] max-w-[700px] mx-auto mb-[60px] leading-relaxed font-medium">Don&apos;t settle for less — ensure a seamless and easy event experience for you and your guests.</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left bg-white rounded-[2.5rem] overflow-hidden border border-border-color shadow-2xl">
          <thead>
            <tr className="bg-bg-light">
              <th className="p-6 md:p-8 text-lg border-b-2 border-border-color font-black">Benefit</th>
              <th className="p-6 md:p-8 text-lg text-primary-lilac border-b-2 border-border-color font-black bg-primary-lilac/5 text-center">EverSnapz</th>
              <th className="p-6 md:p-8 text-lg text-gray-text border-b-2 border-border-color font-black text-center">Old-School Apps</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border-color hover:bg-gray-50/50 transition-colors group">
              <td className="p-6 md:p-8 font-black text-dark-text text-base md:text-lg">Effortless and smooth experience</td>
              <td className="p-6 md:p-8 text-success text-2xl bg-primary-lilac/5 text-center"><i className="fa-solid fa-circle-check"></i></td>
              <td className="p-6 md:p-8 text-danger text-2xl text-center opacity-20 group-hover:opacity-100 transition-opacity"><i className="fa-solid fa-circle-xmark"></i></td>
            </tr>
            <tr className="border-b border-border-color hover:bg-gray-50/50 transition-colors group">
              <td className="p-6 md:p-8 font-black text-dark-text text-base md:text-lg">Beautifully designed digital albums</td>
              <td className="p-6 md:p-8 text-success text-2xl bg-primary-lilac/5 text-center"><i className="fa-solid fa-circle-check"></i></td>
              <td className="p-6 md:p-8 text-danger text-2xl text-center opacity-20 group-hover:opacity-100 transition-opacity"><i className="fa-solid fa-circle-xmark"></i></td>
            </tr>
            <tr className="border-b border-border-color hover:bg-gray-50/50 transition-colors group">
              <td className="p-6 md:p-8 font-black text-dark-text text-base md:text-lg">Real-time live slideshow</td>
              <td className="p-6 md:p-8 text-success text-2xl bg-primary-lilac/5 text-center"><i className="fa-solid fa-circle-check"></i></td>
              <td className="p-6 md:p-8 text-danger text-2xl text-center opacity-20 group-hover:opacity-100 transition-opacity"><i className="fa-solid fa-circle-xmark"></i></td>
            </tr>
            <tr className="border-b border-border-color hover:bg-gray-50/50 transition-colors group">
              <td className="p-6 md:p-8 font-black text-dark-text text-base md:text-lg">Unlimited guests & participants</td>
              <td className="p-6 md:p-8 text-success text-2xl bg-primary-lilac/5 text-center"><i className="fa-solid fa-circle-check"></i></td>
              <td className="p-6 md:p-8 text-danger text-2xl text-center opacity-20 group-hover:opacity-100 transition-opacity"><i className="fa-solid fa-circle-xmark"></i></td>
            </tr>
            <tr className="border-b border-border-color hover:bg-gray-50/50 transition-colors group">
              <td className="p-6 md:p-8 font-black text-dark-text text-base md:text-lg">Extensive customization options</td>
              <td className="p-6 md:p-8 text-success text-2xl bg-primary-lilac/5 text-center"><i className="fa-solid fa-circle-check"></i></td>
              <td className="p-6 md:p-8 text-danger text-2xl text-center opacity-20 group-hover:opacity-100 transition-opacity"><i className="fa-solid fa-circle-xmark"></i></td>
            </tr>
            <tr className="hover:bg-gray-50/50 transition-colors group">
              <td className="p-6 md:p-8 font-black text-dark-text text-base md:text-lg">Get started for free</td>
              <td className="p-6 md:p-8 text-success text-2xl bg-primary-lilac/5 text-center"><i className="fa-solid fa-circle-check"></i></td>
              <td className="p-6 md:p-8 text-danger text-2xl text-center opacity-20 group-hover:opacity-100 transition-opacity"><i className="fa-solid fa-circle-xmark"></i></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
