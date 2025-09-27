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
      <div className="container mx-auto px-4">
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
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>

                <h3 className="font-heading font-bold text-xl text-primary-dark mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <p className="text-gray-500 text-xs font-semibold mb-3 uppercase tracking-wide">
                    What's Included:
                  </p>
                  <div className="space-y-2">
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
                <div className="mb-6">
                  <p className="text-gray-500 text-xs font-semibold mb-3 uppercase tracking-wide">
                    Benefits:
                  </p>
                  <div className="space-y-2">
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
                    25+ Years Experience
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Decades of expertise in Sri Lankan natural products and
                    international trade.
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
                    Serving customers in over 50 countries with reliable
                    shipping and logistics.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-primary-dark mb-2">
                    Quality Guaranteed
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Every product meets international quality standards with
                    comprehensive testing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up animate-delay-300">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
              <h4 className="font-heading font-bold text-2xl text-primary-dark mb-6">
                Ready to Get Started?
              </h4>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Contact our team today to discuss your requirements and get a
                personalized quote for our services.
              </p>
              <div className="space-y-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0 mb-2"
                  >
                    Request Quote
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    className="w-full border border-primary bg-white text-primary hover:bg-white hover:scale-105 font-semibold transition-all duration-300"
                  >
                    View All Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
