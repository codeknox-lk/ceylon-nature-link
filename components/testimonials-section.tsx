"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO, Global Spice Co.",
    company: "United States",
    content:
      "Ceylon Nature Link has been our trusted partner for over 5 years. Their cinnamon quality is unmatched, and their commitment to sustainable sourcing aligns perfectly with our values.",
    rating: 5,
    avatar: "👩‍💼",
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    position: "Procurement Manager",
    company: "Middle East Trading Co.",
    content:
      "The tea quality from Ceylon Nature Link is exceptional. Their export services are reliable, and they always deliver on time. Highly recommended for premium Ceylon tea.",
    rating: 5,
    avatar: "👨‍💼",
  },
  {
    id: 3,
    name: "Emma Chen",
    position: "Founder, Wellness Boutique",
    company: "Australia",
    content:
      "We've been sourcing herbal products from Ceylon Nature Link for our wellness line. Their products are authentic, pure, and our customers love the quality.",
    rating: 5,
    avatar: "👩‍🔬",
  },
  {
    id: 4,
    name: "Marcus Rodriguez",
    position: "Import Director",
    company: "European Food Distributors",
    content:
      "Outstanding service and product quality. Their private label packaging service helped us launch our own brand successfully. Professional team throughout.",
    rating: 5,
    avatar: "👨‍💻",
  },
  {
    id: 5,
    name: "Yuki Tanaka",
    position: "Quality Manager",
    company: "Japanese Tea House",
    content:
      "The attention to detail in their tea processing is remarkable. We've been importing their premium tea blends for years and the consistency is outstanding.",
    rating: 5,
    avatar: "👩‍🍳",
  },
  {
    id: 6,
    name: "David Thompson",
    position: "Operations Director",
    company: "UK Specialty Foods",
    content:
      "Ceylon Nature Link's bulk export services are excellent. They handle everything from documentation to logistics professionally. A reliable long-term partner.",
    rating: 5,
    avatar: "👨‍🏭",
  },
];

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary-dark mb-6">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Don't just take our word for it. Here's what global partners say
            about working with Ceylon Nature Link
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <Card className="relative overflow-hidden border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-12">
              <div className="text-center">
                {/* Quote Icon */}
                <div className="text-6xl mb-6 text-primary/20">"</div>

                {/* Testimonial Content */}
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 italic">
                  {testimonials[currentTestimonial].content}
                </p>

                {/* Customer Info */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="text-4xl">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <h4 className="font-heading font-bold text-lg text-primary-dark">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {testimonials[currentTestimonial].position}
                    </p>
                    <p className="text-primary text-sm font-medium">
                      {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center space-x-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <span key={i} className="text-2xl text-yellow-400">
                        ⭐
                      </span>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="rounded-full w-12 h-12 p-0 border-primary text-primary hover:bg-primary hover:text-white"
            >
              ←
            </Button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-primary scale-125"
                      : "bg-gray-300 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="rounded-full w-12 h-12 p-0 border-primary text-primary hover:bg-primary hover:text-white"
            >
              →
            </Button>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`group hover:shadow-lg transition-all duration-300 border-0 shadow-md ${
                index === currentTestimonial ? "ring-2 ring-primary" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-heading font-semibold text-primary-dark">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {testimonial.position}
                    </p>
                    <p className="text-primary text-sm font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  "{testimonial.content.substring(0, 120)}..."
                </p>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-sm text-yellow-400">
                      ⭐
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
