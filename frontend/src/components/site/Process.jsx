const STEPS = [
  { n: "01", title: "Enquiry", body: "Share your product, quantity, grade and destination port." },
  { n: "02", title: "Sample & Quote", body: "We send samples for approval and a formal FOB / CIF quote." },
  { n: "03", title: "Confirmation", body: "Order confirmed with agreed Incoterms, payment and advance." },
  { n: "04", title: "Sourcing & Packing", body: "Procurement, grading, cleaning and packing to specification." },
  { n: "05", title: "QC & Documentation", body: "Third-party QC where applicable plus full export paperwork." },
  { n: "06", title: "Shipping", body: "Dispatch by sea or air freight to your nominated port." },
];

export default function Process() {
  return (
    <section id="process" data-testid="process-section" className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="overline mb-4">How We Work</div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
              From enquiry to <span className="text-green-800">delivery</span>.
            </h2>
          </div>
          <p className="text-sm text-gray-600 max-w-md">
            A structured, six-step workflow used on every export order — no exceptions, regardless of destination or product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-gray-200 bg-white">
          {STEPS.map((s) => (
            <div key={s.n} className="grid-cell p-8" data-testid={`step-${s.n}`}>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-mono text-3xl font-bold text-green-800">{s.n}</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
