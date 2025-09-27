import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const brands = [
  {
    id: 1,
    name: "Saadambara",
    description: "Premium Spices from the Heart of Sri Lanka",
    longDescription:
      "Saadambara is a premium Sri Lankan spice brand that represents the true excellence of Ceylon spices. Our spices are carefully sourced from the finest farms across Sri Lanka, where fertile soil and tropical climates produce the most aromatic and flavorful harvests.",
    logo: "/brand-logos/Saadambara.png",
    products: ["Black Pepper", "Cinnamon", "Cloves", "Cardamom"],
    features: [
      "Premium Spices",
      "Advanced Processing",
      "Farm to Table Traceability",
      "Export Standards",
    ],
    yearEstablished: "2025",
    certifications: ["GMP (Under Process)"],
  },
  {
    id: 2,
    name: "Trekola",
    description: "Authentic Sri Lankan Herbal Teas & Dehydrated Fruits",
    longDescription:
      "Trekola brings you the authentic goodness of Sri Lanka through a unique range of herbal teas and dehydrated fruits. Carefully harvested from trusted farms, our products are processed using modern dehydration technology to lock in natural taste, nutrients, and aroma while preserving their health benefits.",
    logo: "/brand-logos/Trekola.png",
    products: ["Moringa Tea", "Cinnamon Tea", "Dehydrated Mango", "Dehydrated Jackfruit"],
    features: [
      "100% Natural",
      "Nutrient-Rich Processing",
      "Authentic Sri Lankan Taste",
      "Premium Export Quality",
    ],
    yearEstablished: "2025",
    certifications: ["GMP (Under Process)"],
  },
];

export default function BrandsShowcase() {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {brands.map((brand) => (
            <Card
              key={brand.id}
              className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-sm premium-card h-full"
            >
              <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                {/* Logo and Basic Info */}
                <div className="text-center mb-8">
                  <div className="mb-6">
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={`${brand.name} logo`}
                      width={160}
                      height={160}
                      className="mx-auto h-32 lg:h-40 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-xl lg:text-2xl text-primary-dark mb-4 group-hover:text-primary transition-colors duration-300">
                    {brand.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
                    {brand.description}
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-xs lg:text-sm text-gray-500">
                    <span>Est. {brand.yearEstablished}</span>
                    <span>•</span>
                    <span>Premium Quality</span>
                  </div>
                </div>

                {/* Long Description */}
                <div className="mb-6 flex-grow">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {brand.longDescription}
                  </p>
                </div>

                {/* Products */}
                <div className="mb-6">
                  <p className="text-gray-500 text-xs font-semibold mb-3 uppercase tracking-wide">
                    Popular Products:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {brand.products.map((product, idx) => (
                      <span
                        key={idx}
                        className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <p className="text-gray-500 text-xs font-semibold mb-3 uppercase tracking-wide">
                    Key Features:
                  </p>
                  <div className="space-y-2">
                    {brand.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-6">
                  <p className="text-gray-500 text-xs font-semibold mb-3 uppercase tracking-wide">
                    Certifications:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {brand.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full font-medium"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 mt-auto">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0 mb-2">
                    Explore {brand.name}
                  </Button>
                  <Button
                    size="sm"
                    className="w-full border border-primary bg-white text-primary hover:bg-white hover:scale-105 transition-all duration-300"
                  >
                    Request Samples
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
