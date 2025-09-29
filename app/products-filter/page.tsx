"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Complete product data with all Saadambara products
const allProducts = [
  // Saadambara Spices
  {
    id: 1,
    name: "Saadambara Chilli Powder",
    brand: "Saadambara",
    category: "Spices",
    price: "From $8.99",
    image: "/sri-lankan-spices.png",
    description: "Finely ground from premium-quality sun-ripened chillies, delivering vibrant color, rich aroma, and bold flavor to your curries and stir-fries.",
    ingredients: "100% Dried Chillies (Capsicum annuum)",
    benefits: "Rich in vitamins A & C for immunity, contains capsaicin to aid digestion and metabolism, supports cardiovascular health",
    packSizes: "50g | 100g | 250g | 500g | 1kg"
  },
  {
    id: 2,
    name: "Saadambara Chilli Pieces",
    brand: "Saadambara",
    category: "Spices",
    price: "From $7.99",
    image: "/sri-lankan-spices.png",
    description: "Bring the authentic heat and aroma of Sri Lankan spices with Saadambara Chilli Pieces. Made from premium chillies and dehydrated using advanced heat pump technology.",
    ingredients: "100% Dried Chillies (Capsicum annuum)",
    benefits: "Natural antioxidants, boosts metabolism and circulation, supports digestive health",
    packSizes: "50g | 100g | 250g | 500g | 1kg"
  },
  {
    id: 3,
    name: "Saadambara Turmeric Powder",
    brand: "Saadambara",
    category: "Spices",
    price: "From $9.99",
    image: "/ceylon-turmeric-powder.png",
    description: "Golden and fragrant, Saadambara Turmeric is ground from the finest rhizomes to bring warmth and color to your dishes. Packed under strict hygienic conditions.",
    ingredients: "100% Turmeric (Curcuma longa)",
    benefits: "Strong anti-inflammatory and antioxidant properties, supports joint and heart health, boosts immunity and digestion",
    packSizes: "25g | 50g | 100g | 250g | 500g | 1kg"
  },
  {
    id: 4,
    name: "Saadambara Curry Powder",
    brand: "Saadambara",
    category: "Spices",
    price: "From $10.99",
    image: "/sri-lankan-spices.png",
    description: "A perfect blend of roasted and ground spices, Saadambara Curry Powder gives your dishes authentic Sri Lankan flavor. Crafted with care to balance aroma, color, and taste.",
    ingredients: "Blend of premium-quality Sri Lankan spices",
    benefits: "Packed with antioxidants, aids digestion and boosts immunity, enhances appetite naturally",
    packSizes: "50g | 100g | 250g | 500g | 1kg"
  },
  {
    id: 5,
    name: "Saadambara Roasted Curry Powder",
    brand: "Saadambara",
    category: "Spices",
    price: "From $11.99",
    image: "/sri-lankan-spices.png",
    description: "Carefully roasted to perfection, Roasted Curry Powder delivers a deeper, smokier aroma and robust flavor – a staple for traditional Sri Lankan dishes.",
    ingredients: "Blend of roasted spices",
    benefits: "Improves digestion, enhances metabolism, rich in plant-based antioxidants",
    packSizes: "50g | 100g | 250g | 500g | 1kg"
  },
  {
    id: 6,
    name: "Saadambara Cloves",
    brand: "Saadambara",
    category: "Spices",
    price: "From $12.99",
    image: "/sri-lankan-spices.png",
    description: "Handpicked from the best harvests, Saadambara Cloves add a strong, sweet, and warming flavor to your curries, teas, and desserts.",
    ingredients: "100% Whole Cloves (Syzygium aromaticum)",
    benefits: "Natural antiseptic and anti-inflammatory, supports dental and digestive health, rich in antioxidants",
    packSizes: "25g | 50g | 100g | 250g"
  },
  {
    id: 7,
    name: "Saadambara Pepper Seeds",
    brand: "Saadambara",
    category: "Spices",
    price: "From $9.99",
    image: "/sri-lankan-spices.png",
    description: "Harvested from the lush spice gardens of Sri Lanka, our Pepper Seeds bring a sharp, pungent flavor and bold aroma to your cooking.",
    ingredients: "100% Black Pepper Seeds (Piper nigrum)",
    benefits: "Aids digestion and metabolism, improves nutrient absorption, natural antioxidant and antibacterial properties",
    packSizes: "50g | 100g | 250g | 500g | 1kg"
  },
  {
    id: 8,
    name: "Saadambara Cardamom",
    brand: "Saadambara",
    category: "Spices",
    price: "From $15.99",
    image: "/sri-lankan-spices.png",
    description: "Known as the 'Queen of Spices,' Saadambara Cardamom offers a sweet, aromatic flavor that enriches curries, sweets, and teas.",
    ingredients: "100% Whole Cardamom (Elettaria cardamomum)",
    benefits: "Supports digestion and oral health, natural detoxifying spice, helps regulate blood pressure",
    packSizes: "25g | 50g | 100g"
  },
  {
    id: 9,
    name: "Saadambara Cinnamon Sticks (C5 Grade)",
    brand: "Saadambara",
    category: "Spices",
    price: "From $13.99",
    image: "/ceylon-cinnamon-sticks.png",
    description: "Delicately rolled from the finest Sri Lankan cinnamon bark, our Cinnamon Sticks (C5) are prized for their sweet aroma and smooth texture.",
    ingredients: "100% Pure Ceylon Cinnamon (Cinnamomum verum)",
    benefits: "Supports heart and blood sugar health, anti-inflammatory and antioxidant-rich, promotes digestion and weight management",
    packSizes: "25g | 50g | 100g"
  },
  {
    id: 10,
    name: "Saadambara Garlic Powder",
    brand: "Saadambara",
    category: "Spices",
    price: "From $8.99",
    image: "/sri-lankan-spices.png",
    description: "Convenient and aromatic, Garlic Powder is made from carefully dehydrated garlic, preserving its strong flavor and nutritional values.",
    ingredients: "100% Garlic (Allium sativum)",
    benefits: "Supports heart health and immunity, natural antibacterial and antiviral properties, may help reduce cholesterol levels",
    packSizes: "50g | 100g"
  },
  {
    id: 11,
    name: "Saadambara Coriander Seeds (Koththamalli)",
    brand: "Saadambara",
    category: "Spices",
    price: "From $7.99",
    image: "/sri-lankan-spices.png",
    description: "Fragrant and earthy, Coriander Seeds are a key base spice for Sri Lankan cooking, enhancing both flavor and aroma.",
    ingredients: "100% Coriander Seeds (Coriandrum sativum)",
    benefits: "Aids digestion and detoxification, helps regulate blood sugar, anti-inflammatory and cooling properties",
    packSizes: "50g | 100g | 250g | 500g"
  },
  {
    id: 12,
    name: "Saadambara Cumin Seeds (Suduru)",
    brand: "Saadambara",
    category: "Spices",
    price: "From $8.99",
    image: "/sri-lankan-spices.png",
    description: "Warm, nutty, and aromatic, Cumin Seeds are a staple spice with a distinctive taste, ideal for curries, rice, and spice blends.",
    ingredients: "100% Cumin Seeds (Cuminum cyminum)",
    benefits: "Improves digestion and nutrient absorption, supports immunity and metabolism, rich in iron and antioxidants",
    packSizes: "50g | 100g | 250g"
  },
  {
    id: 13,
    name: "Saadambara Fennel Seeds (Mahaduru)",
    brand: "Saadambara",
    category: "Spices",
    price: "From $9.99",
    image: "/sri-lankan-spices.png",
    description: "Sweet and fragrant, Fennel Seeds are prized for their refreshing flavor and digestive properties.",
    ingredients: "100% Fennel Seeds (Foeniculum vulgare)",
    benefits: "Relieves bloating and indigestion, supports lactation and hormonal balance, rich in antioxidants and fiber",
    packSizes: "50g | 100g | 250g"
  },
  {
    id: 14,
    name: "Saadambara Curry Leaves Powder",
    brand: "Saadambara",
    category: "Spices",
    price: "From $11.99",
    image: "/sri-lankan-spices.png",
    description: "Dehydrated and ground to perfection, Curry Leaves Powder brings the distinct aroma and taste of fresh curry leaves into a long-lasting form.",
    ingredients: "100% Curry Leaves (Murraya koenigii)",
    benefits: "Promotes hair and skin health, helps control blood sugar and cholesterol, supports digestion and weight management",
    packSizes: "50g | 100g"
  },
  {
    id: 15,
    name: "Saadambara Pandan Powder",
    brand: "Saadambara",
    category: "Spices",
    price: "From $12.99",
    image: "/sri-lankan-spices.png",
    description: "Made from freshly dehydrated pandan leaves, Pandan Powder imparts a unique aroma and flavor to rice, curries, and desserts.",
    ingredients: "100% Pandan Leaves (Pandanus amaryllifolius)",
    benefits: "Natural detoxifier, supports digestion and reduces stress, provides calming, aromatic compounds",
    packSizes: "30g"
  }
];

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
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 text-white/20 text-4xl animate-float">
          🌿
        </div>
        <div className="absolute top-20 right-20 text-white/20 text-3xl animate-float" style={{ animationDelay: "1s" }}>
          🍃
        </div>
        <div className="absolute bottom-20 left-20 text-white/20 text-5xl animate-float" style={{ animationDelay: "2s" }}>
          🌱
        </div>
        <div className="absolute bottom-10 right-10 text-white/20 text-3xl animate-float" style={{ animationDelay: "0.5s" }}>
          🌾
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 animate-fade-in-up">
              Premium Product
              <span className="block text-accent">Catalog</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed animate-fade-in-up animate-delay-200">
              Discover our complete collection of authentic Sri Lankan natural products. 
              Filter by brand, category, or explore everything we have to offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animate-delay-400">
              <Link href="/">
                <Button 
                  size="lg" 
                  className="bg-white text-primary-dark hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-0"
                >
                  ← Back to Home
                </Button>
              </Link>
            </div>
          </div>
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
            <Button 
              onClick={clearFilters}
              variant="outline"
              className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              🗑️ Clear All Filters
            </Button>
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
                      
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-lg font-bold text-primary">{product.price}</span>
                        <Button 
                          onClick={() => setSelectedProduct(product)}
                          size="sm"
                          className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0 text-xs px-3 py-1"
                        >
                          View Details
                        </Button>
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
                  <Button 
                    onClick={clearFilters} 
                    className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0"
                  >
                    Clear All Filters
                  </Button>
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
                      <Button 
                        onClick={() => setSelectedBrands(selectedBrands.filter(b => b !== "Trekola"))}
                        className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0"
                      >
                        View Saadambara Products
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        Get Notified
                      </Button>
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
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-scale-in">
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
                      <p className="text-gray-600 text-sm font-medium">{selectedProduct.packSizes}</p>
                    </div>
                  )}
                  
                  <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6">
                    <div className="text-4xl font-bold text-primary mb-2">{selectedProduct.price}</div>
                    <p className="text-gray-600 text-sm">Premium Sri Lankan Quality</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0"
                    >
                      🛒 Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      📞 Contact for Bulk Order
                    </Button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="text-xl mr-2">✨</span>
                      Why Choose This Product?
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <span className="text-primary mr-2">✓</span>
                        100% Authentic Sri Lankan Origin
                      </li>
                      <li className="flex items-center">
                        <span className="text-primary mr-2">✓</span>
                        Premium Export Quality
                      </li>
                      <li className="flex items-center">
                        <span className="text-primary mr-2">✓</span>
                        Natural Processing Methods
                      </li>
                      <li className="flex items-center">
                        <span className="text-primary mr-2">✓</span>
                        Global Shipping Available
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
