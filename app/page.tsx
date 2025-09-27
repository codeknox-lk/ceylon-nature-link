import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSlider from "@/components/hero-slider";
import BrandsSection from "@/components/brands-section";
import ProductsSection from "@/components/products-section";
import BestSellingProducts from "@/components/best-selling-products";
import ServicesSection from "@/components/services-section";
import StatisticsSection from "@/components/statistics-section";
import TestimonialsSection from "@/components/testimonials-section";
import CallToActionSection from "@/components/call-to-action-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSlider />
        <StatisticsSection />
        <BrandsSection />
        <ProductsSection />
        <BestSellingProducts />
        <ServicesSection />
        <TestimonialsSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}
