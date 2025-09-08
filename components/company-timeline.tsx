"use client";

import { useEffect, useRef, useState } from "react";

const timelineEvents = [
  {
    year: "1995",
    title: "Company Founded",
    description:
      "Ceylon Nature Link established as a small family business focusing on traditional spice processing",
  },
  {
    year: "2001",
    title: "Export Operations Begin",
    description:
      "Started exporting premium Ceylon spices to international markets in Europe and Middle East",
  },
  {
    year: "2008",
    title: "Product Line Expansion",
    description:
      "Expanded operations to include dehydrated fruits and herbal products using traditional methods",
  },
  {
    year: "2015",
    title: "Organic Certification",
    description:
      "Achieved organic certification for our entire product range, ensuring highest quality standards",
  },
  {
    year: "2018",
    title: "Modern Facility",
    description:
      "Opened state-of-the-art processing facility combining traditional methods with modern technology",
  },
  {
    year: "2022",
    title: "Global Expansion",
    description:
      "Expanded to serve over 25 countries with dedicated tourist product lines and retail partnerships",
  },
];

export default function CompanyTimeline() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress for the timeline line
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.max(
          0,
          Math.min(1, (windowHeight - rect.top) / (rect.height + windowHeight))
        );
        setScrollProgress(progress);
      }

      // Check visibility of timeline items
      const items = timelineRef.current.querySelectorAll(".timeline-item");
      const newVisibleItems = new Set<number>();

      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top < windowHeight * 0.8) {
          newVisibleItems.add(index);
        }
      });

      setVisibleItems(newVisibleItems);
    };

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (!prefersReducedMotion) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-gray-50 nature-texture">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-dark mb-4">
            Our History
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From humble beginnings to becoming a leading exporter of Sri Lankan
            natural products
          </p>
        </div>

        <div className="max-w-4xl mx-auto" ref={timelineRef}>
          <div className="relative">
            {/* Timeline Line with Fill Animation */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div
              ref={lineRef}
              className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 w-0.5 bg-primary transition-all duration-1000 ease-out"
              style={{
                height: `${scrollProgress * 100}%`,
                transform: "translateX(-50%)",
              }}
            ></div>

            {timelineEvents.map((event, index) => (
              <div
                key={event.year}
                className={`timeline-item relative flex items-center mb-12 transition-all duration-700 ease-out ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } ${
                  visibleItems.has(index)
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  transform: visibleItems.has(index)
                    ? "translateX(0)"
                    : `translateX(${index % 2 === 0 ? "8" : "-8"}px)`,
                }}
              >
                {/* Timeline Dot with Pop-in Animation */}
                <div
                  className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10 transition-all duration-500 ease-out ${
                    visibleItems.has(index)
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 150 + 300}ms` }}
                ></div>

                {/* Content with Slide/Fade Animation */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 transition-all duration-700 ease-out ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  } ${
                    visibleItems.has(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150 + 150}ms` }}
                >
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-center mb-3">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {event.year}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-xl text-primary-dark mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
