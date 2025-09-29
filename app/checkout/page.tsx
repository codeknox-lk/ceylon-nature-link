"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, CreditCard, Smartphone, Building2, Truck, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { processPayment, createOrder, sendOrderConfirmation, calculateShipping, calculateTax, validatePaymentDetails, OrderData } from '@/lib/payment';
import { SecurePaymentProcessor, PaymentFormValidator } from '@/lib/stripe';
import { SecurityValidator } from '@/lib/security';
import { UnifiedPaymentService, PaymentMethod } from '@/lib/unified-payments';
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Customer Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Address
    address: '',
    city: '',
    district: '',
    postalCode: '',
    
    // Payment
    paymentMethod: 'cod',
    deliveryDate: '',
    timeSlot: 'morning',
    
    // Additional
    notes: '',
    agreeTerms: false,
    subscribeNewsletter: false
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderData | null>(null);

  const districts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Moneragala', 'Ratnapura', 'Kegalle'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateShippingCost = () => {
    return calculateShipping(state.total, formData.district);
  };

  const calculateTaxAmount = () => {
    return calculateTax(state.total);
  };

  const calculateTotal = () => {
    const shipping = calculateShippingCost();
    const tax = calculateTaxAmount();
    return state.total + shipping + tax;
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];
    
    // Required field validation
    if (!formData.firstName.trim()) errors.push('First name is required');
    if (!formData.lastName.trim()) errors.push('Last name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    if (!formData.address.trim()) errors.push('Address is required');
    if (!formData.city.trim()) errors.push('City is required');
    if (!formData.district) errors.push('District is required');
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    // Phone validation (Sri Lankan format)
    const phoneRegex = /^(\+94|0)[0-9]{9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      errors.push('Please enter a valid Sri Lankan phone number');
    }
    
    // COD validation
    if (formData.paymentMethod === 'cod') {
      if (!formData.deliveryDate.trim()) errors.push('Delivery date is required');
      if (!formData.timeSlot.trim()) errors.push('Time slot is required');
    }
    
    // Terms agreement
    if (!formData.agreeTerms) {
      errors.push('You must agree to the terms and conditions');
    }
    
    return errors;
  };

  const handlePlaceOrder = async () => {
    if (state.items.length === 0) return;
    
    // Validate form
    const errors = validateForm();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setIsProcessing(true);
    setValidationErrors([]);
    
    try {
      // Process payment using unified payment system (COD only)
      const paymentResult = await UnifiedPaymentService.createPayment(
        'cod',
        calculateTotal(),
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: {
            street: formData.address,
            city: formData.city,
            district: formData.district,
            postalCode: formData.postalCode
          }
        },
        {
          deliveryDate: formData.deliveryDate,
          timeSlot: formData.timeSlot
        }
      );
      
      if (!paymentResult.success) {
        setValidationErrors([paymentResult.error || 'Payment failed']);
        return;
      }
      
      // Create order data
      const orderData: OrderData = {
        id: `ORD-${Date.now()}`,
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: {
            street: formData.address,
            city: formData.city,
            district: formData.district,
            postalCode: formData.postalCode,
            country: 'Sri Lanka'
          }
        },
        items: state.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          packSize: item.packSize,
          sku: item.sku
        })),
        subtotal: state.total,
        shipping: calculateShippingCost(),
        tax: calculateTaxAmount(),
        total: calculateTotal(),
        paymentMethod: formData.paymentMethod,
        status: 'processing',
        notes: formData.notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Create order
      const order = await createOrder(orderData);
      setCurrentOrder(order);
      
      // Send confirmation email
      await sendOrderConfirmation(order);
      
      // Clear cart and show success
      dispatch({ type: 'CLEAR_CART' });
      setOrderSuccess(true);
      
    } catch (error) {
      console.error('Order processing error:', error);
      setValidationErrors(['An error occurred while processing your order. Please try again.']);
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
        <Header />
        <main className="pt-20 lg:pt-24">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
              <p className="text-xl text-gray-600 mb-8">
                Thank you for your order. We'll send you a confirmation email shortly.
              </p>
              <div className="space-y-4">
                <Link href="/marketplace">
                  <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0">
                    Continue Shopping
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="ml-4">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
        <Header />
        <main className="pt-20 lg:pt-24">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
              <p className="text-xl text-gray-600 mb-8">
                Add some products to your cart before checking out.
              </p>
              <Link href="/marketplace">
                <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0">
                  Start Shopping
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Link href="/marketplace" className="inline-flex items-center text-primary hover:text-primary-dark mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Marketplace
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Step 1: Customer Information */}
                {step === 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                        Customer Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {validationErrors.length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                          <div className="flex items-start">
                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <h4 className="text-red-800 font-medium mb-2">Please fix the following errors:</h4>
                              <ul className="text-red-700 text-sm space-y-1">
                                {validationErrors.map((error, index) => (
                                  <li key={index}>• {error}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="+94 77 123 4567"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address">Address *</Label>
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="Street address, building, apartment"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="district">District *</Label>
                          <select
                            id="district"
                            value={formData.district}
                            onChange={(e) => handleInputChange('district', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                          >
                            <option value="">Select District</option>
                            {districts.map(district => (
                              <option key={district} value={district}>{district}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input
                            id="postalCode"
                            value={formData.postalCode}
                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                            placeholder="12345"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 2: Payment Method */}
                {step === 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                        Payment Method
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) => handleInputChange('paymentMethod', value)}
                      >
                        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center cursor-pointer">
                            <CreditCard className="w-5 h-5 mr-2" />
                            Credit/Debit Card
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="bank" id="bank" />
                          <Label htmlFor="bank" className="flex items-center cursor-pointer">
                            <Building2 className="w-5 h-5 mr-2" />
                            Bank Transfer (Sri Lankan Banks)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="mobile" id="mobile" />
                          <Label htmlFor="mobile" className="flex items-center cursor-pointer">
                            <Smartphone className="w-5 h-5 mr-2" />
                            Mobile Payment (Dialog, Mobitel, Airtel)
                          </Label>
                        </div>
                      </RadioGroup>

                      {formData.paymentMethod === 'card' && (
                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold">Card Details</h4>
                          <div>
                            <Label htmlFor="cardNumber">Card Number *</Label>
                            <Input
                              id="cardNumber"
                              value={formData.cardNumber}
                              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                              placeholder="1234 5678 9012 3456"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiryDate">Expiry Date *</Label>
                              <Input
                                id="expiryDate"
                                value={formData.expiryDate}
                                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                placeholder="MM/YY"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV *</Label>
                              <Input
                                id="cvv"
                                value={formData.cvv}
                                onChange={(e) => handleInputChange('cvv', e.target.value)}
                                placeholder="123"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="cardName">Name on Card *</Label>
                            <Input
                              id="cardName"
                              value={formData.cardName}
                              onChange={(e) => handleInputChange('cardName', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      )}

                      {formData.paymentMethod === 'bank' && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold mb-2">Bank Transfer Details</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Transfer the exact amount to our account and include your order number in the reference.
                          </p>
                          <div className="text-sm space-y-1">
                            <p><strong>Bank:</strong> Commercial Bank of Ceylon</p>
                            <p><strong>Account Name:</strong> Ceylon Nature Link (Pvt) Ltd</p>
                            <p><strong>Account Number:</strong> 1234567890</p>
                            <p><strong>Branch:</strong> Colombo 03</p>
                          </div>
                        </div>
                      )}

                      {formData.paymentMethod === 'mobile' && (
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-semibold mb-2">Mobile Payment</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Send the exact amount to our mobile number and include your order number in the message.
                          </p>
                          <div className="text-sm space-y-1">
                            <p><strong>Dialog:</strong> +94 77 123 4567</p>
                            <p><strong>Mobitel:</strong> +94 71 123 4567</p>
                            <p><strong>Airtel:</strong> +94 76 123 4567</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Step 3: Review & Place Order */}
                {step === 3 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                        Review & Place Order
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2">Order Notes</h4>
                        <Textarea
                          value={formData.notes}
                          onChange={(e) => handleInputChange('notes', e.target.value)}
                          placeholder="Any special instructions for your order..."
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="agreeTerms"
                            checked={formData.agreeTerms}
                            onCheckedChange={(checked) => handleInputChange('agreeTerms', checked as boolean)}
                          />
                          <Label htmlFor="agreeTerms" className="text-sm">
                            I agree to the <Link href="/terms" className="text-primary hover:underline">Terms and Conditions</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> *
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="subscribeNewsletter"
                            checked={formData.subscribeNewsletter}
                            onCheckedChange={(checked) => handleInputChange('subscribeNewsletter', checked as boolean)}
                          />
                          <Label htmlFor="subscribeNewsletter" className="text-sm">
                            Subscribe to our newsletter for updates and special offers
                          </Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  {step > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                    >
                      Previous
                    </Button>
                  )}
                  {step < 3 && (
                    <Button
                      onClick={() => setStep(step + 1)}
                      className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0"
                    >
                      Next
                    </Button>
                  )}
                  {step === 3 && (
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={!formData.agreeTerms || isProcessing}
                      className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0"
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </Button>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Items */}
                    <div className="space-y-3">
                      {state.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                            <p className="text-xs text-gray-500">{item.brand}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-sm">LKR {(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>LKR {state.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>{calculateShippingCost() === 0 ? 'Free' : `LKR ${calculateShippingCost().toLocaleString()}`}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>VAT (15%)</span>
                        <span>LKR {calculateTaxAmount().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>Total</span>
                        <span>LKR {calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex items-center text-sm text-gray-600">
                        <Truck className="w-4 h-4 mr-2 text-primary" />
                        Free delivery on orders over LKR 2,000
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Shield className="w-4 h-4 mr-2 text-primary" />
                        100% secure payment
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
