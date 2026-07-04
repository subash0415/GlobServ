const CERTS = [
  { code: "LLPIN", value: "ACX-1145", status: "Active" },
  { code: "GSTIN", value: "33ABEFG5227A1Z0", status: "Active" },
  { code: "PAN", value: "ABEFG5227A", status: "Active" },
  { code: "IEC", value: "Import Export Code", status: "In Progress" },
  { code: "FSSAI", value: "Central License", status: "In Progress" },
  { code: "APEDA", value: "RCMC Registration", status: "In Progress" },
  { code: "LUT", value: "Letter of Undertaking", status: "In Progress" },
  { code: "ICEGATE", value: "Customs e-filing", status: "In Progress" },
];

export default function Certifications() {
  return (
    <section id="certifications" data-testid="certifications-section" className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow mb-4">Registrations & Compliance</div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
            Regulatory & compliance <span className="text-green-800">footprint</span>.
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            GlobServ is a registered Limited Liability Partnership. Below are our current registrations and those in progress with Indian export authorities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-t border-gray-200">
          {CERTS.map((c) => (
            <div key={c.code} className="grid-cell p-6" data-testid={`cert-${c.code}`}>
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500">{c.code}</span>
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 border ${
                    c.status === "Active"
                      ? "border-green-800 text-green-800 bg-green-50"
                      : "border-gray-300 text-gray-500 bg-gray-50"
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="font-mono text-sm font-semibold text-gray-900 break-all">{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-xs font-mono text-gray-500 leading-relaxed max-w-3xl">
          Registered office: No.171/2C1A, Abdullapuram, Ranipet, Tamil Nadu — 631102. Documents available on request during due diligence.
        </div>
      </div>
    </section>
  );
}
