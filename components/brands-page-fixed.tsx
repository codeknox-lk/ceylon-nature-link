"use client";

import React from "react";
import Link from "next/link";
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
    <section className="pt-20 lg:pt-24 min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-green-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-green-50/50"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-green-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-emerald-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                  Our
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">
                    Premium Brands
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Discover our carefully curated collection of premium Sri Lankan brands, each representing the finest quality and authentic heritage of Ceylon's natural treasures.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products-filter">
                  <Button className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
                    Explore Products
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105">
                    Partner With Us
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Visual */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/sri-lankan-countryside.png"
                  alt="Sri Lankan Countryside"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Authentic Sri Lankan Heritage</h3>
                  <p className="text-lg opacity-90">Premium quality from the heart of Ceylon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Our Brand Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each brand in our portfolio represents a commitment to excellence, authenticity, and the rich heritage of Sri Lankan agriculture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {brands.map((brand, index) => (
            <Card key={brand.id} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} Logo`}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{brand.name}</h3>
                    <p className="text-emerald-600 font-medium">{brand.yearEstablished}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {brand.longDescription}
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Key Products:</h4>
                    <div className="flex flex-wrap gap-2">
                      {brand.products.map((product, idx) => (
                        <span key={idx} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {brand.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={`/products-filter?brand=${brand.name}`}>
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0 mb-2">
                      Explore {brand.name}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Company Story */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-8">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
              <p className="text-xl mb-6">
                Established in 2025, <strong>Ceylon Nature Link (Pvt) Ltd</strong> was founded with a mission to bring Sri Lanka's timeless agricultural treasures to the global stage. From the lush highlands that produce world-famous spices to the tropical orchards that yield fruits of unrivaled sweetness, we transform these gifts of nature into premium dehydrated fruits, spices, and herbal products—crafted to enrich lives and honor our heritage.
              </p>
              <p className="text-xl mb-6">
                Our brands represent more than just products; they are ambassadors of Sri Lankan excellence, carrying forward centuries of agricultural wisdom and the natural abundance that makes our island nation truly special.
              </p>
              <p className="text-xl">
                <strong className="text-emerald-600">Ceylon Nature Link</strong> – Where nature's finest meets global standards, bringing the authentic taste and quality of Sri Lanka to the world.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Experience Premium Quality?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Join us in celebrating the authentic flavors and natural goodness of Sri Lanka. Explore our products and discover why Ceylon Nature Link is your trusted partner for premium agricultural products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products-filter">
              <Button className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
                Browse All Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl lg:text-3xl text-gray-700 italic leading-relaxed">
              "From the fertile soils of Sri Lanka to your table, we bring you nature's finest treasures, carefully nurtured and expertly processed to preserve their authentic quality and natural goodness."
            </blockquote>
            <p className="text-lg text-gray-600 mt-6 font-medium">
              <strong className="text-emerald-600">Ceylon Nature Link</strong> – Your gateway to authentic Sri Lankan excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
