import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const NAV = [
  { id: "about", label: "About" },
  { id: "products", label: "Products" },
  { id: "process", label: "Process" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-navbar"
      className={`sticky top-0 z-50 bg-white border-b ${scrolled ? "border-gray-300" : "border-gray-200"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-40 lg:h-48">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3"
            data-testid="brand-logo"
          >
            <img
              src="https://customer-assets.emergentagent.com/job_agro-trade-portal-3/artifacts/7yctdp0f_GlobServ%20Logo.png"
              alt="GlobServ"
              className="h-32 lg:h-40 w-auto object-contain"
            />
            <div className="text-left leading-tight hidden sm:block">
              <div className="text-[15px] font-bold text-gray-900 tracking-tight">GlobServ International</div>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-gray-500">Traders LLP</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <button
                key={n.id}
                data-testid={`nav-${n.id}`}
                onClick={() => scrollTo(n.id)}
                className="text-[13px] font-medium text-gray-700 hover:text-green-800 transition-colors uppercase tracking-wider link-underline"
              >
                {n.label}
              </button>
            ))}
            <button
              data-testid="nav-request-quote"
              onClick={() => scrollTo("contact")}
              className="bg-green-800 hover:bg-green-900 text-white px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wider transition-colors"
            >
              Request Quote
            </button>
          </nav>

          <button
            className="lg:hidden p-2 border border-gray-300"
            onClick={() => setOpen(!open)}
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-gray-200 bg-white" data-testid="mobile-menu">
          <div className="px-4 py-4 space-y-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                data-testid={`mobile-nav-${n.id}`}
                className="block w-full text-left py-3 px-2 text-sm font-medium text-gray-700 uppercase tracking-wider border-b border-gray-100"
              >
                {n.label}
              </button>
            ))}
            <button
              data-testid="mobile-nav-request-quote"
              onClick={() => scrollTo("contact")}
              className="block w-full bg-green-800 text-white px-4 py-3 mt-3 text-sm font-semibold uppercase tracking-wider"
            >
              Request Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
