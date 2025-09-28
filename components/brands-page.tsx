"use client";

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

export default function BrandsPage() {
  return (
    <section className="pt-20 lg:pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div>
              <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-emerald-600 mb-6">
                Our Brands
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Discover our carefully curated collection of premium Sri Lankan brands, each representing the finest quality and authentic heritage. Every brand tells a story of tradition, quality, and excellence.
              </p>
            </div>
          </div>
          
          {/* Right side - Image container */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-emerald-200/30 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                <img
                  src="/corporate-gift-sets.png"
                  alt="Corporate gift sets"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Showcase */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white nature-texture">
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
                <CardContent className="p-6 h-full flex flex-col">
                  {/* Logo and Basic Info */}
                  <div className="text-center mb-6">
                    <div className="mb-4">
                      <img
                        src={brand.logo || "/placeholder.svg"}
                        alt={`${brand.name} logo`}
                        className="mx-auto h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-primary-dark mb-3 group-hover:text-primary transition-colors duration-300">
                      {brand.name}
                    </h3>
                    <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                      {brand.description}
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <span>Est. {brand.yearEstablished}</span>
                      <span>•</span>
                      <span>Premium Quality</span>
                    </div>
                  </div>

                  {/* Short Description */}
                  <div className="mb-4 flex-grow">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {brand.longDescription}
                    </p>
                  </div>

                  {/* Products */}
                  <div className="mb-4">
                    <p className="text-gray-500 text-xs font-semibold mb-2 uppercase tracking-wide">
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
                  <div className="mb-4">
                    <p className="text-gray-500 text-xs font-semibold mb-2 uppercase tracking-wide">
                      Key Features:
                    </p>
                    <div className="space-y-1">
                      {brand.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <span className="text-primary text-sm">✓</span>
                          <span className="text-gray-600 text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mb-4">
                    <p className="text-gray-500 text-xs font-semibold mb-2 uppercase tracking-wide">
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
                      Crafted with Passion, Delivered with Pride
                    </h4>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div>
                    <span className="text-primary text-xl">🌍</span>
                  </div>
                  <div>
                    <h4 className="text-gray-700 font-semibold text-lg">
                      From Sri Lanka to the World
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-up animate-delay-200">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 shadow-2xl">
                  <div className="text-center">
                    <div className="mb-6">
                      <span className="text-6xl">🌿</span>
                    </div>
                    <h4 className="font-heading font-bold text-2xl lg:text-3xl text-primary-dark mb-6">
                      Partner With Our Brands
                    </h4>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Join us in bringing authentic Sri Lankan quality to your customers. 
                      Partner with our brands and be part of our story.
                    </p>
                    <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
                      Become a Partner
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tagline */}
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
        </div>
      </div>
    </section>
  );
}
