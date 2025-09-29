// Stripe configuration for production-ready payments
export const STRIPE_CONFIG = {
  // In production, these would be environment variables
  PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51234567890abcdef',
  SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'sk_test_51234567890abcdef',
  WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_1234567890abcdef',
  
  // Currency settings for Sri Lanka
  CURRENCY: 'lkr',
  COUNTRY: 'LK',
  
  // Payment methods
  PAYMENT_METHODS: ['card', 'fpx', 'grabpay', 'alipay'],
  
  // Business information
  BUSINESS_NAME: 'Ceylon Nature Link',
  BUSINESS_EMAIL: 'orders@ceylonnaturelink.com',
  BUSINESS_PHONE: '+94 77 123 4567',
};

export interface StripePaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled';
  client_secret: string;
  metadata: Record<string, string>;
}

export interface StripeCustomer {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

// Stripe API client (simulated for demo)
export class StripeService {
  private static baseUrl = 'https://api.stripe.com/v1';
  
  // Create payment intent
  static async createPaymentIntent(
    amount: number,
    currency: string = STRIPE_CONFIG.CURRENCY,
    customerId?: string,
    metadata: Record<string, string> = {}
  ): Promise<StripePaymentIntent> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const paymentIntent: StripePaymentIntent = {
      id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount,
      currency,
      status: 'requires_payment_method',
      client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
      metadata: {
        ...metadata,
        business_name: STRIPE_CONFIG.BUSINESS_NAME,
      }
    };
    
    return paymentIntent;
  }
  
  // Confirm payment intent
  static async confirmPaymentIntent(
    paymentIntentId: string,
    paymentMethodId: string
  ): Promise<{ success: boolean; error?: string }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate 95% success rate
    const isSuccess = Math.random() > 0.05;
    
    if (!isSuccess) {
      return {
        success: false,
        error: 'Payment failed. Please try again with a different payment method.'
      };
    }
    
