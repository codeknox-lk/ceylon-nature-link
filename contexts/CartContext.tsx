"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product, getProductById, getPackSizePrice, getPackSizeStock, isProductInStock } from '@/lib/products';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  quantity: number;
  packSize: string;
  sku: string;
  weight: number;
  maxQuantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  errors: string[];
  warnings: string[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { productId: number; packSize: string; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'VALIDATE_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { productId, packSize, quantity = 1 } = action.payload;
      const product = getProductById(productId);
      
      if (!product) {
        return {
          ...state,
          errors: [...state.errors, 'Product not found']
        };
      }

      // Check if product is in stock
      if (!isProductInStock(product, packSize, quantity)) {
        return {
          ...state,
          errors: [...state.errors, `${product.name} (${packSize}) is out of stock`]
        };
      }

      const price = getPackSizePrice(product, packSize);
      const stock = getPackSizeStock(product, packSize);
      const packSizeData = product.packSizes.find(p => p.size === packSize);
      
      if (!packSizeData) {
        return {
          ...state,
          errors: [...state.errors, 'Invalid pack size selected']
        };
      }

      const existingItem = state.items.find(item => 
        item.id === productId && item.packSize === packSize
      );
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        
        if (newQuantity > stock) {
          return {
            ...state,
            errors: [...state.errors, `Only ${stock} units of ${product.name} (${packSize}) available`]
          };
        }

        const updatedItems = state.items.map(item =>
          item.id === productId && item.packSize === packSize
            ? { ...item, quantity: newQuantity, maxQuantity: stock }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          errors: []
        };
      } else {
        const newItem: CartItem = {
          id: productId,
          name: product.name,
          price: price,
          image: product.image,
          brand: product.brand,
          category: product.category,
          quantity: quantity,
          packSize: packSize,
          sku: packSizeData.sku,
          weight: packSizeData.weight,
          maxQuantity: stock
        };
        
        const updatedItems = [...state.items, newItem];
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          errors: []
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        errors: []
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.id === action.payload.id);
      if (!item) return state;
      
      const newQuantity = Math.max(0, action.payload.quantity);
      
      if (newQuantity > item.maxQuantity) {
        return {
          ...state,
          errors: [...state.errors, `Only ${item.maxQuantity} units of ${item.name} (${item.packSize}) available`]
        };
      }
      
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: newQuantity }
          : item
      ).filter(item => item.quantity > 0);
      
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        errors: []
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0,
        errors: [],
        warnings: []
      };
    
    case 'LOAD_CART': {
      // Validate all items when loading
      const validatedItems = action.payload.filter(item => {
        const product = getProductById(item.id);
        if (!product) return false;
        
        const packSizeData = product.packSizes.find(p => p.size === item.packSize);
        if (!packSizeData) return false;
        
        return isProductInStock(product, item.packSize, item.quantity);
      });
      
      return {
        items: validatedItems,
        total: validatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: validatedItems.reduce((sum, item) => sum + item.quantity, 0),
        errors: [],
        warnings: []
      };
    }
    
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: [],
        warnings: []
      };
    
    case 'VALIDATE_CART': {
      const errors: string[] = [];
      const warnings: string[] = [];
      
      state.items.forEach(item => {
        const product = getProductById(item.id);
        if (!product) {
          errors.push(`${item.name} is no longer available`);
          return;
        }
        
        const packSizeData = product.packSizes.find(p => p.size === item.packSize);
        if (!packSizeData) {
          errors.push(`${item.name} (${item.packSize}) is no longer available`);
          return;
        }
        
        if (!isProductInStock(product, item.packSize, item.quantity)) {
          errors.push(`${item.name} (${item.packSize}) is no longer available in the requested quantity`);
        }
        
        if (item.quantity > item.maxQuantity) {
          errors.push(`Only ${item.maxQuantity} units of ${item.name} (${item.packSize}) available`);
        }
      });
      
      return {
        ...state,
        errors,
        warnings
      };
    }
    
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    errors: [],
    warnings: []
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ceylon-nature-cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ceylon-nature-cart', JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
