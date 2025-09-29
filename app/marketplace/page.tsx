"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Search, Filter, Star, Truck, Shield, Clock, AlertCircle } from 'lucide-react';
import { PRODUCTS, searchProducts, getFeaturedProducts, getBestSellingProducts } from '@/lib/products';
import Header from "@/components/header";
import Footer from "@/components/footer";
import ShoppingCartComponent from "@/components/shopping-cart";

export default function MarketplacePage() {
  const { state, dispatch } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [isAddingToCart, setIsAddingToCart] = useState<number | null>(null);

  const addToCart = async (product: any) => {
    setIsAddingToCart(product.id);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        productId: product.id,
        packSize: product.selectedPackSize,
        quantity: 1
      }
    });
    
    setIsAddingToCart(null);
  };

  const categories = ['All', 'Spices', 'Herbal Products', 'Dehydrated Fruits'];

  useEffect(() => {
    let filtered = PRODUCTS;

    // Filter by search term
    if (searchTerm) {
      filtered = searchProducts(searchTerm);
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary via-primary-dark to-secondary py-16">
          <div className="container mx-auto px-4">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Premium Sri Lankan Marketplace
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Authentic spices, herbs, and natural products delivered to your doorstep
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for products, brands, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg rounded-2xl border-0 shadow-lg focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Error Messages */}
          {state.errors.length > 0 && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-red-800 font-medium mb-2">Please fix the following errors:</h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    {state.errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => dispatch({ type: 'CLEAR_ERRORS' })}
                    className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-80">
              <Card className="p-6 sticky top-24">
                <h3 className="font-bold text-xl mb-6 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </h3>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                          selectedCategory === category
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="w-4 h-4 mr-2 text-primary" />
                    Free delivery on orders over LKR 2,000
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 mr-2 text-primary" />
                    100% authentic products
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    Same day delivery in Colombo
                  </div>
                </div>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredProducts.length} Products Found
                  </h2>
                  <p className="text-gray-600">
                    {selectedCategory !== 'All' && `in ${selectedCategory}`}
                  </p>
                </div>
                
                {/* Cart Button */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="w-5 h-5 inline mr-2" />
                  Cart ({state.itemCount})
                </button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl hover:scale-105">
                    <Link href={`/products/${product.id}`}>
                      <div className="relative overflow-hidden rounded-t-2xl cursor-pointer">
                        <div className="aspect-[4/3] relative">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.discount && (
                              <Badge className="bg-red-500 text-white px-2 py-1 text-xs">
                                {product.discount}% OFF
                              </Badge>
                            )}
                            {!product.inStock && (
                              <Badge className="bg-gray-500 text-white px-2 py-1 text-xs">
                                Out of Stock
                              </Badge>
                            )}
                            {product.bestSeller && (
                              <Badge className="bg-green-500 text-white px-2 py-1 text-xs">
                                Best Seller
                              </Badge>
                            )}
                            {product.featured && (
                              <Badge className="bg-yellow-500 text-white px-2 py-1 text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                          
                          <div className="absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                            Premium
                          </div>
                        </div>
                      </div>
                    </Link>
                    
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {product.brand}
                          </Badge>
                          <div className="flex items-center text-yellow-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-semibold ml-1">{product.rating}</span>
                            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                          </div>
                        </div>
                        
                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-bold text-lg text-primary-dark group-hover:text-primary transition-colors duration-300 line-clamp-2 cursor-pointer">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                          {product.shortDescription}
                        </p>
                        
                        <div className="flex items-center justify-between pt-1">
                          <div>
                            <span className="text-lg font-bold text-primary">
                              LKR {product.price.toLocaleString()}
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                LKR {product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Button 
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(product);
                            }}
                            disabled={!product.inStock || isAddingToCart === product.id}
                            className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0"
                          >
                            {isAddingToCart === product.id ? 'Adding...' : !product.inStock ? 'Out of Stock' : 'Add to Cart'}
                          </Button>
                          
                          <Link href={`/products/${product.id}`}>
                            <Button 
                              variant="outline" 
                              className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                            >
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    No Products Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                    }}
                    className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Shopping Cart */}
      <ShoppingCartComponent 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </div>
  );
}
