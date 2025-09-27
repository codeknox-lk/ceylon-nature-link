"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "/sri-lankan-spices.png",
    title: "Premium Ceylon Spices",
    subtitle: "Traditional flavors, premium quality",
    description:
      "Discover the authentic taste of Sri Lanka with our premium spices. From cinnamon to cardamom, every spice carries the essence of our heritage.",
    ctaText: "Shop Spices",
    ctaLink: "/products",
    badge: "100% Natural",
  },
  {
    id: 2,
    image: "/sri-lankan-dehydrated-fruits.png",
    title: "Dehydrated Fruits",
    subtitle: "Nature's sweetness preserved",
    description:
      "Taste the tropics in every bite. Our dehydrated fruits preserve the authentic flavors and nutrients of Sri Lanka's finest produce.",
    ctaText: "View Fruits",
    ctaLink: "/products",
    badge: "No Preservatives",
  },
  {
    id: 3,
    image: "/sri-lankan-herbal-plants.png",
    title: "Ayurvedic Herb",
    subtitle: "Ancient wisdom, modern wellness",
    description:
      "Embrace the healing power of traditional Ayurvedic herbs. Our herbal products combine ancient wisdom with modern quality standards.",
    ctaText: "Explore Herbs",
    ctaLink: "/products",
    badge: "Traditional",
  },
  {
    id: 4,
    image: "/sri-lankan-countryside.png",
    title: "Natural Heritage",
    subtitle: "Sustainably sourced from nature",
    description:
      "Every product reflects our commitment to sustainability and ethical sourcing. Supporting local farmers while preserving our natural heritage.",
    ctaText: "Learn More",
    ctaLink: "/about",
    badge: "Sustainable",
  },
  {
    id: 5,
    image: "/sri-lankan-export-quality.png",
    title: "Export Quality",
    subtitle: "Bringing Sri Lanka to the world",
    description:
      "We deliver premium Sri Lankan products to customers worldwide with unmatched quality.",
    ctaText: "Partner With Us",
    ctaLink: "/contact",
    badge: "Global Partner",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading="eager"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pt-20 lg:pt-24">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                  {/* Badge */}
                  <div className="inline-block bg-primary/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in-up border border-white/20">
                    {slide.badge}
                  </div>

                  {/* Title */}
                  <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 animate-fade-in-up animate-delay-200 leading-tight">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-6 animate-fade-in-up animate-delay-300 font-medium">
                    {slide.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-400">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center animate-fade-in-up animate-delay-500">
                    <Link href={slide.ctaLink}>
                      <Button
                        size="lg"
                        className="bg-white/10 backdrop-blur-md border border-primary text-white hover:bg-primary/20 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                      >
                        {slide.ctaText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 z-20"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 z-20"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>


      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <div
          className="h-full bg-primary transition-all duration-1000 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce z-20">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