    return { success: true };
  }
  
  // Create customer
  static async createCustomer(
    email: string,
    name: string,
    phone?: string,
    address?: any
  ): Promise<StripeCustomer> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      id: `cus_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      name,
      phone,
      address
    };
  }
  
  // Create payment method
  static async createPaymentMethod(
    type: string = 'card',
    cardDetails: any
  ): Promise<PaymentMethod> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      id: `pm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      card: {
        brand: this.detectCardBrand(cardDetails.number),
        last4: cardDetails.number.slice(-4),
        exp_month: parseInt(cardDetails.expiry.split('/')[0]),
        exp_year: parseInt(cardDetails.expiry.split('/')[1]) + 2000,
      }
    };
  }
  
  // Detect card brand
  private static detectCardBrand(cardNumber: string): string {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(cleanNumber)) return 'visa';
    if (/^5[1-5]/.test(cleanNumber)) return 'mastercard';
    if (/^3[47]/.test(cleanNumber)) return 'amex';
    if (/^6/.test(cleanNumber)) return 'discover';
    
    return 'unknown';
  }
  
  // Process refund
  static async createRefund(
    paymentIntentId: string,
    amount?: number,
    reason: string = 'requested_by_customer'
  ): Promise<{ success: boolean; refundId?: string; error?: string }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      refundId: `re_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }
  
  // Get payment intent status
  static async getPaymentIntent(paymentIntentId: string): Promise<StripePaymentIntent | null> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real implementation, this would fetch from Stripe API
    return {
      id: paymentIntentId,
      amount: 0,
      currency: STRIPE_CONFIG.CURRENCY,
      status: 'succeeded',
      client_secret: '',
      metadata: {}
    };
  }
}

// Webhook handler for Stripe events
export class StripeWebhookHandler {
  static async handleWebhook(
    payload: string,
    signature: string,
    secret: string
  ): Promise<{ success: boolean; event?: any }> {
    // Verify webhook signature
    if (!this.verifySignature(payload, signature, secret)) {
      return { success: false };
    }
    
    const event = JSON.parse(payload);
    
    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.handlePaymentSucceeded(event.data.object);
        break;
        
      case 'payment_intent.payment_failed':
        await this.handlePaymentFailed(event.data.object);
        break;
        
      case 'charge.dispute.created':
        await this.handleDisputeCreated(event.data.object);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    return { success: true, event };
  }
  
  private static verifySignature(payload: string, signature: string, secret: string): boolean {
    // In production, this would use Stripe's webhook signature verification
    return signature.startsWith('t=') && signature.includes('v1=');
  }
  
  private static async handlePaymentSucceeded(paymentIntent: any): Promise<void> {
    console.log('Payment succeeded:', paymentIntent.id);
    // Update order status in database
    // Send confirmation email
    // Update inventory
  }
  
  private static async handlePaymentFailed(paymentIntent: any): Promise<void> {
    console.log('Payment failed:', paymentIntent.id);
    // Update order status
    // Send failure notification
  }
  
  private static async handleDisputeCreated(dispute: any): Promise<void> {
    console.log('Dispute created:', dispute.id);
    // Handle dispute
    // Notify admin
  }
}

// Payment form validation
export class PaymentFormValidator {
  static validateCardNumber(cardNumber: string): { isValid: boolean; error?: string } {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    
    if (!/^\d{13,19}$/.test(cleanNumber)) {
      return { isValid: false, error: 'Invalid card number' };
    }
    
    // Luhn algorithm validation
    let sum = 0;
    let isEven = false;
    
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    if (sum % 10 !== 0) {
      return { isValid: false, error: 'Invalid card number' };
    }
    
    return { isValid: true };
  }
  
  static validateExpiryDate(expiry: string): { isValid: boolean; error?: string } {
    const [month, year] = expiry.split('/');
    
    if (!month || !year) {
      return { isValid: false, error: 'Invalid expiry date format' };
    }
    
    const expMonth = parseInt(month);
    const expYear = parseInt(year) + 2000;
    
    if (expMonth < 1 || expMonth > 12) {
      return { isValid: false, error: 'Invalid month' };
    }
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return { isValid: false, error: 'Card has expired' };
    }
    
    return { isValid: true };
  }
  
  static validateCVV(cvv: string): { isValid: boolean; error?: string } {
    if (!/^\d{3,4}$/.test(cvv)) {
      return { isValid: false, error: 'Invalid CVV' };
    }
    
    return { isValid: true };
  }
  
  static validateCardholderName(name: string): { isValid: boolean; error?: string } {
    if (!name.trim()) {
      return { isValid: false, error: 'Cardholder name is required' };
    }
    
    if (name.length < 2) {
      return { isValid: false, error: 'Cardholder name is too short' };
    }
    
    if (name.length > 50) {
      return { isValid: false, error: 'Cardholder name is too long' };
    }
    
    return { isValid: true };
  }
}

// Secure payment processing
export class SecurePaymentProcessor {
  static async processPayment(
    amount: number,
    currency: string,
    paymentMethod: any,
    customerInfo: any,
    orderId: string
  ): Promise<{ success: boolean; paymentIntentId?: string; error?: string }> {
    try {
      // Create customer
      const customer = await StripeService.createCustomer(
        customerInfo.email,
        `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerInfo.phone,
        {
          line1: customerInfo.address,
          city: customerInfo.city,
          state: customerInfo.district,
          postal_code: customerInfo.postalCode,
          country: 'LK'
        }
      );
      
      // Create payment method
      const paymentMethodData = await StripeService.createPaymentMethod(
        'card',
        paymentMethod
      );
      
      // Create payment intent
      const paymentIntent = await StripeService.createPaymentIntent(
        amount,
        currency,
        customer.id,
        {
          order_id: orderId,
          customer_email: customerInfo.email,
          business_name: STRIPE_CONFIG.BUSINESS_NAME
        }
      );
      
      // Confirm payment
      const confirmation = await StripeService.confirmPaymentIntent(
        paymentIntent.id,
        paymentMethodData.id
      );
      
      if (!confirmation.success) {
        return {
          success: false,
          error: confirmation.error
        };
      }
      
      return {
        success: true,
        paymentIntentId: paymentIntent.id
      };
      
    } catch (error) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        error: 'Payment processing failed. Please try again.'
      };
    }
  }
}
