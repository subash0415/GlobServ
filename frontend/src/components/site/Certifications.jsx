import { FileCheck, ShieldCheck, Globe, ClipboardCheck, Building2, Package, FileSignature, Ship } from "lucide-react";

const ITEMS = [
  { icon: Building2, label: "LLP Registration" },
  { icon: FileCheck, label: "GST Registration" },
  { icon: Globe, label: "Import Export Code (IEC)" },
  { icon: ShieldCheck, label: "FSSAI License" },
  { icon: Package, label: "APEDA Registration" },
  { icon: ClipboardCheck, label: "RCMC Registration" },
  { icon: FileSignature, label: "Letter of Undertaking (LUT)" },
  { icon: Ship, label: "ICEGATE Registration" },
];

export default function Certifications() {
  return (
    <section id="certifications" data-testid="certifications-section" className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-2xl mb-16">
          <div className="eyebrow mb-4">Compliance</div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
            Registrations &amp; Compliance
          </h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
          {ITEMS.map(({ icon: Icon, label }) => (
            <li key={label} data-testid={`cert-${label}`} className="flex items-start gap-4">
              <Icon strokeWidth={1.25} className="h-6 w-6 text-green-800 shrink-0 mt-0.5" />
              <span className="text-[15px] text-gray-900 leading-snug">{label}</span>
            </li>
          ))}
        </ul>

        <p className="mt-20 pt-8 border-t border-gray-200 text-sm text-gray-500 leading-relaxed max-w-3xl">
          Supporting business and regulatory documentation can be provided to qualified buyers upon request during the due diligence process.
        </p>
      </div>
    </section>
  );
}
