import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductsPageComponent from "@/components/products-page";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ProductsPageComponent />
      </main>
      <Footer />
    </div>
  );
}
