import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Trash2, ArrowLeft, LogOut } from "lucide-react";
import { api, formatApiError } from "@/lib/api";

export default function AdminPage() {
  const [me, setMe] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((r) => setMe(r.data))
      .catch(() => setMe(false))
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white" data-testid="admin-loading">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!me) return <LoginView onLogin={(u) => setMe(u)} />;

  return <Dashboard admin={me} onLogout={() => setMe(false)} />;
}

function LoginView({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      onLogin(data);
      toast.success("Signed in");
    } catch (e) {
      const msg = formatApiError(e.response?.data?.detail) || "Login failed";
      setErr(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" data-testid="admin-login-page">
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <Link to="/" data-testid="back-home" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
          <span className="eyebrow">GlobServ · Admin</span>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <form onSubmit={submit} className="w-full max-w-md border border-gray-300 bg-white p-8" data-testid="admin-login-form">
          <div className="eyebrow mb-3">Restricted Area</div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Login</h1>
          <p className="mt-2 text-sm text-gray-600">Enter your credentials to access the admin panel.</p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="eyebrow mb-2 block">Email</label>
              <input
                data-testid="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 text-sm border border-gray-300 focus:border-green-800 focus:ring-1 focus:ring-green-800 focus:outline-none"
              />
            </div>
            <div>
              <label className="eyebrow mb-2 block">Password</label>
              <input
                data-testid="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 text-sm border border-gray-300 focus:border-green-800 focus:ring-1 focus:ring-green-800 focus:outline-none"
              />
            </div>
            {err && <div data-testid="login-error" className="text-sm text-red-700 border border-red-200 bg-red-50 px-3 py-2">{err}</div>}
            <button
              data-testid="login-submit"
              disabled={loading}
              type="submit"
              className="w-full bg-gray-900 hover:bg-green-800 text-white px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.15em] transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Dashboard({ admin, onLogout }) {
  const [tab, setTab] = useState("inquiries");
  const [inquiries, setInquiries] = useState([]);
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState(null);

  const load = async () => {
    try {
      const [inqs, prods, sett] = await Promise.all([
        api.get("/admin/inquiries"),
        api.get("/products"),
        api.get("/settings"),
      ]);
      setInquiries(inqs.data);
      setProducts(prods.data);
      setSettings(sett.data);
    } catch (e) { /* noop */ }
  };
  useEffect(() => { load(); }, []);

  const logout = async () => {
    try { await api.post("/auth/logout"); } catch(e){ /* noop */ }
    onLogout();
  };

  return (
    <div className="min-h-screen bg-white" data-testid="admin-dashboard">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" /> Site
            </Link>
            <span className="h-6 w-px bg-gray-300" />
            <div>
              <div className="eyebrow">GlobServ Admin</div>
              <div className="text-sm font-semibold text-gray-900">{admin.email}</div>
            </div>
          </div>
          <button data-testid="logout-btn" onClick={logout} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-700 hover:text-red-700 border border-gray-300 px-4 py-2">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-0 border-t border-gray-200">
          {[
            { key: "inquiries", label: `Inquiries (${inquiries.length})` },
            { key: "products", label: `Products (${products.length})` },
            { key: "settings", label: "Settings" },
          ].map((t) => (
            <button
              key={t.key}
              data-testid={`admin-tab-${t.key}`}
              onClick={() => setTab(t.key)}
              className={`px-5 py-3 text-[12px] font-semibold uppercase tracking-widest border-b-2 ${
                tab === t.key ? "border-green-800 text-green-800" : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >{t.label}</button>
          ))}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {tab === "inquiries" && <InquiriesTab inquiries={inquiries} reload={load} />}
        {tab === "products" && <ProductsTab products={products} reload={load} />}
        {tab === "settings" && settings && <SettingsTab settings={settings} reload={load} />}
      </div>
    </div>
  );
}

function InquiriesTab({ inquiries, reload }) {
  const del = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    try { await api.delete(`/admin/inquiries/${id}`); toast.success("Deleted"); reload(); }
    catch { toast.error("Failed"); }
  };
  const clearAll = async () => {
    if (!window.confirm("Delete ALL inquiries? This cannot be undone.")) return;
    try { await api.delete("/admin/inquiries"); toast.success("Cleared"); reload(); }
    catch { toast.error("Failed"); }
  };

  return (
    <section data-testid="inquiries-tab">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="eyebrow">Customer Enquiries</div>
          <h2 className="text-xl font-bold text-gray-900 mt-1">{inquiries.length} total</h2>
        </div>
        {inquiries.length > 0 && (
          <button data-testid="clear-inquiries" onClick={clearAll} className="text-xs font-semibold uppercase tracking-widest text-red-700 border border-red-300 px-4 py-2 hover:bg-red-50">
            Clear All
          </button>
        )}
      </div>

      {inquiries.length === 0 ? (
        <div className="border border-dashed border-gray-300 p-16 text-center text-sm text-gray-500" data-testid="no-inquiries">
          No enquiries yet. Submissions from the contact form will appear here.
        </div>
      ) : (
        <div className="border border-gray-300 divide-y divide-gray-200">
          {inquiries.map((q) => (
            <div key={q.id} className="p-6 hover:bg-gray-50" data-testid={`inquiry-${q.id}`}>
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-gray-900">{q.name}</span>
                    {q.company && <span className="text-sm text-gray-500">· {q.company}</span>}
                    {q.product && <span className="ml-auto sm:ml-0 px-2 py-1 text-[10px] font-mono uppercase tracking-widest border border-green-800 text-green-800">{q.product}</span>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-gray-600 mb-3">
                    <span>{q.email}</span>
                    {q.phone && <span>{q.phone}</span>}
                    {q.order_type && <span className="uppercase tracking-wider">{q.order_type}</span>}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{q.message}</p>
                  <div className="mt-3 text-[11px] font-mono text-gray-500">{new Date(q.created_at).toLocaleString()}</div>
                </div>
                <button data-testid={`delete-inquiry-${q.id}`} onClick={() => del(q.id)} className="text-gray-400 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function ProductsTab({ products, reload }) {
  return (
    <section data-testid="products-tab">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="eyebrow">Products Catalog</div>
          <h2 className="text-xl font-bold text-gray-900 mt-1">{products.length} products</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-t border-gray-200">
        {products.map((p) => (
          <div key={p.id} className="grid-cell p-6" data-testid={`admin-product-${p.slug}`}>
            <div className="flex items-start justify-between mb-2">
              <span className="eyebrow">{p.category === "core" ? "Core" : "Optional"}</span>
              <span className="font-mono text-[10px] text-gray-500">order: {p.order_index}</span>
            </div>
            <h3 className="font-bold text-gray-900">{p.name}</h3>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{p.description}</p>
            <div className="mt-3 flex gap-2 text-[11px] font-mono text-gray-500">
              <span>MOQ: {p.moq}</span>
              <span>·</span>
              <span>{p.specs.length} specs</span>
              <span>·</span>
              <span>{p.packaging.length} pack</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-gray-500">Products are seeded from backend defaults. Editing UI can be extended — API endpoints available at <span className="font-mono">POST/PUT/DELETE /api/admin/products</span>.</p>
    </section>
  );
}

function SettingsTab({ settings, reload }) {
  const [f, setF] = useState(settings);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await api.put("/admin/settings", f);
      toast.success("Settings saved");
      reload();
    } catch (e) {
      toast.error(formatApiError(e.response?.data?.detail));
    } finally { setSaving(false); }
  };

  return (
    <section data-testid="settings-tab" className="max-w-2xl">
      <div className="eyebrow mb-2">Business Settings</div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Update contact & business info</h2>
      <div className="space-y-5 border border-gray-300 p-6 bg-white">
        <SField label="WhatsApp / Phone" value={f.whatsapp_number} onChange={(v) => setF({...f, whatsapp_number: v})} testId="settings-whatsapp" />
        <SField label="Business Email" value={f.business_email} onChange={(v) => setF({...f, business_email: v})} testId="settings-email" />
        <SField label="Tagline" value={f.business_tagline} onChange={(v) => setF({...f, business_tagline: v})} testId="settings-tagline" />
        <SField label="Registered Address" value={f.address} onChange={(v) => setF({...f, address: v})} testId="settings-address" textarea />
        <button data-testid="save-settings" onClick={save} disabled={saving} className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 text-[13px] font-semibold uppercase tracking-widest inline-flex items-center gap-2 disabled:opacity-60">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Save Settings
        </button>
      </div>
    </section>
  );
}

function SField({ label, value, onChange, testId, textarea }) {
  return (
    <div>
      <label className="eyebrow mb-2 block">{label}</label>
      {textarea ? (
        <textarea data-testid={testId} value={value || ""} onChange={(e) => onChange(e.target.value)} rows={3} className="w-full px-4 py-3 text-sm border border-gray-300 focus:border-green-800 focus:ring-1 focus:ring-green-800 focus:outline-none" />
      ) : (
        <input data-testid={testId} value={value || ""} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-300 focus:border-green-800 focus:ring-1 focus:ring-green-800 focus:outline-none" />
      )}
    </div>
  );
}
