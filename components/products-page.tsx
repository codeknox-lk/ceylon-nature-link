"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    category: "Spices",
    name: "Premium Ceylon Spices",
    description:
      "Authentic Sri Lankan spices including cinnamon, cardamom, pepper, and cloves. Hand-selected from the finest estates and processed using traditional methods to preserve their natural oils and flavors.",
    image: "/sri-lankan-spices.png",
    price: "From $15.99",
    features: [
      "100% Pure Ceylon Origin",
      "Hand-Selected Quality",
      "Traditional Processing",
      "Export Grade",
    ],
    products: [
      "Ceylon Cinnamon",
      "Black Pepper",
      "Cardamom",
      "Cloves",
      "Nutmeg",
      "Turmeric",
    ],
  },
  {
    id: 2,
    category: "Tea",
    name: "Ceylon Tea Collection",
    description:
      "World-renowned Ceylon tea from the highland estates of Sri Lanka. Our collection includes black tea, green tea, and specialty blends that capture the unique terroir of our mountain regions.",
    image: "/ceylon-tea-leaves.png",
    price: "From $18.99",
    features: [
      "Highland Estate Tea",
      "Single Origin",
      "BOPF Grade",
      "Sustainable Sourcing",
    ],
    products: [
      "Earl Grey",
      "English Breakfast",
      "Green Tea",
      "White Tea",
      "Herbal Blends",
      "Flavored Teas",
    ],
  },
  {
    id: 3,
    category: "Herbal Products",
    name: "Ayurvedic Herbal Products",
    description:
      "Traditional Sri Lankan herbal products based on ancient Ayurvedic wisdom. Our range includes medicinal herbs, wellness teas, and natural remedies that have been used for centuries in Sri Lankan traditional medicine.",
    image: "/sri-lankan-herbal-plants.png",
    price: "From $12.99",
    features: [
      "Traditional Ayurvedic",
      "Medicinal Properties",
      "Natural Processing",
      "Wellness Focus",
    ],
    products: [
      "Moringa Powder",
      "Cinnamon Tea",
      "Herbal Teas",
      "Medicinal Herbs",
      "Wellness Blends",
      "Natural Remedies",
    ],
  },
  {
    id: 4,
    category: "Dehydrated Fruits",
    name: "Tropical Dehydrated Fruits",
    description:
      "Premium dehydrated fruits from Sri Lanka's tropical paradise. Our fruits are carefully selected and processed using advanced dehydration technology to preserve their natural taste, nutrients, and vibrant colors.",
    image: "/sri-lankan-dehydrated-fruits.png",
    price: "From $9.99",
    features: [
      "Tropical Fruits",
      "Natural Drying",
      "Nutrient Preservation",
      "No Additives",
    ],
    products: [
      "Dehydrated Mango",
      "Dehydrated Jackfruit",
      "Coconut Chips",
      "Pineapple Slices",
      "Banana Chips",
      "Mixed Fruit Mix",
    ],
  },
];

export default function ProductsPage() {
  return (
    <section className="pt-20 lg:pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div>
              <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-orange-600 mb-6">
                Our Products
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Each product represents our commitment to quality, authenticity, and the rich heritage of Sri Lankan natural products.
              </p>
            </div>
          </div>
          
          {/* Right side - Image container */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-orange-200/30 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                <img
                  src="/sri-lankan-export-quality.png"
                  alt="Sri Lankan export quality products"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="container mx-auto px-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-sm premium-card h-full"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {product.category}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-heading font-bold text-2xl text-white mb-2 drop-shadow-lg">
                      {product.name}
                    </h3>
                    <p className="text-orange-200 font-semibold text-lg">
                      {product.price}
                    </p>
                  </div>
                </div>

                <CardContent className="p-8">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-heading font-semibold text-lg text-orange-800 mb-3">
                      Key Features
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-heading font-semibold text-lg text-orange-800 mb-3">
                      Available Products
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.products.map((item, index) => (
                        <span
                          key={index}
                          className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold transition-all duration-300"
                    >
                      Get Quote
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
