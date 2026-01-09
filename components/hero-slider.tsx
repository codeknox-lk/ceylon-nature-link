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
    <section className="relative h-[60vh] min-h-[500px] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pt-16 sm:pt-20 md:pt-24 px-3 sm:px-4 md:px-6">
              <div className="container mx-auto">
                <div className="max-w-4xl mx-auto text-center">
                  {/* Badge */}
                  <div className="inline-block bg-primary/30 backdrop-blur-sm text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 md:mb-6 animate-fade-in-up border border-white/30 shadow-lg">
                    {slide.badge}
                  </div>

                  {/* Title */}
                  <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-white mb-3 sm:mb-4 md:mb-6 animate-fade-in-up animate-delay-200 leading-tight px-2">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-100 mb-3 sm:mb-4 md:mb-6 animate-fade-in-up animate-delay-300 font-medium px-2">
                    {slide.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-400 px-4">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up animate-delay-500 px-4">
                    <Link href={slide.ctaLink} className="w-full sm:w-auto">
                      <Button
                        size="lg"
                        className="bg-white/20 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/30 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full sm:w-auto min-h-[48px] touch-manipulation"
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
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 sm:p-4 rounded-full hover:bg-white/30 active:bg-white/40 transition-all duration-300 hover:scale-110 active:scale-95 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
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
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 sm:p-4 rounded-full hover:bg-white/30 active:bg-white/40 transition-all duration-300 hover:scale-110 active:scale-95 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
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
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce z-20 hidden sm:block">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
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
