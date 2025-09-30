"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Card, CardContent } from "@/components/ui/card";
import { PRODUCTS } from "@/lib/products";
import Header from "@/components/header";
import Footer from "@/components/footer";

// Complete product data with all Saadambara products
const allProducts = PRODUCTS;

const brands = [
  { name: "Saadambara", logo: "/brand-logos/Saadambara.png" },
  { name: "Trekola", logo: "/brand-logos/Trekola.png" }
];

const productCategories = [
  "Spices",
  "Herbal Products", 
  "Dehydrated Fruits"
];

function ProductsFilterContent() {
  const searchParams = useSearchParams();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Handle URL parameters on page load
  useEffect(() => {
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    
    if (category) {
      // Convert URL parameter to proper category name
      const categoryName = category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
      setSelectedCategories([categoryName]);
    }
    
    if (brand) {
      setSelectedBrands([brand]);
    }
  }, [searchParams]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const filteredProducts = allProducts.filter(product => {
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return brandMatch && categoryMatch;
  });

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <Header />
      {/* Hero Header */}
      <div className="container mx-auto px-4 py-16" style={{ marginTop: '80px' }}>
        <div className="text-center">
          <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-green-600 mb-6">
            Premium Product
            <span className="block text-primary-dark">Catalog</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Discover our complete collection of authentic Sri Lankan natural products. 
            Filter by brand, category, or explore everything we have to offer.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-80 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <h2 className="font-heading font-bold text-2xl text-primary-dark mb-8">Filter Products</h2>
            
            {/* Our Brands Section */}
            <div className="mb-8">
              <h3 className="font-heading font-semibold text-lg text-primary-dark mb-6 flex items-center">
                <span className="text-2xl mr-2">🏷️</span>
                Our Brands
              </h3>
              <div className="space-y-4">
                {brands.map((brand) => (
                  <button
                    key={brand.name}
                    onClick={() => toggleBrand(brand.name)}
                    className={`w-full flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all duration-300 group ${
                      selectedBrands.includes(brand.name)
                        ? 'border-primary bg-gradient-to-r from-primary/10 to-accent/10 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-primary/50 hover:shadow-md hover:scale-105 bg-white/50'
                    }`}
                  >
                    <div className="relative">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={50}
                        height={50}
                        className="rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300"
                      />
                      {selectedBrands.includes(brand.name) && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <span className="font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
                      {brand.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Our Products Section */}
            <div className="mb-8">
              <h3 className="font-heading font-semibold text-lg text-primary-dark mb-6 flex items-center">
                <span className="text-2xl mr-2">📦</span>
                Our Products
              </h3>
              <div className="space-y-3">
                {productCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 group ${
                      selectedCategories.includes(category)
                        ? 'border-primary bg-gradient-to-r from-primary/10 to-accent/10 shadow-lg scale-105 text-primary-dark'
                        : 'border-gray-200 hover:border-primary/50 hover:shadow-md hover:scale-105 text-gray-700 bg-white/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold group-hover:text-primary transition-colors duration-300">
                        {category}
                      </span>
                      {selectedCategories.includes(category) && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <AnimatedButton 
              onClick={clearFilters}
              className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              🗑️ Clear All Filters
            </AnimatedButton>
          </div>

          {/* Right Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading font-bold text-3xl text-primary-dark mb-2">
                    {filteredProducts.length} Premium Products
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {selectedBrands.length > 0 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary-dark mr-2">
                        🏷️ {selectedBrands.join(', ')}
                      </span>
                    )}
                    {selectedCategories.length > 0 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent-dark">
                        📦 {selectedCategories.join(', ')}
                      </span>
                    )}
                    {selectedBrands.length === 0 && selectedCategories.length === 0 && (
                      <span className="text-gray-500">Showing all our premium products</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">✨</span>
                  <span className="text-sm font-semibold text-gray-600">Premium Quality</span>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl hover:scale-105 premium-card">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                        Premium
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {product.brand}
                        </span>
                        <span className="px-2 py-1 bg-accent/10 text-accent-dark text-xs font-semibold rounded-full">
                          {product.category}
                        </span>
                      </div>
                      
                      <h3 className="font-heading font-bold text-lg text-primary-dark group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex justify-end pt-1">
                        <AnimatedButton 
                          variant="animated"
                          onClick={() => setSelectedProduct(product)}
                          size="sm"
                          className="text-xs px-3 py-1"
                        >
                          View Details
                        </AnimatedButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/20 max-w-md mx-auto">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="font-heading font-bold text-2xl text-primary-dark mb-4">
                    No Products Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    No products match your current filters. Try adjusting your selection.
                  </p>
                  <AnimatedButton 
                    variant="animated"
                    onClick={clearFilters} 
                    className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0"
                  >
                    Clear All Filters
                  </AnimatedButton>
                </div>
              </div>
            )}

            {/* Trekola Coming Soon Section */}
            {selectedBrands.includes("Trekola") && (
              <div className="mt-12">
                <div className="bg-gradient-to-br from-gray-100 via-white to-gray-50 rounded-3xl shadow-2xl p-12 border border-gray-200">
                  <div className="text-center">
                    <div className="text-6xl mb-6">🚀</div>
                    <h3 className="font-heading font-bold text-3xl text-primary-dark mb-4">
                      Trekola Products Coming Soon!
                    </h3>
                    <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                      We're working hard to bring you an amazing collection of Trekola products. 
                      Stay tuned for premium quality items that will be available soon!
                    </p>
                    <div className="bg-white/80 rounded-2xl p-8 mb-8">
                      <h4 className="font-semibold text-lg text-gray-800 mb-4">What to Expect:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        <div className="text-center">
                          <div className="text-3xl mb-2">🌿</div>
                          <p className="font-semibold text-gray-700">Herbal Products</p>
                          <p className="text-gray-600">Premium wellness teas and herbal blends</p>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl mb-2">🍎</div>
                          <p className="font-semibold text-gray-700">Dehydrated Fruits</p>
                          <p className="text-gray-600">Natural dried fruits and snacks</p>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl mb-2">✨</div>
                          <p className="font-semibold text-gray-700">Specialty Items</p>
                          <p className="text-gray-600">Unique Sri Lankan specialties</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <AnimatedButton 
                        variant="animated"
                        onClick={() => setSelectedBrands(selectedBrands.filter(b => b !== "Trekola"))}
                        className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0"
                      >
                        View Saadambara Products
                      </AnimatedButton>
                      <AnimatedButton 
                        className="border-2 border-blue-500 bg-blue-50 text-blue-700 hover:bg-green-400 hover:text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        Get Notified
                      </AnimatedButton>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-white/20 animate-scale-in">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="font-heading font-bold text-3xl text-primary-dark mb-2">
                    {selectedProduct.name}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                      {selectedProduct.brand}
                    </span>
                    <span className="px-4 py-2 bg-accent/10 text-accent-dark text-sm font-semibold rounded-full">
                      {selectedProduct.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Premium Quality
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 gap-4">
                    <Link href="/marketplace">
                      <AnimatedButton 
                        variant="animated"
                        className="w-full py-4 text-lg rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0"
                      >
                        🛍️ Visit Marketplace
                      </AnimatedButton>
                    </Link>
                    <AnimatedButton 
                      className="w-full border-2 border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-green-400 hover:text-white font-semibold py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      📞 Contact for Bulk Order
                    </AnimatedButton>
                  </div>
                  
                  {/* Why Choose This Product */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="text-xl mr-2">✨</span>
                      Why Choose This Product?
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-green-500 text-xl">✓</span>
                        <span className="text-gray-600">100% Authentic Sri Lankan Origin</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-green-500 text-xl">✓</span>
                        <span className="text-gray-600">Premium Export Quality</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-green-500 text-xl">✓</span>
                        <span className="text-gray-600">Natural Processing Methods</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-green-500 text-xl">✓</span>
                        <span className="text-gray-600">Global Shipping Available</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-gray-800 mb-3">Product Description</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                  </div>
                  
                  {selectedProduct.ingredients && (
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-xl mr-2">🌿</span>
                        Ingredients
                      </h4>
                      <p className="text-gray-600 text-sm">{selectedProduct.ingredients}</p>
                    </div>
                  )}
                  
                  {selectedProduct.benefits && (
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-xl mr-2">💊</span>
                        Medical & Nutritional Benefits
                      </h4>
                      <p className="text-gray-600 text-sm">{selectedProduct.benefits}</p>
                    </div>
                  )}
                  
                  {selectedProduct.packSizes && (
                    <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-xl mr-2">📦</span>
                        Available Pack Sizes
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedProduct.packSizes.map((pack, index) => (
                          <div key={index} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                            <div className="font-bold text-gray-800 text-center">{pack.size}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default function ProductsFilterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading products...</p>
      </div>
    </div>}>
      <ProductsFilterContent />
    </Suspense>
  );
}
