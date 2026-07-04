import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Products from "@/components/site/Products";
import Process from "@/components/site/Process";
import Packaging from "@/components/site/Packaging";
import Certifications from "@/components/site/Certifications";
import ContactForm from "@/components/site/ContactForm";
import Footer from "@/components/site/Footer";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get("/products").then((r) => setProducts(r.data)).catch(() => {}),
      api.get("/settings").then((r) => setSettings(r.data)).catch(() => {}),
    ]);
  }, []);

  return (
    <div data-testid="home-page" className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Products products={products} />
      <Process />
      <Packaging />
      <Certifications />
      <ContactForm settings={settings} />
      <Footer settings={settings} />
    </div>
  );
}
