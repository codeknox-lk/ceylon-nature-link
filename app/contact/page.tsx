import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactHero from "@/components/contact-hero";
import ContactInfo from "@/components/contact-info";
import ContactForm from "@/components/contact-form";
import ContactMap from "@/components/contact-map";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ContactHero />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <ContactInfo />
          <ContactForm />
        </div>
        <ContactMap />
      </main>
      <Footer />
    </div>
  );
}
