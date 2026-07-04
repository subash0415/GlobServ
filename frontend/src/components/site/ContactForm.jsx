import { useState, useEffect } from "react";
import { toast } from "sonner";
import { api, formatApiError } from "@/lib/api";
import { Loader2, ArrowUpRight } from "lucide-react";

const PRODUCT_OPTIONS = [
  "Spirulina", "Aloe Vera", "Khus (Vetiver) Roots",
  "Basmati 1121 Rice", "Chilli", "Turmeric", "Other / Multiple",
];
const ORDER_TYPES = ["Export / International", "Domestic Wholesale", "Retail / Small Qty", "Sample Request"];

export default function ContactForm({ settings }) {
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    product: "", order_type: "", message: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      const val = e.detail || window.localStorage.getItem("gs-prefill-product");
      if (val) setForm((f) => ({ ...f, product: val }));
    };
    window.addEventListener("gs-product-prefill", handler);
    // check on mount
    const existing = window.localStorage.getItem("gs-prefill-product");
    if (existing) {
      setForm((f) => ({ ...f, product: existing }));
      window.localStorage.removeItem("gs-prefill-product");
    }
    return () => window.removeEventListener("gs-product-prefill", handler);
  }, []);

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in name, email and message");
      return;
    }
    setLoading(true);
    try {
      await api.post("/inquiries", form);
      toast.success("Enquiry received — we will respond within 24 hours.");
      setForm({ name: "", company: "", email: "", phone: "", product: "", order_type: "", message: "" });
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || "Unable to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const s = settings || {};
  const whatsappRaw = (s.whatsapp_number || "+91 95852 18525").replace(/\D/g, "");
  const whatsappLink = `https://wa.me/${whatsappRaw}?text=${encodeURIComponent("Hello GlobServ — I would like to enquire about your agricultural exports.")}`;

  return (
    <section id="contact" data-testid="contact-section" className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="overline mb-4">Request A Quote</div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
              Let&apos;s do <span className="text-green-800">business</span> together.
            </h2>
            <p className="mt-6 text-gray-600 leading-relaxed">
              Whether you are an importer, a domestic wholesaler or a retail buyer — share your requirement and we will respond within 24 hours.
            </p>

            <div className="mt-10 border-t border-gray-300">
              <ContactRow k="Registered Address" v={s.address || "No.171/2C1A, Abdullapuram, Ranipet, Tamil Nadu — 631102"} />
              <ContactRow k="WhatsApp / Phone" v={s.whatsapp_number || "+91 95852 18525"} />
              <ContactRow k="Email" v={s.business_email || "globservtraders@gmail.com"} />
              <ContactRow k="Entity" v="GlobServ International Traders LLP" />
            </div>

            <a
              data-testid="whatsapp-cta"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-gray-900 hover:bg-green-800 text-white px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.15em] transition-colors"
            >
              Chat on WhatsApp <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <form
            onSubmit={submit}
            data-testid="inquiry-form"
            className="lg:col-span-7 bg-white border border-gray-300 p-6 sm:p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Your Name *" value={form.name} onChange={onChange("name")} testId="input-name" required />
              <Field label="Company / Organisation" value={form.company} onChange={onChange("company")} testId="input-company" />
              <Field label="Email Address *" type="email" value={form.email} onChange={onChange("email")} testId="input-email" required />
              <Field label="Phone / WhatsApp" value={form.phone} onChange={onChange("phone")} testId="input-phone" />
              <Select label="Product Interested In" value={form.product} onChange={onChange("product")} testId="input-product" options={PRODUCT_OPTIONS} />
              <Select label="Order Type" value={form.order_type} onChange={onChange("order_type")} testId="input-order-type" options={ORDER_TYPES} />
            </div>
            <div>
              <label className="overline mb-2 block">Your Requirements *</label>
              <textarea
                data-testid="input-message"
                value={form.message}
                onChange={onChange("message")}
                required
                rows={5}
                placeholder="Quantity, destination port, grade, packaging preference, timeline..."
                className="w-full px-4 py-3 text-sm bg-white border border-gray-300 focus:border-green-800 focus:ring-1 focus:ring-green-800 focus:outline-none text-gray-900 placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              data-testid="submit-inquiry"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 text-white px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.15em] transition-colors disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {loading ? "Sending..." : "Send Enquiry"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", testId, required }) {
  return (
    <div>
      <label className="overline mb-2 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        data-testid={testId}
        className="w-full px-4 py-3 text-sm bg-white border border-gray-300 focus:border-green-800 focus:ring-1 focus:ring-green-800 focus:outline-none text-gray-900 placeholder-gray-400"
      />
    </div>
  );
}

function Select({ label, value, onChange, options, testId }) {
  return (
    <div>
      <label className="overline mb-2 block">{label}</label>
      <select
        value={value}
        onChange={onChange}
        data-testid={testId}
        className="w-full px-4 py-3 text-sm bg-white border border-gray-300 focus:border-green-800 focus:ring-1 focus:ring-green-800 focus:outline-none text-gray-900"
      >
        <option value="">— Select —</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function ContactRow({ k, v }) {
  return (
    <div className="py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-start sm:gap-6">
      <div className="overline sm:w-48 flex-shrink-0 mb-1 sm:mb-0">{k}</div>
      <div className="text-sm text-gray-800 leading-relaxed">{v}</div>
    </div>
  );
}
