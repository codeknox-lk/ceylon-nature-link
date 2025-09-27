"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Ceylon Cinnamon Sticks",
    variant: "Premium Grade",
    image: "/ceylon-cinnamon-sticks.png",
    brand: "Saadambara",
  },
  {
    id: 2,
    name: "Earl Grey Tea Blend",
    variant: "Classic Blend",
    image: "/earl-grey-tea-blend.png",
    brand: "Trekola",
  },
  {
    id: 3,
    name: "Dried Mango Strips",
    variant: "Natural Dried",
    image: "/sri-lankan-dehydrated-fruits.png",
    brand: "Trekola",
  },
  {
    id: 4,
    name: "Turmeric Powder",
    variant: "High Curcumin",
    image: "/ceylon-turmeric-powder.png",
    brand: "Saadambara",
  },
  {
    id: 5,
    name: "Herbal Wellness Tea",
    variant: "Ayurvedic Blend",
    image: "/sri-lankan-herbal-plants.png",
    brand: "Trekola",
  },
  {
    id: 6,
    name: "Cardamom Pods",
    variant: "Green Cardamom",
    image: "/sri-lankan-spices.png",
    brand: "Saadambara",
  },
  {
    id: 7,
    name: "Black Pepper",
    variant: "Whole Peppercorns",
    image: "/sri-lankan-spices.png",
    brand: "Saadambara",
  },
  {
    id: 8,
    name: "Clove",
    variant: "Whole Cloves",
    image: "/sri-lankan-spices.png",
    brand: "Saadambara",
  },
]

export default function BestSellingProducts() {
  const [isHovered, setIsHovered] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  // Duplicate products for seamless marquee effect
  const duplicatedProducts = [...products, ...products, ...products]

  // Auto-scroll marquee functionality
  useEffect(() => {
    const animate = () => {
      if (!isPaused && !isHovered) {
        setScrollPosition((prev) => {
          const cardWidth = 280 // 256px card + 24px gap
          const maxScroll = cardWidth * products.length
          return (prev + 1.5) % maxScroll // Faster continuous scroll
        })
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPaused, isHovered, products.length])

  const nextSlide = () => {
    const cardWidth = 280
    setScrollPosition((prev) => (prev + cardWidth) % (cardWidth * products.length))
  }

  const prevSlide = () => {
    const cardWidth = 280
    setScrollPosition((prev) => (prev - cardWidth + (cardWidth * products.length)) % (cardWidth * products.length))
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-gray-500 text-sm mb-2">Best Selling Products</p>
              <h2 className="text-4xl font-bold text-black mb-4">Products</h2>
            </div>
            <Button
              variant="outline"
              className="border border-gray-300 text-black hover:bg-gray-50 px-6 py-2 rounded-lg flex-shrink-0 ml-6"
            >
              View all
            </Button>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Discover our premium Sri Lankan products with authentic quality and traditional heritage.
          </p>
        </div>

        {/* Auto-scrolling Product Carousel */}
        <div 
          className="relative mb-8 overflow-hidden"
          style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}
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
            className="flex gap-4 px-4 sm:px-6 lg:px-8"
            style={{
              transform: `translateX(-${scrollPosition}px)`,
              width: `${duplicatedProducts.length * 272}px`,
            }}
          >
            {duplicatedProducts.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="flex-shrink-0 w-64 h-80 relative"
            >
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-white/20 overflow-hidden h-full flex flex-col">
                  <div className="h-48 relative flex-shrink-0 rounded-t-3xl overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between bg-white/5 rounded-b-3xl">
                    <div className="space-y-1">
                      <h3 className="font-bold text-gray-800 text-lg leading-tight line-clamp-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm font-medium line-clamp-1">{product.variant}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-green-600 text-xs font-semibold whitespace-nowrap">Premium Quality</span>
                      </div>
                      <div className="text-xs text-gray-500 font-medium line-clamp-1 ml-2">
                        {product.brand}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hidden Arrow Buttons - Only show on hover */}
        {isHovered && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-white/95 shadow-xl transition-all duration-300 z-20"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-white/95 shadow-xl transition-all duration-300 z-20"
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
              onClick={() => {
                const cardWidth = 280
                setScrollPosition(index * cardWidth)
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(scrollPosition / 280) % products.length === index ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
