import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactHero from "@/components/contact-hero";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ContactHero />
      </main>
      <Footer />
    </div>
  );
}
