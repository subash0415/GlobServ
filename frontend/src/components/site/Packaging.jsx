export default function Packaging() {
  return (
    <section id="packaging" data-testid="packaging-section" className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-4">Export Capabilities</div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
              Packaging, container loading & <span className="text-green-800">port logistics</span>.
            </h2>
            <p className="mt-6 text-gray-600 leading-relaxed">
              We handle bulk, wholesale and private-label packaging sized to your order and destination market. Documentation is prepared in line with our registrations and buyer requirements.
            </p>
            <div className="mt-8 border border-gray-200 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/20581299/pexels-photo-20581299.jpeg"
                alt="Container shipping"
                loading="lazy"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-gray-300">
              <div className="bg-gray-50 border-b border-gray-300 px-6 py-3">
                <div className="eyebrow">Container Load Reference</div>
              </div>
              <table className="spec-table">
                <thead>
                  <tr>
                    <th style={{ width: "35%" }}>Product</th>
                    <th style={{ width: "20%" }}>20&apos; FCL</th>
                    <th style={{ width: "20%" }}>40&apos; HC</th>
                    <th style={{ width: "25%" }}>Package</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><th>Spirulina Powder</th><td>~15 MT</td><td>~22 MT</td><td>25 kg drums</td></tr>
                  <tr><th>Aloe Vera Powder</th><td>~10 MT</td><td>~18 MT</td><td>25 kg fibre drums</td></tr>
                  <tr><th>Vetiver Roots</th><td>~5 MT</td><td>~8 – 10 MT</td><td>25 / 50 kg bales</td></tr>
                  <tr><th>Basmati 1121</th><td>~25 – 26 MT</td><td>~28 MT</td><td>PP / Jute 5–50 kg</td></tr>
                  <tr><th>Chilli (dry)</th><td>~14 MT</td><td>~24 MT</td><td>25 kg PP + liner</td></tr>
                  <tr><th>Turmeric</th><td>~18 MT</td><td>~26 MT</td><td>25 / 50 kg PP</td></tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 border-l border-t border-gray-200">
              <PortCell k="Primary Port" v="Chennai (INMAA)" />
              <PortCell k="Alternate" v="Tuticorin (INTUT)" />
              <PortCell k="Airport" v="Chennai (MAA)" />
              <PortCell k="Incoterms" v="FOB · CIF · CFR" />
              <PortCell k="Payment" v="30% Advance / TT" />
              <PortCell k="Lead Time" v="15 – 30 Days" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortCell({ k, v }) {
  return (
    <div className="grid-cell p-5">
      <div className="eyebrow mb-2">{k}</div>
      <div className="font-mono text-sm font-semibold text-gray-900">{v}</div>
    </div>
  );
}
