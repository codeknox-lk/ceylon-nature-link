import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: 1,
    title: "Private Label Packaging",
    description:
      "Custom packaging solutions for your brand with our premium products. Complete branding services including design, packaging, and labeling.",
    image: "/private-label-packaging.png",
    icon: "📦",
    features: [
      "Custom Brand Design",
      "Flexible Packaging",
      "Quality Assurance",
      "Fast Turnaround",
    ],
    benefits: "Perfect for retailers creating branded natural product lines.",
  },
  {
    id: 2,
    title: "Bulk Export Services",
    description:
      "Large quantity exports with quality assurance and timely delivery. Complete export services with documentation and logistics coordination.",
    image: "/bulk-export-services.png",
    icon: "🚢",
    features: [
      "International Shipping",
      "Quality Certificates",
      "Custom Documentation",
      "Logistics Support",
    ],
    benefits:
      "Ideal for international distributors and large-scale manufacturers.",
  },
  {
    id: 3,
    title: "Corporate Gifting",
    description:
      "Curated gift sets featuring authentic Sri Lankan products. Perfect for corporate events, employee appreciation, and client gifts.",
    image: "/corporate-gifting.png",
    icon: "🎁",
    features: [
      "Curated Gift Sets",
      "Custom Presentation",
      "Bulk Discounts",
      "Corporate Branding",
    ],
    benefits: "Memorable gifts reflecting quality and cultural authenticity.",
  },
  {
    id: 4,
    title: "Online Ordering Platform",
    description:
      "Convenient online platform for easy ordering and tracking. Digital solution with real-time inventory and automated quotes.",
    image: "/online-ordering-platform.png",
    icon: "💻",
    features: [
      "Real-time Inventory",
      "Automated Quotes",
      "Order Tracking",
      "24/7 Access",
    ],
    benefits: "Streamlined ordering process with complete transparency.",
  },
  {
    id: 5,
    title: "Quality Consultation",
    description:
      "Expert consultation on product selection and quality standards. Professional guidance for optimal product selection.",
    image: "/quality-consultation.png",
    icon: "🔍",
    features: [
      "Product Selection",
      "Quality Standards",
      "Market Analysis",
      "Compliance Support",
    ],
    benefits: "Professional guidance for optimal market requirements.",
  },
  {
    id: 6,
    title: "Supply Chain Solutions",
    description:
      "End-to-end supply chain management from sourcing to delivery. Complete process management for consistent quality.",
    image: "/supply-chain-solutions.png",
    icon: "⚡",
    features: [
      "End-to-end Management",
      "Inventory Planning",
      "Risk Management",
      "Cost Optimization",
    ],
    benefits: "Complete supply chain management reducing complexity.",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 nature-texture">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary-dark mb-6 animate-float">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions tailored to meet your business needs with
            premium quality and professional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className={`premium-card group bg-white shadow-lg hover:shadow-2xl border-0 overflow-hidden animate-fade-in-up stagger-${
                index + 1
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 gradient-overlay opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                <div className="absolute top-6 left-6 glass-effect rounded-full w-14 h-14 flex items-center justify-center text-3xl animate-float">
                  {service.icon}
                </div>

                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="font-heading font-bold text-xl text-white mb-2 drop-shadow-lg">
                    {service.title}
                  </h3>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="text-gray-700 text-sm mb-6 leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-heading font-semibold text-sm text-primary-dark mb-3">
                    Key Features:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center text-xs text-gray-600"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse-glow"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg mb-6 border-l-4 border-primary">
                  <p className="text-xs text-gray-700 font-medium italic">
                    {service.benefits}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 rounded-full"
                  >
                    Learn More
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white text-xs font-semibold transition-all duration-300 rounded-full"
                  >
                    Get Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fixed SVG URL encoding issue */}
        <div className="mt-20 animate-fade-in-up animate-delay-500">
          <div className="bg-gradient-to-r from-primary via-primary-dark to-secondary text-white rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 nature-texture opacity-30"></div>
            <div className="relative z-10 text-center">
              <h3 className="font-heading font-bold text-3xl md:text-4xl mb-6 animate-float">
                Need a Custom Solution?
              </h3>
              <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
                Our expert team can create tailored solutions to meet your
                specific business requirements. Contact us to discuss your
                unique needs and discover how we can help your business grow.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary-dark hover:bg-gray-100 px-12 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 rounded-full border-0"
              >
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
