"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/services", label: "Services" },
    { href: "/brands", label: "Brands" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/10 backdrop-blur-2xl shadow-2xl border-b border-white/20"
          : "bg-white/10 backdrop-blur-2xl shadow-2xl border-b border-white/20"
      }`}
    >
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/3 to-white/5 backdrop-blur-xl"></div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20 py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center group relative z-10">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20">
              <Image
                src="/ceylon-nature-link-logo.png"
                alt="Ceylon Nature Link"
                width={128}
                height={128}
                priority
                className="w-full h-full transition-all duration-500 group-hover:scale-110 drop-shadow-2xl object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl scale-150"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 h-full">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
              >
                {/* Hover background */}
                <div className="absolute inset-0 bg-primary-dark/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>

                {/* Content */}
                <div className="relative text-gray-700 group-hover:text-primary-dark transition-colors duration-300 font-bold">
                  {item.label}
                </div>

                {/* Active indicator */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-dark rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100"></div>
              </Link>
            ))}

            {/* CTA Button */}
            <div className="ml-4 flex items-center space-x-3">
              {/* Marketplace Button */}
              <Link href="/marketplace">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white px-6 py-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
                >
                  Marketplace
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden relative z-10 bg-white/20 backdrop-blur-lg rounded-xl p-3 min-w-[44px] min-h-[44px] shadow-lg border border-white/30 hover:bg-white/30 transition-all duration-300 touch-manipulation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <span
                className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden relative overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-[600px] opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-2xl rounded-2xl mt-3 sm:mt-4 p-4 sm:p-6 shadow-2xl border border-white/30">
            <nav className="space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between px-4 py-3 sm:py-4 rounded-xl text-gray-800 hover:text-primary-dark hover:bg-primary-dark/10 transition-all duration-300 animate-fade-in-left font-medium min-h-[48px] touch-manipulation"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-base sm:text-lg">{item.label}</span>
                  <div className="w-2 h-2 bg-primary-dark rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100"></div>
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Link href="/marketplace" onClick={() => setIsMenuOpen(false)} className="block">
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 min-h-[48px] text-base sm:text-lg"
                  >
                    Marketplace
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50"></div>
      )}


    </header>
  );
}
