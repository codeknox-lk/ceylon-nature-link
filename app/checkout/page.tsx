"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { AnimatedButton } from '@/components/ui/animated-button';
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
import { smsService } from '@/lib/sms-service';
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Customer Information
    firstName: '',
    lastName: '',
    phone: '',
    
    // Address
    address: '',
    city: '',
    district: '',
    
    // Additional
    notes: '',
    agreeTerms: false
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderData | null>(null);
  const [whatsappOpened, setWhatsappOpened] = useState(false);

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

  const validateStep1 = (): string[] => {
    const errors: string[] = [];
    
    // Required field validation for step 1 only
    if (!formData.firstName.trim()) errors.push('First name is required');
    if (!formData.lastName.trim()) errors.push('Last name is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    if (!formData.address.trim()) errors.push('Address is required');
    if (!formData.city.trim()) errors.push('City is required');
    if (!formData.district) errors.push('District is required');
    
    // Phone validation (Sri Lankan format)
    const phoneRegex = /^(\+94|0)[0-9]{9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      errors.push('Please enter a valid Sri Lankan phone number');
    }
    
    return errors;
  };

  const validateStep2 = (): string[] => {
    const errors: string[] = [];
    // No payment method validation needed
    return errors;
  };

  const validateStep3 = (): string[] => {
    const errors: string[] = [];
    
    // Terms validation
    if (!formData.agreeTerms) errors.push('You must agree to the terms and conditions');
    
    return errors;
  };

  // COD Security Implementation
  const implementCODSecurity = async (orderReference: string) => {
    // 1. Send SMS confirmation
    await sendSMSConfirmation(orderReference);
    
    // 2. Schedule pre-delivery call
    await schedulePreDeliveryCall(orderReference);
    
    // 3. Generate delivery tracking code
    const trackingCode = generateTrackingCode();
    
    // 4. Store security data in localStorage for admin access
    const securityData = {
      orderReference,
      trackingCode,
      deliveryDate: formData.deliveryDate,
      timeSlot: formData.timeSlot,
      customerPhone: formData.phone,
      securityMeasures: {
        smsSent: true,
        preDeliveryCallScheduled: true,
        idVerificationRequired: true,
        exactChangePreferred: true
      }
    };
    
    localStorage.setItem(`cod_security_${orderReference}`, JSON.stringify(securityData));
  };

  // Bank Transfer Security Implementation
  const implementBankTransferSecurity = async (orderReference: string) => {
    // 1. Send payment verification instructions
    await sendPaymentVerificationInstructions(orderReference);
    
    // 2. Generate unique reference number
    const bankReference = `BANK${orderReference}`;
    
    // 3. Store security data for admin tracking
    const securityData = {
      orderReference,
      bankReference,
      selectedBank: formData.selectedBank,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      securityMeasures: {
        paymentVerificationRequired: true,
        receiptRequired: true,
        referenceTracking: true,
        adminNotificationSent: true
      }
    };
    
    localStorage.setItem(`bank_security_${orderReference}`, JSON.stringify(securityData));
  };

  // Send SMS confirmation for COD
  const sendSMSConfirmation = async (orderReference: string) => {
    try {
      const success = await smsService.sendOrderConfirmation(
        formData.phone,
        orderReference,
        formData.deliveryDate,
        formData.timeSlot
      );
      
      if (success) {
        console.log(`✅ SMS sent successfully to ${formData.phone}`);
      } else {
        console.log(`❌ SMS failed to send to ${formData.phone}`);
      }
      
      // Store SMS log
      const smsLog = {
        phone: formData.phone,
        message: `Order Confirmed! Ref: ${orderReference}. Delivery: ${formData.deliveryDate} (${formData.timeSlot}). Our delivery person will call 30min before arrival. Keep ID ready for verification.`,
        timestamp: new Date().toISOString(),
        orderReference,
        success
      };
      localStorage.setItem(`sms_log_${orderReference}`, JSON.stringify(smsLog));
    } catch (error) {
      console.error('SMS sending error:', error);
    }
  };

  // Schedule pre-delivery call
  const schedulePreDeliveryCall = async (orderReference: string) => {
    const callSchedule = {
      orderReference,
      customerPhone: formData.phone,
      deliveryDate: formData.deliveryDate,
      timeSlot: formData.timeSlot,
      callTime: calculatePreDeliveryCallTime(),
      status: 'scheduled'
    };
    
    localStorage.setItem(`call_schedule_${orderReference}`, JSON.stringify(callSchedule));
    console.log(`Pre-delivery call scheduled for ${callSchedule.callTime}`);
  };

  // Calculate pre-delivery call time (30 minutes before delivery)
  const calculatePreDeliveryCallTime = () => {
    const deliveryDate = new Date(formData.deliveryDate);
    const timeSlot = formData.timeSlot;
    
    let callHour;
    switch (timeSlot) {
      case 'morning': callHour = 8.5; break; // 8:30 AM
      case 'afternoon': callHour = 11.5; break; // 11:30 AM
      case 'evening': callHour = 4.5; break; // 4:30 PM
      default: callHour = 8.5;
    }
    
    deliveryDate.setHours(Math.floor(callHour), (callHour % 1) * 60, 0, 0);
    return deliveryDate.toISOString();
  };

      // Send payment verification instructions for bank transfer
      const sendPaymentVerificationInstructions = async (orderReference: string) => {
        try {
          const success = await smsService.sendPaymentInstructions(
            formData.phone,
            orderReference,
            calculateTotal()
          );
          
          if (success) {
            console.log(`✅ Payment instructions SMS sent successfully to ${formData.phone}`);
          } else {
            console.log(`❌ Payment instructions SMS failed to send to ${formData.phone}`);
          }
          
          // Store order amount for verification page
          localStorage.setItem('orderAmount', calculateTotal().toString());
          
          // Store instruction log
          const instructionLog = {
            email: formData.email,
            phone: formData.phone,
            message: `Bank Transfer Instructions for Order ${orderReference}:\n\n1. Transfer LKR ${calculateTotal().toLocaleString()} to Commercial Bank Account\n2. Include reference: ${orderReference}\n3. Upload your payment slip at: ${typeof window !== 'undefined' ? window.location.origin : 'your-website.com'}/payment-verification?ref=${orderReference}\n4. WhatsApp: +94 76 156 6346\n\nOrder will be processed after payment verification.`,
            timestamp: new Date().toISOString(),
            orderReference,
            success
          };
          localStorage.setItem(`instruction_log_${orderReference}`, JSON.stringify(instructionLog));
        } catch (error) {
          console.error('Payment instructions SMS error:', error);
        }
      };

  // Generate tracking code
  const generateTrackingCode = () => {
    return `TRK${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  };

  // Handle WhatsApp button click
  const handleWhatsAppClick = () => {
    setWhatsappOpened(true);
    // Reset after 5 seconds
    setTimeout(() => {
      setWhatsappOpened(false);
    }, 5000);
  };

  const sendOrderToWhatsApp = async (orderData: OrderData) => {
    const whatsappNumber = '0761566346';
    
    // Format items for WhatsApp message
    const itemsText = orderData.items.map((item, index) => 
      `${index + 1}. *${item.name}*\n   Size: ${item.packSize}\n   Quantity: ${item.quantity}\n   Price: LKR ${(item.price * item.quantity).toLocaleString()}\n`
    ).join('\n');
    
    const message = `================================\n` +
      ` *CEYLON NATURE LINK ORDER*\n` +
      `================================\n\n` +
      `Hello! I would like to place an order for your premium Sri Lankan spices.\n\n` +
      `========================================\n\n` +
      `*CUSTOMER INFORMATION*\n` +
      `Name: ${orderData.customer.firstName} ${orderData.customer.lastName}\n` +
      `Phone: ${orderData.customer.phone}\n\n` +
      `*DELIVERY ADDRESS*\n` +
      `${orderData.customer.address.street}\n` +
      `${orderData.customer.address.city}, ${orderData.customer.address.district}\n` +
      `Sri Lanka\n\n` +
      `*ORDER DETAILS*\n${itemsText}\n` +
      `*ORDER SUMMARY*\n` +
      `Subtotal: LKR ${orderData.subtotal.toLocaleString()}\n` +
      `Shipping: LKR ${orderData.shipping.toLocaleString()}\n` +
      `Tax: LKR ${orderData.tax.toLocaleString()}\n` +
      `========================================\n` +
      `*TOTAL AMOUNT: LKR ${orderData.total.toLocaleString()}*\n` +
      `========================================\n\n` +
      `*SPECIAL INSTRUCTIONS*\n` +
      `${orderData.notes || 'No special instructions'}\n\n` +
      `*REQUEST*\n` +
      `Please confirm my order and provide information about:\n` +
      `- Payment methods available\n` +
      `- Delivery timeline\n` +
      `- Any additional requirements\n\n` +
      `Thank you for your excellent products! Looking forward to hearing from you.\n\n` +
      `Best regards,\n` +
      `${orderData.customer.firstName} ${orderData.customer.lastName}`;
    
    const whatsappUrl = `https://wa.me/94${whatsappNumber.replace(/^0/, '')}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Store order for admin tracking
    localStorage.setItem(`order_${orderData.id}`, JSON.stringify(orderData));
  };

  const handlePlaceOrder = async () => {
    if (state.items.length === 0) return;
    
    // Validate all steps
    const step1Errors = validateStep1();
    const step2Errors = validateStep2();
    const allErrors = [...step1Errors, ...step2Errors];
    
    if (allErrors.length > 0) {
      setValidationErrors(allErrors);
      return;
    }
    
    setIsProcessing(true);
    setValidationErrors([]);
    
    try {
      // Generate unique order reference
      const orderReference = `ORD-${Date.now()}`;
      
      // Create order data
      const orderData: OrderData = {
        id: orderReference,
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: '', // Not required
          phone: formData.phone,
          address: {
            street: formData.address,
            city: formData.city,
            district: formData.district,
            postalCode: '', // Not required
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
        paymentMethod: 'whatsapp',
        status: 'pending',
        notes: formData.notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Send order to WhatsApp
      await sendOrderToWhatsApp(orderData);
      
      // Store order locally
      setCurrentOrder(orderData);
      
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Sent Successfully!</h1>
              <p className="text-xl text-gray-600 mb-8">
                Your order has been sent to our WhatsApp. We'll contact you soon to confirm details.
              </p>
              
              {/* Order Details */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  📱 Order Sent to WhatsApp
                </h3>
                
                {true ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">SMS confirmation sent to {formData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Pre-delivery call scheduled for 30 minutes before arrival</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">ID verification required upon delivery</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Delivery tracking code generated</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg mt-4">
                      <p className="text-sm text-blue-800">
                        <strong>Next Steps:</strong> Keep your ID ready. Our delivery person will call you 30 minutes before arrival on {formData.deliveryDate} during {formData.timeSlot} time slot.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Payment verification instructions sent to {formData.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Unique reference number generated for tracking</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Admin notification sent for payment verification</span>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                      <h4 className="font-semibold text-blue-800 mb-3">💳 Bank Transfer Details:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-700"><strong>Bank:</strong></span>
                          <span className="text-blue-900">Commercial Bank of Ceylon</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700"><strong>Account:</strong></span>
                          <span className="text-blue-900">Ceylon Nature Link</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700"><strong>Account No:</strong></span>
                          <span className="text-blue-900 font-mono">1234567890</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700"><strong>Amount:</strong></span>
                          <span className="text-blue-900 font-semibold">LKR {calculateTotal().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700"><strong>Reference:</strong></span>
                          <span className="text-blue-900 font-mono bg-blue-100 px-2 py-1 rounded">{currentOrder?.id || 'REF' + Date.now()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 p-3 rounded-lg mt-4">
                      <p className="text-sm text-yellow-800">
                        <strong>⚠️ Important:</strong> Include the reference number in your transfer description. After payment, upload your payment slip via WhatsApp for verification.
                      </p>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                      <h4 className="font-semibold text-green-800 mb-2">📱 Next Steps:</h4>
                      <ol className="text-sm text-green-700 space-y-1">
                        <li>1. Transfer the amount to the bank account above</li>
                        <li>2. Take a screenshot of your payment slip</li>
                        <li>3. Click the WhatsApp button below</li>
                        <li>4. Send the payment slip via WhatsApp</li>
                        <li>5. Wait for order confirmation (within 24 hours)</li>
                      </ol>
                    </div>
                    
                    <div className="mt-6">
                      <Link href={`/payment-verification?ref=${currentOrder?.id || 'REF' + Date.now()}`}>
                        <AnimatedButton 
                          variant="animated"
                          onClick={handleWhatsAppClick}
                          className="w-full py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0 text-lg"
                        >
                          📱 Send Payment Slip via WhatsApp
                        </AnimatedButton>
                      </Link>
                    </div>
                    
                    {/* Success Message */}
                    {whatsappOpened && (
                      <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 transition-all duration-300 ease-in-out">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-green-800">WhatsApp Opened Successfully!</span>
                        </div>
                        <p className="text-sm text-green-700 mt-2">
                          Upload your payment slip and send it to +94 76 156 6346. We'll verify and confirm your order within 24 hours.
                        </p>
                        <div className="mt-3 text-xs text-green-600">
                          <strong>Order Status:</strong> Pending Payment Verification
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <Link href="/marketplace">
                  <AnimatedButton variant="animated" className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0">
                    Continue Shopping
                  </AnimatedButton>
                </Link>
                <Link href="/">
                  <AnimatedButton className="ml-4 border-2 border-gray-400 bg-gray-50 text-gray-700 hover:bg-green-400 hover:text-white transition-all duration-300">
                    Back to Home
                  </AnimatedButton>
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
                <AnimatedButton variant="animated" className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0">
                  Start Shopping
                </AnimatedButton>
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
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 2: Review & Place Order */}
                {step === 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                        Review & Place Order
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-3">📱 Order Process</h4>
                        <p className="text-sm text-blue-700 mb-3">
                          Your order will be sent directly to our WhatsApp (+94 76 156 6346) for processing. 
                          We'll contact you within 24 hours to confirm details and arrange payment/delivery.
                        </p>
                        <div className="space-y-2 text-sm text-blue-600">
                          <div className="flex items-center space-x-2">
                            <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                            <span>Order sent to WhatsApp</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                            <span>We contact you to confirm</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                            <span>Payment and delivery arranged</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Order Summary</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Customer:</span>
                            <span>{formData.firstName} {formData.lastName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Phone:</span>
                            <span>{formData.phone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Address:</span>
                            <span className="text-right">{formData.address}, {formData.city}, {formData.district}</span>
                          </div>
                          <div className="flex justify-between font-semibold text-lg">
                            <span>Total:</span>
                            <span>LKR {calculateTotal().toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="agreeTerms"
                            checked={formData.agreeTerms}
                            onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                          />
                          <Label htmlFor="agreeTerms" className="text-sm">
                            I agree to the terms and conditions and understand that this order will be processed via WhatsApp
                          </Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}


                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  {step > 1 && (
                    <AnimatedButton
                      onClick={() => setStep(step - 1)}
                      className="border-2 border-gray-400 bg-gray-50 text-gray-700 hover:bg-green-400 hover:text-white transition-all duration-300 px-6 py-2"
                    >
                      Previous
                    </AnimatedButton>
                  )}
                  {step < 2 && (
                    <AnimatedButton
                      variant="animated"
                      onClick={() => {
                        if (step === 1) {
                          // Validate customer information
                          const errors = validateStep1();
                          if (errors.length > 0) {
                            setValidationErrors(errors);
                            return;
                          }
                          setStep(2);
                        }
                      }}
                      className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0"
                    >
                      Next
                    </AnimatedButton>
                  )}
                  {step === 2 && (
                    <AnimatedButton
                      variant="animated"
                      onClick={handlePlaceOrder}
                      disabled={!formData.agreeTerms || isProcessing}
                      className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0 disabled:opacity-50"
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </AnimatedButton>
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
