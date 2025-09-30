"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
  const { state, dispatch } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeItem = (id: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
      setIsAnimating(false);
    }, 200);
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[10000]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary to-primary-dark">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
              <span className="bg-white/20 text-white px-2 py-1 rounded-full text-sm font-semibold">
                {state.itemCount}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some products to get started!</p>
                <Link href="/marketplace">
                  <AnimatedButton 
                    variant="animated"
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0"
                  >
                    Continue Shopping
                  </AnimatedButton>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <Card 
                    key={item.id} 
                    className={`transition-all duration-200 ${
                      isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                    }`}
                  >
                    <CardContent className="pl-1 pr-4 py-0">
                      <div className="flex items-center space-x-1">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-xs line-clamp-1 my-0 leading-tight">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500 my-0 leading-tight">{item.brand}</p>
                          {item.packSize && (
                            <p className="text-xs text-gray-400 my-0 leading-tight">{item.packSize}</p>
                          )}
                          <p className="text-xs font-bold text-primary my-0 leading-tight">
                            LKR {item.price.toLocaleString()}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                          >
                            <Minus className="w-3 h-3 text-gray-600" />
                          </button>
                          <span className="w-5 text-center font-semibold text-gray-900 text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                          >
                            <Plus className="w-3 h-3 text-gray-600" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-5 h-5 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors duration-200 ml-1"
                          >
                            <X className="w-3 h-3 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="space-y-4">
                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    LKR {state.total.toLocaleString()}
                  </span>
                </div>

                {/* Action Buttons */}
                <div>
                  <AnimatedButton
                    onClick={clearCart}
                    className="w-full border-2 border-red-300 bg-red-50 text-red-600 hover:bg-green-400 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300"
                  >
                    Clear Cart
                  </AnimatedButton>
                  
                  <div className="mt-3"></div>
                  
                  <Link href="/checkout">
                    <AnimatedButton 
                      variant="animated"
                      onClick={onClose}
                      className="w-full py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0"
                    >
                      Proceed to Checkout
                    </AnimatedButton>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
