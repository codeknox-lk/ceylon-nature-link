import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Private Label Packaging",
    description:
      "Custom packaging solutions for your brand with our premium products",
    longDescription:
      "Launch your own brand with our premium Sri Lankan products. We offer complete private labeling services including custom packaging design, branding, and quality assurance.",
    icon: "📦",
    features: [
      "Custom Design",
      "Brand Integration",
      "Quality Control",
      "Fast Turnaround",
    ],
    benefits: [
      "Build Your Brand",
      "Premium Quality",
      "Competitive Pricing",
      "Global Reach",
    ],
  },
  {
    id: 2,
    title: "Bulk Export Services",
    description:
      "Large quantity exports with quality assurance and timely delivery",
    longDescription:
      "Reliable bulk export services for businesses worldwide. We handle everything from documentation to logistics, ensuring your orders arrive on time and in perfect condition.",
    icon: "🚢",
    features: ["Quality Assurance", "Documentation", "Logistics", "Tracking"],
    benefits: [
      "Cost Effective",
      "Reliable Delivery",
      "Quality Guaranteed",
      "24/7 Support",
    ],
  },
  {
    id: 3,
    title: "Corporate Gifting",
    description: "Curated gift sets featuring authentic Sri Lankan products",
    longDescription:
      "Impress your clients and partners with premium Sri Lankan gift sets. Our corporate gifting service offers customized packages that reflect quality and authenticity.",
    icon: "🎁",
    features: [
      "Custom Packaging",
      "Premium Selection",
      "Branding Options",
      "Delivery",
    ],
    benefits: [
      "Professional Image",
      "Unique Gifts",
      "Quality Products",
      "Memorable Experience",
    ],
  },
  {
    id: 4,
    title: "Online Ordering Platform",
    description: "Convenient online platform for easy ordering and tracking",
    longDescription:
      "Streamline your procurement process with our user-friendly online ordering platform. Track orders, manage inventory, and access detailed product information anytime.",
    icon: "💻",
    features: [
      "Easy Ordering",
      "Real-time Tracking",
      "Inventory Management",
      "Secure Payments",
    ],
    benefits: ["Convenience", "Transparency", "Efficiency", "24/7 Access"],
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary-dark mb-6">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions tailored to meet your business needs with
            our premium Sri Lankan natural products. From private labeling to
            bulk exports, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-sm premium-card"
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>

                <h3 className="font-heading font-bold text-lg text-primary-dark mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <p className="text-gray-500 text-xs font-semibold mb-2 uppercase tracking-wide">
                    What's Included:
                  </p>
                  <div className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center space-x-2"
                      >
                        <span className="text-primary text-sm">✓</span>
                        <span className="text-gray-600 text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-4">
                  <p className="text-gray-500 text-xs font-semibold mb-2 uppercase tracking-wide">
                    Benefits:
                  </p>
                  <div className="space-y-1">
                    {service.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center space-x-2"
                      >
                        <span className="text-accent text-sm">★</span>
                        <span className="text-gray-600 text-xs">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href="/contact">
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0"
                  >
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h3 className="font-heading font-bold text-3xl text-primary-dark mb-6">
              Why Choose Our Services?
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-primary-dark mb-2">
                    Fresh Vision, Trusted Roots
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Founded in 2025, built on Sri Lanka's timeless spice and fruit legacy.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <span className="text-2xl">🌍</span>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-primary-dark mb-2">
                    Global Reach
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Delivering premium dehydrated fruits, spices, and herbs worldwide with reliable logistics.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-primary-dark mb-2">
                    Quality Assured
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Strict sourcing, hygienic processing, and testing ensure freshness, purity, and global standards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up animate-delay-300">
            <div className="relative bg-gradient-to-br from-primary/15 via-white to-accent/15 rounded-3xl p-10 shadow-2xl overflow-hidden moving-border">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full mb-4 shadow-lg">
                    <span className="text-2xl text-white">🚀</span>
                  </div>
                  <h4 className="font-heading font-bold text-3xl text-primary-dark mb-4">
                    Ready to Get Started?
                  </h4>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                    Contact our team today to discuss your requirements and get a
                    personalized quote for our services.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Link href="/contact" className="flex-1">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0 py-3"
                    >
                      Request Quote
                    </Button>
                  </Link>
                  <Link href="/services" className="flex-1">
                    <Button
                      size="lg"
                      className="w-full border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white hover:scale-105 font-semibold transition-all duration-300 py-3"
                    >
                      View All Services
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
