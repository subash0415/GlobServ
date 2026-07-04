import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const TABS = [
  { key: "all", label: "All Products" },
  { key: "core", label: "Core Exports" },
  { key: "optional", label: "Optional Additions" },
];

export default function Products({ products = [] }) {
  const [tab, setTab] = useState("all");
  const [activeId, setActiveId] = useState(null);

  const filtered = products.filter((p) => tab === "all" || p.category === tab);
  const active = products.find((p) => p.id === activeId) || filtered[0];

  const scrollToContact = (productName) => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    // pre-fill product name via localStorage
    if (productName) window.localStorage.setItem("gs-prefill-product", productName);
    window.dispatchEvent(new CustomEvent("gs-product-prefill", { detail: productName }));
  };

  return (
    <section id="products" data-testid="products-section" className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="overline mb-4">02 · Our Catalog</div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
              A focused export range with <span className="text-green-800">technical depth</span>.
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Spirulina, Aloe Vera and Khus (Vetiver) roots are our core export focus. Select any product to view technical specifications and packaging options.
            </p>
          </div>
          <div className="flex flex-wrap gap-0 border border-gray-300" data-testid="product-tabs">
            {TABS.map((t) => (
              <button
                key={t.key}
                data-testid={`tab-${t.key}`}
                onClick={() => setTab(t.key)}
                className={`px-5 py-3 text-[12px] font-semibold uppercase tracking-wider transition-colors border-r border-gray-300 last:border-r-0 ${
                  tab === t.key ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-gray-200">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              data-testid={`product-card-${p.slug}`}
              className="grid-cell text-left group bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="aspect-[4/3] overflow-hidden border-b border-gray-200 bg-gray-100">
                <img
                  src={p.image_url}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="overline">
                    {p.category === "core" ? "Core Export" : "Optional"}
                  </span>
                  <span className="font-mono text-[11px] text-gray-500">{p.origin}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">{p.name}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-2">{p.description}</p>
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
                    MOQ · <span className="text-gray-900">{p.moq}</span>
                  </span>
                  <span className="flex items-center gap-1 text-[12px] font-semibold uppercase tracking-wider text-green-800 group-hover:text-green-900">
                    Specs <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {active && (
          <div className="mt-16 border border-gray-300" data-testid="product-detail-panel">
            <div className="border-b border-gray-300 bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="overline">Technical Datasheet</div>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{active.name}</h3>
              </div>
              <button
                data-testid={`enquire-${active.slug}`}
                onClick={() => scrollToContact(active.name)}
                className="bg-green-800 hover:bg-green-900 text-white px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider transition-colors"
              >
                Enquire About {active.name}
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-300">
                <div className="overline mb-4">Specifications</div>
                <table className="spec-table">
                  <tbody>
                    {active.specs.map((s, i) => (
                      <tr key={i} data-testid={`spec-${active.slug}-${i}`}>
                        <th>{s.key}</th>
                        <td>{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 lg:p-8">
                <div className="overline mb-4">Packaging & Container</div>
                <ul className="space-y-3">
                  {active.packaging.map((p, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed border-b border-gray-200 pb-3 last:border-0">
                      <span className="font-mono text-green-800 text-[11px] mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-6">
                  <div>
                    <div className="overline mb-1">MOQ</div>
                    <div className="font-mono text-sm text-gray-900">{active.moq}</div>
                  </div>
                  <div>
                    <div className="overline mb-1">Origin</div>
                    <div className="font-mono text-sm text-gray-900">{active.origin}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
