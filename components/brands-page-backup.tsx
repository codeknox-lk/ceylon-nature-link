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
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3 animate-bounce">🌿</span>
                  <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Premium Brands</span>
                </div>
                <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-emerald-600 mb-6 leading-tight">
                  Our Premium Brands
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Discover our carefully curated collection of premium Sri Lankan brands, each representing the finest quality and authentic heritage. Every brand tells a story of tradition, quality, and excellence.
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">2</div>
                  <div className="text-sm text-gray-600">Premium Brands</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">2025</div>
                  <div className="text-sm text-gray-600">Established</div>
                </div>
              </div>
            </div>
            
            {/* Right side - Image container */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/40 to-green-300/40 rounded-3xl transform rotate-3 animate-pulse"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-emerald-100/60 to-green-200/60 rounded-3xl transform -rotate-2"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                  <Image
                    src="/corporate-gift-sets.png"
                    alt="Corporate gift sets"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Showcase */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-emerald-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
              <span className="text-2xl">🏷️</span>
            </div>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-emerald-800 mb-6">
              Meet Our Brands
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Each brand represents our commitment to quality, authenticity, and the rich heritage of Sri Lankan natural products.
            </p>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 max-w-6xl mx-auto">
            {brands.map((brand, index) => (
              <Card
                key={brand.id}
                className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-xl bg-white/95 backdrop-blur-lg premium-card h-full transform hover:scale-105 hover:-translate-y-2"
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
                    <h3 className="font-heading font-bold text-xl text-emerald-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
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

                  {/* Products */}
                  <div className="mb-6">
                    <h4 className="font-heading font-semibold text-sm text-emerald-700 mb-3">
                      Popular Products:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {brand.products.map((product, idx) => (
                        <span
                          key={idx}
                          className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-medium"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-heading font-semibold text-sm text-emerald-700 mb-3">
                      Key Features:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {brand.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <span className="text-emerald-600 text-sm">✓</span>
                          <span className="text-gray-600 text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mb-6">
                    <h4 className="font-heading font-semibold text-sm text-emerald-700 mb-3">
                      Certifications:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {brand.certifications.map((cert, idx) => (
                        <span
                          key={idx}
                          className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-medium"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto">
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0 mb-2">
                      Explore {brand.name}
                    </Button>

                    <Button
                      size="sm"
                      className="w-full border border-emerald-600 bg-white text-emerald-600 hover:bg-emerald-50 hover:scale-105 transition-all duration-300"
                    >
                      Request Samples
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Brand Story Section */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-3xl p-12 lg:p-16 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/20 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
            <div>
              <h3 className="font-heading font-bold text-3xl lg:text-4xl text-emerald-800 mb-8">
                Our Brand Story
              </h3>
              <div className="space-y-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Established in 2025, <strong>Ceylon Nature Link (Pvt) Ltd</strong> was founded with a mission to bring Sri Lanka's timeless agricultural treasures to the global stage. From the lush highlands that produce world-famous spices to the tropical orchards that yield fruits of unrivaled sweetness, we transform these gifts of nature into premium dehydrated fruits, spices, and herbal products—crafted to enrich lives and honor our heritage.
                </p>
                
                <div className="flex items-start space-x-4">
                    <div>
                      <span className="text-emerald-600 text-xl">🍃</span>
                    </div>
                    <div>
                      <h4 className="text-gray-700 font-semibold text-lg mb-2">
                        Rooted in Heritage, Grown with Care
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Our journey begins with the farmers of Sri Lanka, who nurture every crop using sustainable and traditional methods passed down through generations. By partnering directly with these communities, we ensure authenticity, purity, and fairness at every step. Each product carries the story of our land, our people, and their dedication to natural excellence.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div>
                      <span className="text-emerald-600 text-xl">🔥</span>
                    </div>
                    <div>
                      <h4 className="text-gray-700 font-semibold text-lg mb-2">
                        Crafted with Innovation, Preserved with Purity
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        At CNL, we blend ancient wisdom with modern technology. Our advanced dehydration and processing methods lock in natural flavors, vibrant colors, and vital nutrients—without chemicals or additives. The result is a collection of products that embody the essence of Sri Lanka: bold in taste, rich in aroma, and uncompromising in quality.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div>
                      <span className="text-emerald-600 text-xl">🌍</span>
                    </div>
                    <div>
                      <h4 className="text-gray-700 font-semibold text-lg mb-2">
                        Connecting Sri Lanka to the World
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Though deeply rooted in Sri Lankan soil, our vision is global. With a focus on ethical trade, eco-friendly packaging, and premium quality, we aim to share the island's bounty with health-conscious consumers, retailers, and culinary creators worldwide. Each shipment from CNL is more than a product—it's an invitation to experience Sri Lanka's rich natural heritage.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div>
                      <span className="text-emerald-600 text-xl">✨</span>
                    </div>
                    <div>
                      <h4 className="text-gray-700 font-semibold text-lg mb-2">
                        Our Commitment
                      </h4>
                      <ul className="text-gray-600 text-sm leading-relaxed space-y-1">
                        <li>• To deliver products that are natural, chemical-free, and full of goodness</li>
                        <li>• To empower farming communities through fair trade and sustainable practices</li>
                        <li>• To innovate continuously while preserving Sri Lanka's authenticity</li>
                        <li>• To be a trusted global ambassador of Sri Lankan flavors and wellness</li>
                      </ul>
                    </div>
                  </div>
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="bg-gradient-to-br from-white/90 to-emerald-50/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                  <div className="text-center">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <span className="text-3xl text-white">🌿</span>
                      </div>
                    </div>
                    <h4 className="font-heading font-bold text-2xl lg:text-3xl text-emerald-800 mb-6">
                      Partner With Our Brands
                    </h4>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Join us in bringing authentic Sri Lankan quality to your customers. 
                      Partner with our brands and be part of our story.
                    </p>
                    <Button className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
                      Become a Partner
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="mt-16 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-3xl p-12 lg:p-16 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-green-600/90"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
            
            <div className="relative z-10 text-center">
              <div className="mb-6">
                <span className="text-4xl animate-bounce">🌿</span>
              </div>
              <p className="text-white text-2xl md:text-3xl lg:text-4xl font-light italic tracking-wide leading-relaxed"
                 style={{ fontFamily: 'Georgia, serif' }}>
                <strong className="relative inline-block transform hover:scale-105 transition-transform duration-500">
                  Ceylon Nature Link – Nature's Legacy, Shared with the World.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}