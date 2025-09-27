"use client"

import { useState, useEffect, useRef } from "react"
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
  {
    id: 7,
    name: "Black Pepper",
    variant: "Whole Peppercorns",
    image: "/sri-lankan-spices.png",
    price: "$16.99",
  },
  {
    id: 8,
    name: "Clove",
    variant: "Whole Cloves",
    image: "/sri-lankan-spices.png",
    price: "$14.99",
  },
]

export default function BestSellingProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Duplicate products for seamless scrolling
  const duplicatedProducts = [...products, ...products]

  // Auto-scroll functionality
  useEffect(() => {
    if (!isPaused && !isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length)
      }, 3000) // Scroll every 3 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, isHovered])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-gray-500 text-sm mb-2">Best Selling Products</p>
            <h2 className="text-4xl font-bold text-black mb-4">Products</h2>
            <p className="text-gray-600 max-w-2xl">
              Discover our premium Sri Lankan products with authentic quality and traditional heritage.
            </p>
          </div>
          <Button
            variant="outline"
            className="border border-gray-300 text-black hover:bg-gray-50 px-6 py-2 rounded-lg"
          >
            View all
          </Button>
        </div>

        {/* Auto-scrolling Product Carousel */}
        <div 
          className="relative mb-8 overflow-hidden"
          onMouseEnter={() => {
            setIsHovered(true)
            setIsPaused(true)
          }}
          onMouseLeave={() => {
            setIsHovered(false)
            setIsPaused(false)
          }}
        >
          <div 
            ref={scrollRef}
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 280}px)`,
            }}
          >
            {duplicatedProducts.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="bg-gray-100 h-48 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2 p-4">
                  <h3 className="font-bold text-black text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.variant}</p>
                  <p className="font-bold text-black text-lg">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Hidden Arrow Buttons - Only show on hover */}
          {isHovered && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 border border-gray-300 rounded-full flex items-center justify-center hover:bg-white shadow-lg transition-all duration-300 z-10"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 border border-gray-300 rounded-full flex items-center justify-center hover:bg-white shadow-lg transition-all duration-300 z-10"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
