import Header from "@/components/header";
import Footer from "@/components/footer";
import AboutPageComponent from "@/components/about-page";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AboutPageComponent />
      </main>
      <Footer />
    </div>
  );
}
