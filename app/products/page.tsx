import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductsHero from "@/components/products-hero";
import ProductsGrid from "@/components/products-grid";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ProductsHero />
        <ProductsGrid />
      </main>
      <Footer />
    </div>
  );
}
