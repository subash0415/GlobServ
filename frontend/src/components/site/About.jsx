export default function About() {
  return (
    <section id="about" data-testid="about-section" className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="eyebrow">Who We Are</span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
              Two friends. One idea.
              <br />
              <span className="text-green-800">A shared vision.</span>
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6 text-gray-700 leading-relaxed">
            <p>
              Two friends, one idea, and a shared vision to take the goodness of South India to the world. That is where the journey of <span className="font-semibold text-gray-900">GlobServ International Traders LLP</span> began. What started as conversations about quality, agriculture, and global opportunities gradually grew into a commitment to build something meaningful together. With determination and a belief in the value of authentic Indian produce, that idea was transformed into action, and GlobServ was born.
            </p>
            <p>
              Rooted in the God-blessed lands of Tamil Nadu, a region celebrated for its rich agricultural heritage, fertile landscapes, and generations of farming knowledge, we carry a simple promise: to deliver quality products to global markets with honesty, consistency, and care.
            </p>
            <p>
              We believe that every product we export represents not only our company, but also the farmers, communities, and traditions behind it. From Spirulina, Aloe Vera, and Vetiver (Khus) to Basmati Rice (1121), Chillies, Turmeric, and other agricultural products, we are committed to building lasting relationships with buyers who value quality, reliability, and transparent sourcing from India.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-l border-t border-gray-200 mt-10">
              <Value k="Founders" v="Subash Saravanan & Madan Vignesh — leading sourcing, quality and export operations directly." />
              <Value k="Founded" v="April 2026 · Registered LLP in Ranipet, Tamil Nadu — fully compliant export entity." />
              <Value k="Direct Sourcing" v="Working with farmers and cultivators end-to-end, no layers of subcontracting." />
              <Value k="Transparent Pricing" v="Straightforward quotes based on quantity, grade and destination." />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Value({ k, v }) {
  return (
    <div className="border-r border-b border-gray-200 p-6">
      <div className="eyebrow mb-2 text-gray-900">{k}</div>
      <p className="text-sm text-gray-600 leading-relaxed">{v}</p>
    </div>
  );
}
