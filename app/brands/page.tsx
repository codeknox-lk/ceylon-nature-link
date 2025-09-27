import Header from "@/components/header";
import Footer from "@/components/footer";
import BrandsHero from "@/components/brands-hero";
import BrandsShowcase from "@/components/brands-showcase";

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <BrandsHero />
        <BrandsShowcase />
      </main>
      <Footer />
    </div>
  );
}
