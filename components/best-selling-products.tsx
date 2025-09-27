"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Ceylon Cinnamon Sticks",
    variant: "Premium Grade",
    image: "/ceylon-cinnamon-sticks.png",
    price: "$24.99",
  },
  {
    id: 2,
    name: "Earl Grey Tea Blend",
    variant: "Classic Blend",
    image: "/earl-grey-tea-blend.png",
    price: "$18.99",
  },
  {
    id: 3,
    name: "Dried Mango Strips",
    variant: "Natural Dried",
    image: "/dried-mango-strips.png",
    price: "$12.99",
  },
  {
    id: 4,
    name: "Turmeric Powder",
    variant: "High Curcumin",
    image: "/ceylon-turmeric-powder.png",
    price: "$15.99",
  },
  {
    id: 5,
    name: "Herbal Wellness Tea",
    variant: "Ayurvedic Blend",
    image: "/sri-lankan-herbal-plants.png",
    price: "$22.99",
  },
  {
    id: 6,
    name: "Cardamom Pods",
    variant: "Green Cardamom",
    image: "/sri-lankan-spices.png",
    price: "$19.99",
  },
]

export default function BestSellingProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 5
  const totalPages = Math.ceil(products.length / itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const currentProducts = products.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  )

  return (
    <section className="py-16 bg-white border-2 border-red-500">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-gray-500 text-sm mb-2">Tagline</p>
            <h2 className="text-4xl font-bold text-black mb-4">Products</h2>
            <p className="text-gray-600 max-w-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <Button
            variant="outline"
            className="border border-gray-300 text-black hover:bg-gray-50 px-6 py-2 rounded-lg"
          >
            View all
          </Button>
        </div>

        {/* Product Grid */}
        <div className="relative mb-8 overflow-hidden">
          <div className="flex gap-6 transition-transform duration-300 ease-in-out">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-64 bg-white"
              >
                <div className="bg-gray-100 h-48 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-black text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.variant}</p>
                  <p className="font-bold text-black text-lg">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          {/* Pagination Dots */}
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-black' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
