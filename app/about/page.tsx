import Header from "@/components/header";
import Footer from "@/components/footer";
import AboutHero from "@/components/about-hero";
import CompanyTimeline from "@/components/company-timeline";
import CompanyProfile from "@/components/company-profile";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AboutHero />
        <CompanyTimeline />
        <CompanyProfile />
      </main>
      <Footer />
    </div>
  );
}
