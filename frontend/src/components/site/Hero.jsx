export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      data-testid="hero-section"
      className="relative bg-white border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-10 bg-green-800" />
              <span className="overline">Ranipet, Tamil Nadu · India</span>
            </div>
            <h1
              data-testid="hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.02] text-gray-900"
            >
              Spirulina, Aloe Vera <br className="hidden sm:block" />
              & Vetiver Roots.
              <br />
              <span className="text-green-800">Sourced Direct. Exported Right.</span>
            </h1>
            <p className="mt-8 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
              GlobServ International Traders LLP is a focused agricultural exporter from Ranipet, Tamil Nadu — built around three core products we understand end-to-end. Basmati 1121, Chilli and Turmeric are available as optional add-ons for buyers seeking a single Indian sourcing partner.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                data-testid="hero-cta-products"
                onClick={() => scrollTo("products")}
                className="bg-gray-900 hover:bg-green-800 text-white px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.15em] transition-colors"
              >
                Explore Products
              </button>
              <button
                data-testid="hero-cta-quote"
                onClick={() => scrollTo("contact")}
                className="border border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.15em] transition-colors"
              >
                Request A Quote
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-gray-200">
              <div className="grid grid-cols-2 border-b border-gray-200">
                <StatCell k="Est." v="April 2026" />
                <StatCell k="Entity" v="LLP" borderLeft />
              </div>
              <div className="grid grid-cols-2 border-b border-gray-200">
                <StatCell k="Core Products" v="03" />
                <StatCell k="Optional" v="03" borderLeft />
              </div>
              <div className="grid grid-cols-2">
                <StatCell k="Model" v="B2B / Bulk" />
                <StatCell k="Origin" v="Tamil Nadu" borderLeft />
              </div>
            </div>

            <div className="mt-6 border border-gray-200 p-6 bg-gray-50">
              <div className="overline mb-3">Registered Address</div>
              <p className="text-sm text-gray-800 leading-relaxed">
                No.171/2C1A, Abdullapuram,
                <br /> Ranipet, Tamil Nadu — 631102, India
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="overline mb-1">LLPIN</div>
                  <div className="font-mono text-gray-900">ACX-1145</div>
                </div>
                <div>
                  <div className="overline mb-1">GSTIN</div>
                  <div className="font-mono text-gray-900">33ABEFG5227A1Z0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCell({ k, v, borderLeft }) {
  return (
    <div className={`p-6 ${borderLeft ? "border-l border-gray-200" : ""}`}>
      <div className="overline mb-2">{k}</div>
      <div className="font-mono text-lg font-semibold text-gray-900">{v}</div>
    </div>
  );
}
