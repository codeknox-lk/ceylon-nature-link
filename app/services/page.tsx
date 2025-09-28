import Header from "@/components/header";
import Footer from "@/components/footer";
import ServicesPageComponent from "@/components/services-page";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ServicesPageComponent />
      </main>
      <Footer />
    </div>
  );
}
