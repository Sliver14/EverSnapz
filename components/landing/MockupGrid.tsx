export default function MockupGrid() {
  return (
    <section className="bg-bg-light section-padding border-t border-b border-border-color">
      <div className="container">
        <h3 className="text-center text-[2.5rem] font-extrabold tracking-tight mb-4">
          Event Photo Sharing Made Easy
        </h3>
        <p className="text-center text-gray-text text-[1.15rem] max-w-[700px] mx-auto mb-[60px]">
          No app installs required. Simple, fast, and completely modern.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-[60px]">
          <div className="flex-1 flex flex-col gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-primary-lilac border-t border-r border-b border-border-color">
              <h4 className="text-dark-text text-[17px] font-bold mb-1.5 text-center md:text-left">1. Scan QR Code</h4>
              <p className="text-sm text-gray-text text-center md:text-left">Guests simple scan a personalized QR code at your venue setup.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-primary-lilac border-t border-r border-b border-border-color">
              <h4 className="text-dark-text text-[17px] font-bold mb-1.5 text-center md:text-left">2. Upload Instantly</h4>
              <p className="text-sm text-gray-text text-center md:text-left">They pick pictures right out of their phone gallery or take new snapshots.</p>
            </div>
          </div>

          <div className="flex-[0.8] flex justify-center">
            <div className="border-[12px] border-[#191524] rounded-[40px] p-4 md:p-6 bg-white w-[280px] h-[480px] flex flex-col justify-between shadow-2xl relative">
              <div className="bg-[#191524] h-[22px] w-[130px] mx-auto -mt-6 md:-mt-10 rounded-b-2xl"></div>
              <div className="border-2 border-dashed border-primary-lilac p-[50px_16px] rounded-xl text-dark-lilac font-bold text-center bg-light-lavender cursor-pointer">
                <i className="fa-solid fa-cloud-arrow-up text-[2.5rem] mb-3 text-primary-lilac"></i>
                <br />Tap to Upload Media
              </div>
              <div className="bg-primary-lilac h-10 rounded-[20px] w-full shadow-lg"></div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-primary-lilac border-t border-r border-b border-border-color">
              <h4 className="text-dark-text text-[17px] font-bold mb-1.5 text-center md:text-left">3. Live Stream View</h4>
              <p className="text-sm text-gray-text text-center md:text-left">Watch incoming photos display dynamically on big screens real time.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-primary-lilac border-t border-r border-b border-border-color">
              <h4 className="text-dark-text text-[17px] font-bold mb-1.5 text-center md:text-left">4. Download All</h4>
              <p className="text-sm text-gray-text text-center md:text-left">Get a neat high-quality ZIP folder archive post-event with one click.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
