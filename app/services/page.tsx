import Header from "@/components/header";
import Footer from "@/components/footer";
import ServicesHero from "@/components/services-hero";
import ServicesGrid from "@/components/services-grid";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ServicesHero />
        <ServicesGrid />
      </main>
      <Footer />
    </div>
  );
}
