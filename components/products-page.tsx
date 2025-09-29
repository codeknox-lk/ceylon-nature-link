"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const productCategories = [
  {
    id: 1,
    name: "Spices",
    description:
      "Premium Ceylon spices including Cinnamon, Cardamom, Clove and Pepper",
    longDescription:
      "Discover the authentic taste of Sri Lanka with our premium spice collection. From the world-famous Ceylon cinnamon to aromatic cardamom, pungent black pepper, and fragrant cloves, each spice is carefully sourced and processed to maintain its natural flavor and aroma.",
    image: "/sri-lankan-spices.png",
    icon: "",
    features: ["100% Natural", "Premium Quality", "Export Grade"],
    products: [
      "Cinnamon Sticks",
      "Cardamom Pods",
      "Black Pepper",
      "Clove",
    ],
  },
  {
    id: 2,
    name: "Herbal Products",
    description: "Traditional Ayurvedic herbs and wellness products",
    longDescription:
      "Embrace the healing power of traditional Ayurvedic herbs. Our herbal products combine ancient wisdom with modern quality standards, offering natural solutions for wellness and vitality.",
    image: "/sri-lankan-herbal-plants.png",
    icon: "",
    features: ["Ayurvedic", "Traditional Recipes", "Wellness Focus"],
    products: [
      "Moringa Tea",
      "Cinnamon Tea",
    ],
  },
  {
    id: 3,
    name: "Dehydrated Fruits",
    description: "Naturally dried tropical fruits preserving authentic flavors",
    longDescription:
      "Taste the tropics in every bite with our naturally dehydrated fruits. We preserve the authentic flavors and nutrients of Sri Lanka's finest produce using traditional drying methods.",
    image: "/sri-lankan-dehydrated-fruits.png",
    icon: "",
    features: ["No Preservatives", "Rich in Nutrients", "Natural Drying"],
    products: [
      "Dehydrated Mango",
      "Dehydrated Jackfruit",
    ],
  },
];

export default function ProductsPage() {
  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-green-50/30">
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
                  <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Premium Products</span>
                </div>
                <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-emerald-600 mb-6 leading-tight">
                  Our Premium Products
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Explore our diverse range of premium Sri Lankan natural products, carefully selected and processed to maintain their authentic quality and traditional heritage.
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">3</div>
                  <div className="text-sm text-gray-600">Product Categories</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600">Natural Quality</div>
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
                    src="/sri-lankan-export-quality.png"
                    alt="Sri Lankan premium products"
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

      {/* Products Section */}
      <div className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary-dark mb-6">
              Product Categories
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Discover our carefully curated collection of premium Sri Lankan natural products, each representing the finest quality and authentic heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {productCategories.map((category, index) => (
              <Card
                key={category.id}
                className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-2xl bg-white/20 backdrop-blur-lg rounded-3xl hover:scale-105 border border-white/30 premium-card"
              >
                <div className="relative overflow-hidden rounded-t-3xl">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {category.icon && (
                    <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg">
                      {category.icon}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    Premium
                  </div>
                </div>

                <CardContent className="p-6 rounded-b-3xl">
                  <h3 className="font-heading font-bold text-xl text-primary-dark mb-3 group-hover:text-primary transition-colors duration-300">
                    {category.name}
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {category.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Product List */}
                  <div className="mb-6">
                    <p className="text-gray-500 text-xs font-semibold mb-2 uppercase tracking-wide">
                      Popular Products:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {category.products.map((product, idx) => (
                        <span
                          key={idx}
                          className="text-gray-600 text-xs bg-gray-100 px-2 py-1 rounded"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 flex flex-col items-center">
                    <Link
                      href={`/products-filter?category=${category.name.toLowerCase().replace(' ', '-')}`}
                      className="w-full"
                    >
                      <Button className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0 mb-2">
                        View Products
                      </Button>
                    </Link>

                    <Link href="/contact" className="w-full">
                      <Button
                        size="sm"
                        className="w-full border border-primary bg-white text-primary hover:bg-white hover:scale-105 transition-all duration-300"
                      >
                        Request Quote
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 animate-fade-in-up animate-delay-500">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="font-heading font-bold text-2xl text-primary-dark mb-4">
                Looking for Custom Solutions?
              </h3>
              <p className="text-gray-600 mb-6">
                We offer private labeling, bulk orders, and custom packaging
                solutions for businesses worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
                <Link href="/services">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                  >
                    Explore Services
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="border border-primary bg-white text-primary hover:bg-white hover:scale-105 px-8 py-3 font-semibold transition-all duration-300"
                  >
                    Get Custom Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}