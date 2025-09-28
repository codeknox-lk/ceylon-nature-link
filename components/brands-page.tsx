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
      <div className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {brands.map((brand) => (
              <Card
                key={brand.id}
                className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-sm premium-card h-full"
              >
                <CardContent className="p-8">
                  {/* Brand Header */}
                  <div className="mb-6">
                    <h3 className="font-heading font-bold text-2xl text-emerald-800 mb-2">
                      {brand.name}
                    </h3>
                    <p className="text-emerald-600 font-medium mb-2">
                      {brand.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Est. {brand.yearEstablished}</span>
                      <span>Premium Quality</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {brand.longDescription}
                  </p>

                  {/* Popular Products */}
                  <div className="mb-6">
                    <h4 className="font-heading font-semibold text-lg text-emerald-800 mb-3">
                      Popular Products
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {brand.products.map((product, index) => (
                        <span
                          key={index}
                          className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="font-heading font-semibold text-lg text-emerald-800 mb-3">
                      Key Features
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {brand.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {brand.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
                      Explore {brand.name}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold transition-all duration-300"
                    >
                      Request Samples
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
