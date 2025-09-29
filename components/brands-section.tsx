"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
      "Export Standards", // Updated
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

export default function BrandsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white nature-texture">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary-dark mb-8">
            Our Premium Brands
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Discover our carefully curated collection of premium Sri Lankan
            brands, each representing the finest quality and authentic heritage.
            Every brand tells a story of tradition, quality, and excellence.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 max-w-6xl mx-auto">
          {brands.map((brand, index) => (
            <Card
              key={brand.id}
              className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-sm premium-card h-full"
            >
              <CardContent className="p-4 h-full flex flex-col">
                {/* Logo and Basic Info */}
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={`${brand.name} logo`}
                      width={200}
                      height={200}
                      className="mx-auto h-40 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-primary-dark mb-2 group-hover:text-primary transition-colors duration-300">
                    {brand.name}
                  </h3>
                  <p className="text-gray-600 mb-2 leading-relaxed text-sm">
                    {brand.description}
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                    <span>Est. {brand.yearEstablished}</span>
                    <span>•</span>
                    <span>Premium Quality</span>
                  </div>
                </div>

                {/* Short Description */}
                <div className="mb-3 flex-grow">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {brand.longDescription}
                  </p>
                </div>

                {/* Products */}
                <div className="mb-3">
                  <p className="text-gray-500 text-xs font-semibold mb-1 uppercase tracking-wide">
                    Popular Products:
                  </p>
                  <div className="flex flex-wrap gap-1">
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
                <div className="mb-3">
                  <p className="text-gray-500 text-xs font-semibold mb-1 uppercase tracking-wide">
                    Key Features:
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {brand.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-1">
                        <span className="text-primary text-xs">✓</span>
                        <span className="text-gray-600 text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-3">
                  <p className="text-gray-500 text-xs font-semibold mb-1 uppercase tracking-wide">
                    Certifications:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {brand.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="bg-accent/10 text-accent text-xs px-2 py-1 rounded font-medium"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto">
                  <Link
                    href={`/products-filter?brand=${brand.name}`}
                  >
                    <Button className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0 mb-2">
                      Explore {brand.name}
                    </Button>
                  </Link>

                  <Link href="/contact">
                    <Button
                      size="sm"
                      className="w-full border border-primary bg-white text-primary hover:bg-white hover:scale-105 transition-all duration-300"
                    >
                      Request Samples
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Brand Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-16">
          <div className="animate-fade-in-up">
            <h3 className="font-heading font-bold text-3xl lg:text-4xl text-primary-dark mb-8">
              Our Brand Story
            </h3>
            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                Established in 2025, <strong>Ceylon Nature Link (Pvt) Ltd</strong> was founded with a mission to bring Sri Lanka's timeless agricultural treasures to the global stage. From the lush highlands that produce world-famous spices to the tropical orchards that yield fruits of unrivaled sweetness, we transform these gifts of nature into premium dehydrated fruits, spices, and herbal products—crafted to enrich lives and honor our heritage.
              </p>
              
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-primary text-xl">🍃</span>
                </div>
                <div>
                  <h4 className="text-gray-700 font-semibold text-lg">
                    Rooted in Heritage, Grown with Care
                  </h4>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-primary text-xl">🔥</span>
                </div>
                <div>
                  <h4 className="text-gray-700 font-semibold text-lg">
                    Crafted with Innovation, Preserved with Purity
                  </h4>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-primary text-xl">🌍</span>
                </div>
                <div>
                  <h4 className="text-gray-700 font-semibold text-lg">
                    Connecting Sri Lanka to the World
                  </h4>
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
                    <span className="text-2xl text-white">🤝</span>
                  </div>
                  <h4 className="font-heading font-bold text-3xl text-primary-dark mb-4">
                    Partner With Our Brands
                  </h4>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                    Whether you're looking to distribute our brands or create your
                    own private label, we offer flexible partnership opportunities
                    for businesses worldwide.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Link href="/products-filter" className="flex-1">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0 py-3"
                    >
                      View All Brands
                    </Button>
                  </Link>
                  <Link href="/contact" className="flex-1">
                    <Button
                      size="lg"
                      className="w-full border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white hover:scale-105 font-semibold transition-all duration-300 py-3"
                    >
                      Become a Partner
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer between sections */}
      <div className="h-16 lg:h-20"></div>
      
      {/* Full-width company tagline */}
      <div className="w-full bg-white py-16">
        <div className="w-full">
          <p className="text-center text-green-600 text-2xl md:text-3xl lg:text-4xl font-light italic tracking-wide px-4" 
             style={{ fontFamily: 'Georgia, serif' }}>
            <strong className="relative inline-block transform hover:scale-105 transition-transform duration-500 hover:text-green-700">
              Ceylon Nature Link – Nature's Legacy, Shared with the World.
              <span className="absolute -top-2 -right-2 text-green-500 text-xl animate-bounce">🌿</span>
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}
