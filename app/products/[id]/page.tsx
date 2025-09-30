"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { AnimatedCartButton } from '@/components/ui/animated-cart-button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Star, Truck, Shield, Clock, Heart, Share2, Minus, Plus } from 'lucide-react';
import { getProductById, Product } from '@/lib/products';
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ProductDetailPage() {
  const params = useParams();
  const { state, dispatch } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedPackSize, setSelectedPackSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    if (params.id) {
      const productId = parseInt(params.id as string);
      const foundProduct = getProductById(productId);
      setProduct(foundProduct || null);
      if (foundProduct) {
        setSelectedPackSize(foundProduct.selectedPackSize);
      }
      setIsLoading(false);
    }
  }, [params.id]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        productId: product.id,
        packSize: selectedPackSize,
        quantity: quantity
      }
    });
    
    setIsAddingToCart(false);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (product) {
      const maxQuantity = product.packSizes.find(p => p.size === selectedPackSize)?.stock || 0;
      setQuantity(Math.max(1, Math.min(newQuantity, maxQuantity)));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
        <Header />
        <main className="pt-20 lg:pt-24">
          <div className="container mx-auto px-4 py-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-200 rounded-2xl"></div>
                  <div className="flex space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-12 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
        <Header />
        <main className="pt-20 lg:pt-24">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
              <p className="text-xl text-gray-600 mb-8">
                The product you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/marketplace">
                <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0">
                  Back to Marketplace
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const selectedPackSizeData = product.packSizes.find(p => p.size === selectedPackSize);
  const currentPrice = selectedPackSizeData?.price || product.price;
  const currentStock = selectedPackSizeData?.stock || product.stock;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/marketplace" className="inline-flex items-center text-primary hover:text-primary-dark mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Marketplace
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square relative rounded-2xl overflow-hidden bg-white shadow-2xl">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.discount && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white px-3 py-1 text-sm font-bold">
                      {product.discount}% OFF
                    </Badge>
                  </div>
                )}
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? 'border-primary shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline" className="text-sm">
                    {product.brand}
                  </Badge>
                  {product.featured && (
                    <Badge className="bg-yellow-500 text-white text-sm">Featured</Badge>
                  )}
                  {product.bestSeller && (
                    <Badge className="bg-green-500 text-white text-sm">Best Seller</Badge>
                  )}
                  {product.newArrival && (
                    <Badge className="bg-blue-500 text-white text-sm">New</Badge>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-semibold text-gray-700">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {product.description}
                </p>
              </div>

              {/* Pack Size Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Pack Size</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {product.packSizes.map((pack) => (
                    <button
                      key={pack.size}
                      onClick={() => {
                        setSelectedPackSize(pack.size);
                        setQuantity(1);
                      }}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedPackSize === pack.size
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${pack.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={pack.stock === 0}
                    >
                      <div className="text-sm font-semibold">{pack.size}</div>
                      <div className="text-xs text-gray-500">LKR {pack.price.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= currentStock}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-primary">
                      LKR {currentPrice.toLocaleString()}
                    </div>
                    {product.originalPrice && product.originalPrice > currentPrice && (
                      <div className="text-lg text-gray-500 line-through">
                        LKR {product.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Total</div>
                    <div className="text-2xl font-bold text-gray-900">
                      LKR {(currentPrice * quantity).toLocaleString()}
                    </div>
                  </div>
                </div>

                <AnimatedCartButton
                  onClick={handleAddToCart}
                  disabled={currentStock === 0 || isAddingToCart}
                  className="w-full text-lg"
                >
                  {isAddingToCart ? 'Adding...' : currentStock === 0 ? 'Out of Stock' : 'ADD TO CART'}
                </AnimatedCartButton>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="w-5 h-5 mr-2 text-primary" />
                  Free delivery on orders over LKR 2,000
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  100% authentic products
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  Same day delivery in Colombo
                </div>
              </div>
            </div>
          </div>

          {/* Product Information Tabs */}
          <div className="mt-16">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Ingredients</h3>
                    <p className="text-gray-600 leading-relaxed">{product.ingredients}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Health Benefits</h3>
                    <p className="text-gray-600 leading-relaxed">{product.benefits}</p>
                  </div>
                </div>
                
                <Separator className="my-8" />
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Product Details</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">SKU:</span> {selectedPackSizeData?.sku || product.sku}
                    </div>
                    <div>
                      <span className="font-semibold">Weight:</span> {selectedPackSizeData?.weight || product.weight}g
                    </div>
                    <div>
                      <span className="font-semibold">Dimensions:</span> {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} cm
                    </div>
                    <div>
                      <span className="font-semibold">Category:</span> {product.category}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
