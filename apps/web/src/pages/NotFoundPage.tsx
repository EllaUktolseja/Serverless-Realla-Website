import Footer from "@/sections/Footer";

function NotFoundPage() {
  return (
    <>
      <section className="space-section mission-section min-h-[70vh]">
        <div className="space-container px-5 py-20 sm:px-7 lg:px-10 lg:py-28">
          <div className="cosmic-panel max-w-2xl rounded-[2rem] p-7 sm:p-10">
            <p className="hud-label text-primary">Navigation / 404</p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.055em] text-white sm:text-6xl">This route is outside the map.</h1>
            <p className="mt-5 max-w-xl leading-7 text-white/66">The page you’re looking for may have moved or the URL may be incorrect.</p>
            <a href="/" className="mt-7 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-black text-white">Back home ↗</a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default NotFoundPage;
