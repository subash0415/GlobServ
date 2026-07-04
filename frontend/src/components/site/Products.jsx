export default function Products({ products = [] }) {
  return (
    <section id="products" data-testid="products-section" className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="mb-12 max-w-3xl">
          <div className="eyebrow mb-4">Our Catalog</div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
            Premium agricultural products backed by <span className="text-green-800">technical expertise</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-gray-200">
          {products.map((p) => (
            <div
              key={p.id}
              data-testid={`product-card-${p.slug}`}
              className="grid-cell text-left bg-white"
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
                  <span className="eyebrow">
                    {p.category === "core" ? "Core Export" : "Optional"}
                  </span>
                  <span className="font-mono text-[11px] text-gray-500">{p.origin}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">{p.name}</h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
