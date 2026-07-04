export default function About() {
  return (
    <section id="about" data-testid="about-section" className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="overline mb-4">Who We Are</div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
              Rooted in Tamil Nadu.
              <br />
              <span className="text-green-800">Reaching the world.</span>
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6 text-gray-700 leading-relaxed">
            <p>
              GlobServ International Traders LLP is an agricultural export enterprise based in Ranipet, Tamil Nadu. Rather than trying to be a general-purpose trading company, we have deliberately narrowed our focus to three products we understand end-to-end — <span className="font-semibold text-gray-900">Spirulina, Aloe Vera and Khus (Vetiver) roots</span> — from cultivation and processing through to export documentation.
            </p>
            <p>
              For buyers who need a broader basket, we also supply Basmati 1121 rice, Chilli and Turmeric as optional additions alongside our core range.
            </p>
            <p>
              GlobServ was founded in April 2026 by <span className="font-semibold text-gray-900">Subash Saravanan</span> and <span className="font-semibold text-gray-900">Madan Vignesh</span>, who lead sourcing, product quality and export operations directly rather than through layers of subcontracting.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-l border-t border-gray-200 mt-10">
              <Value k="Focused Sourcing" v="Direct sourcing for three core products, not a scattered catalog." />
              <Value k="Registered LLP" v="Fully registered export business — see compliance section for details." />
              <Value k="Flexible Packaging" v="Custom packing sizes for wholesale and bulk export shipments." />
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
      <div className="overline mb-2 text-gray-900">{k}</div>
      <p className="text-sm text-gray-600 leading-relaxed">{v}</p>
    </div>
  );
}
