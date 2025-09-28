"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const timelineEvents = [
  {
    year: "2025",
    title: "Company Founded",
    description:
      "Ceylon Nature Link established with a fresh vision, built on Sri Lanka's timeless spice and fruit legacy",
  },
  {
    year: "2025",
    title: "Global Reach Established",
    description:
      "Started delivering premium dehydrated fruits, spices, and herbs worldwide with reliable logistics",
  },
  {
    year: "2025",
    title: "Quality Standards",
    description:
      "Implemented strict sourcing, hygienic processing, and testing to ensure freshness, purity, and global standards",
  },
];

const companyValues = [
  {
    title: "Quality First",
    description: "We maintain the highest standards in sourcing, processing, and quality control to deliver premium products.",
    icon: "🏆",
  },
  {
    title: "Authentic Heritage",
    description: "Our products reflect the rich cultural heritage and traditional knowledge of Sri Lankan natural products.",
    icon: "🌿",
  },
  {
    title: "Global Excellence",
    description: "We combine traditional wisdom with modern technology to meet international quality standards.",
    icon: "🌍",
  },
  {
    title: "Sustainable Practices",
    description: "We are committed to environmentally responsible practices and supporting local farming communities.",
    icon: "♻️",
  },
];

export default function AboutPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      if (elementTop < windowHeight && elementTop + elementHeight > 0) {
        const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)));
        setScrollProgress(progress);

        // Show items based on scroll progress
        const newVisibleItems = new Set<number>();
        timelineEvents.forEach((_, index) => {
          if (progress > index / timelineEvents.length) {
            newVisibleItems.add(index);
          }
        });
        setVisibleItems(newVisibleItems);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pt-20 lg:pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div>
              <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-green-600 mb-6">
                About Ceylon Nature Link
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Premier Sri Lankan company specializing in premium dehydrated fruits, authentic spices, and traditional herbal products. Founded in 2025 with a fresh vision, built on Sri Lanka's timeless spice and fruit legacy.
              </p>
            </div>
          </div>
          
          {/* Right side - Image container */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-green-200/30 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                <img
                  src="/sri-lankan-countryside.png"
                  alt="Sri Lankan countryside"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Values */}
      <div className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-green-800 mb-6">
              Our Values
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our commitment to excellence is built on these core values that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-sm premium-card text-center"
              >
                <CardContent className="p-8">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="font-heading font-bold text-xl text-green-800 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Company Timeline */}
      <div className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-green-800 mb-6">
              Our Journey
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              From our founding to becoming a trusted global partner in Sri Lankan natural products.
            </p>
          </div>

          <div ref={timelineRef} className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-200 via-green-400 to-green-600 rounded-full"></div>
            <div
              ref={lineRef}
              className="absolute left-8 top-0 w-1 bg-green-600 rounded-full transition-all duration-1000"
              style={{ height: `${scrollProgress * 100}%` }}
            ></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex items-start space-x-8 transition-all duration-1000 ${
                    visibleItems.has(index)
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">{event.year}</span>
                  </div>

                  {/* Event Content */}
                  <Card className="flex-1 group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-sm premium-card">
                    <CardContent className="p-8">
                      <h3 className="font-heading font-bold text-2xl text-green-800 mb-4 group-hover:text-green-600 transition-colors duration-300">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {event.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-green-600 via-green-700 to-green-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-8">
              Partner With Us
            </h2>
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Join us in bringing the authentic taste and quality of Sri Lankan natural products to the world. 
              Let's build a sustainable future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-green-800 hover:bg-gray-100 px-12 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-0 rounded-full"
              >
                Get In Touch
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-green-800 px-12 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 rounded-full"
              >
                View Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
