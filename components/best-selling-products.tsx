"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const bestSellingProducts = [
  {
    id: 1,
    name: "Ceylon Cinnamon Sticks",
    description: "Premium quality true cinnamon from Sri Lanka",
    image: "/ceylon-cinnamon-sticks.png",
    price: "$24.99",
  },
  {
    id: 2,
    name: "Earl Grey Tea Blend",
    description: "Classic Ceylon black tea with bergamot",
    image: "/earl-grey-tea-blend.png",
    price: "$18.99",
  },
  {
    id: 3,
    name: "Dried Mango Strips",
    description: "Naturally dehydrated tropical mango",
    image: "/dried-mango-strips.png",
    price: "$12.99",
  },
  {
    id: 4,
    name: "Turmeric Powder",
    description: "Pure Ceylon turmeric with high curcumin",
    image: "/ceylon-turmeric-powder.png",
    price: "$15.99",
  },
  {
    id: 5,
    name: "Herbal Wellness Tea",
    description: "Ayurvedic blend for daily wellness",
    image: "/sri-lankan-herbal-plants.png",
    price: "$22.99",
  },
]

export default function BestSellingProducts() {
  const [isPaused, setIsPaused] = useState(false)
  const [currentTransform, setCurrentTransform] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  const duplicatedProducts = [...bestSellingProducts, ...bestSellingProducts, ...bestSellingProducts]

  useEffect(() => {
    let startTime: number
    const duration = 60000

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = (elapsed % duration) / duration
      const translateX = -((progress * (duplicatedProducts.length * 320)) / 3)

      setCurrentTransform(translateX)

      if (!isPaused) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    if (!isPaused) {
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPaused, duplicatedProducts.length])

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white nature-texture overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary-dark mb-8 animate-float">
            Best Selling Products
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Discover our most popular products loved by customers worldwide for their exceptional quality and authentic
            taste
          </p>
        </div>

        <div
          className="carousel-container relative mb-16 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={trackRef}
            className="carousel-track gap-8 flex"
            style={{
              width: `${duplicatedProducts.length * 320}px`,
              transform: `translateX(${currentTransform}px)`,
              transition: isPaused ? "none" : "transform 0.1s linear",
            }}
          >
            {duplicatedProducts.map((product, index) => (
              <Card
                key={`${product.id}-${index}`}
                className={`premium-card group bg-white shadow-lg hover:shadow-2xl border-0 overflow-hidden carousel-item stagger-${(index % 6) + 1}`}
                style={{ width: "300px", flexShrink: 0 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Bestseller
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-heading font-bold text-xl text-primary-dark mb-3 group-hover:text-primary transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-2xl text-primary">{product.price}</span>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary-dark text-white premium-button px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center animate-fade-in-up animate-delay-500">
          <div className="mb-4">
            <div className="inline-flex items-center space-x-2 text-gray-500">
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Scroll to see more products</p>
          </div>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white px-12 py-4 text-lg premium-button shadow-2xl hover:shadow-3xl"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
