import Header from "@/components/header";
import Footer from "@/components/footer";
import BrandsPageComponent from "@/components/brands-page";

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <BrandsPageComponent />
      </main>
      <Footer />
    </div>
  );
}
