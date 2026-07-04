import { Link } from "react-router-dom";

export default function Footer({ settings }) {
  const s = settings || {};
  return (
    <footer data-testid="site-footer" className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="mb-6">
              <div className="text-white text-xl font-bold tracking-tight">GlobServ International</div>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-gray-500 mt-1">Traders LLP</div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              A registered LLP exporting Spirulina, Aloe Vera and Khus (Vetiver) roots from Tamil Nadu — with Basmati 1121, Chilli and Turmeric available on request.
            </p>
          </div>

          <div>
            <div className="eyebrow text-gray-500 mb-4">Products</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#products" className="hover:text-white">Spirulina</a></li>
              <li><a href="#products" className="hover:text-white">Aloe Vera</a></li>
              <li><a href="#products" className="hover:text-white">Vetiver Roots</a></li>
              <li><a href="#products" className="hover:text-white">Basmati 1121</a></li>
              <li><a href="#products" className="hover:text-white">Chilli · Turmeric</a></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-gray-500 mb-4">Contact</div>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{s.address || "No.171/2C1A, Abdullapuram, Ranipet, Tamil Nadu — 631102"}</li>
              <li className="font-mono text-white">{s.whatsapp_number || "+91 95852 18525"}</li>
              <li className="font-mono text-white break-all">{s.business_email || "globservinternational@gmail.com"}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-[11px] font-mono">
          <FooterMeta k="LLPIN" v="ACX-1145" />
          <FooterMeta k="GSTIN" v="33ABEFG5227A1Z0" />
          <FooterMeta k="PAN" v="ABEFG5227A" />
          <FooterMeta k="Founded" v="April 2026" />
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-gray-500">
          <div>© {new Date().getFullYear()} GlobServ International Traders LLP. All rights reserved.</div>
          <Link to="/admin" data-testid="admin-link" className="font-mono uppercase tracking-widest hover:text-white">
            Admin →
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterMeta({ k, v }) {
  return (
    <div>
      <div className="text-gray-500 uppercase tracking-widest">{k}</div>
      <div className="text-white mt-1">{v}</div>
    </div>
  );
}
