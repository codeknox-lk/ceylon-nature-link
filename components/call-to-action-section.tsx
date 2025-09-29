"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToActionSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-8 left-8 text-green-300 text-3xl animate-bounce">
        🌿
      </div>
      <div className="absolute top-16 right-12 text-green-400 text-2xl animate-pulse">
        🍃
      </div>
      <div className="absolute bottom-16 left-16 text-green-300 text-4xl animate-bounce" style={{ animationDelay: '1s' }}>
        🌱
      </div>
      <div className="absolute bottom-8 right-8 text-green-400 text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>
        🌾
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content Box */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-green-200/50">
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Ready to Experience
              <span className="block text-green-600 mt-2">
                Authentic Ceylon Quality?
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Join thousands of satisfied customers worldwide who trust Ceylon Nature Link 
              for premium Sri Lankan natural products. Start your journey with authentic quality today.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Get Started Today
                </Button>
              </Link>
              
              <Link href="/products-filter">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Explore Products
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl mb-3">🚚</div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Global Shipping</h3>
                <p className="text-gray-600 text-sm">Fast and reliable delivery worldwide</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">🛡️</div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Quality Guaranteed</h3>
                <p className="text-gray-600 text-sm">100% authentic Sri Lankan products</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">24/7 Support</h3>
                <p className="text-gray-600 text-sm">Expert assistance whenever you need</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-t border-green-200 pt-8">
              <p className="text-gray-600 text-lg mb-4">
                Have questions? Our team is here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-700">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">📞</span>
                  <span className="font-semibold">+94 11 234 5678</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl">✉️</span>
                  <span className="font-semibold">info@ceylonnaturelink.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}