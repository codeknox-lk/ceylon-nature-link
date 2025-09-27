"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const statistics = [
  {
    id: 1,
    number: "2+",
    label: "Brands",
    description: "Our own portfolio of trusted Sri Lankan brands",
    icon: "🏷️",
  },
  {
    id: 2,
    number: "20+",
    label: "Products",
    description: "Premium natural products across key categories",
    icon: "🌿",
  },
  {
    id: 3,
    number: "1000+",
    label: "Happy Customers",
    description: "Trusted by businesses and individuals globally",
    icon: "😊",
  },
  {
    id: 4,
    number: "100%",
    label: "Natural Products",
    description: "Pure, authentic Sri Lankan natural ingredients",
    icon: "🌿",
  },
];

export default function StatisticsSection() {
  const [counts, setCounts] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            statistics.forEach((stat) => {
              const targetNumber = parseInt(stat.number.replace(/\D/g, ""));
              animateCount(stat.id, targetNumber);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById("statistics-section");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const animateCount = (id: number, target: number) => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCounts((prev) => ({ ...prev, [id]: Math.floor(current) }));
    }, duration / steps);
  };

  return (
    <section
      id="statistics-section"
      className="py-20 bg-gradient-to-br from-primary/5 to-accent/5"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-dark mb-6">
            Trusted by Global Partners
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our commitment to quality and authenticity has made us a preferred
            partner for businesses worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <Card
              key={stat.id}
              className="group hover:shadow-xl transition-all duration-500 overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4 animate-bounce group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="mb-4">
                  <span className="font-heading font-bold text-3xl md:text-4xl text-primary">
                    {counts[stat.id] || 0}
                    {stat.number.includes("+") && "+"}
                    {stat.number.includes("%") && "%"}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-primary-dark mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
