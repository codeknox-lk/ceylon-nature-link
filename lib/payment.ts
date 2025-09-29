export interface PaymentDetails {
  amount: number;
  currency: string;
  paymentMethod: 'card' | 'bank' | 'mobile';
  cardDetails?: {
    number: string;
    expiry: string;
    cvv: string;
    name: string;
  };
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
  retryable?: boolean;
}

export interface OrderData {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      district: string;
      postalCode: string;
      country: string;
    };
  };
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    packSize: string;
    sku: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Simulate payment processing
export async function processPayment(paymentDetails: PaymentDetails): Promise<PaymentResult> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simulate payment validation
  if (paymentDetails.paymentMethod === 'card') {
    if (!paymentDetails.cardDetails) {
      return {
        success: false,
        error: 'Card details are required for card payments',
        retryable: false
      };
    }

    // Simulate card validation
    const cardNumber = paymentDetails.cardDetails.number.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(cardNumber)) {
      return {
        success: false,
        error: 'Invalid card number',
        retryable: true
      };
    }

    // Simulate CVV validation
    if (!/^\d{3,4}$/.test(paymentDetails.cardDetails.cvv)) {
      return {
        success: false,
        error: 'Invalid CVV',
        retryable: true
      };
    }

    // Simulate expiry date validation
    const [month, year] = paymentDetails.cardDetails.expiry.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      return {
        success: false,
        error: 'Card has expired',
        retryable: true
      };
    }
  }

  // Simulate payment processing success/failure (90% success rate)
  const isSuccess = Math.random() > 0.1;

  if (!isSuccess) {
    return {
      success: false,
      error: 'Payment processing failed. Please try again.',
      retryable: true
    };
  }

  // Generate transaction ID
  const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return {
    success: true,
    transactionId
  };
}

// Create order
export async function createOrder(orderData: OrderData): Promise<OrderData> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real application, this would save to a database
  const order = {
    ...orderData,
    status: 'processing' as const,
    updatedAt: new Date().toISOString()
  };

  // Save to localStorage for demo purposes
  const existingOrders = JSON.parse(localStorage.getItem('ceylon-nature-orders') || '[]');
  existingOrders.push(order);
  localStorage.setItem('ceylon-nature-orders', JSON.stringify(existingOrders));

  return order;
}

// Get order by ID
export function getOrderById(orderId: string): OrderData | null {
  const orders = JSON.parse(localStorage.getItem('ceylon-nature-orders') || '[]');
  return orders.find((order: OrderData) => order.id === orderId) || null;
}

// Get orders by customer email
export function getOrdersByCustomer(email: string): OrderData[] {
  const orders = JSON.parse(localStorage.getItem('ceylon-nature-orders') || '[]');
  return orders.filter((order: OrderData) => order.customer.email === email);
}

// Update order status
export function updateOrderStatus(orderId: string, status: OrderData['status']): boolean {
  const orders = JSON.parse(localStorage.getItem('ceylon-nature-orders') || '[]');
  const orderIndex = orders.findIndex((order: OrderData) => order.id === orderId);
  
  if (orderIndex === -1) return false;
  
  orders[orderIndex].status = status;
  orders[orderIndex].updatedAt = new Date().toISOString();
  localStorage.setItem('ceylon-nature-orders', JSON.stringify(orders));
  
  return true;
}

// Send order confirmation email (simulated)
export async function sendOrderConfirmation(order: OrderData): Promise<boolean> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // In a real application, this would send an actual email
  console.log('Order confirmation email sent to:', order.customer.email);
  console.log('Order details:', order);

  return true;
}

// Calculate shipping cost
export function calculateShipping(subtotal: number, district: string): number {
  // Free shipping for orders over LKR 2,000
  if (subtotal >= 2000) {
    return 0;
  }

  // Different shipping rates based on district
  const shippingRates: { [key: string]: number } = {
    'Colombo': 150,
    'Gampaha': 200,
    'Kalutara': 250,
    'Kandy': 300,
    'Matale': 350,
    'Nuwara Eliya': 400,
    'Galle': 300,
    'Matara': 350,
    'Hambantota': 400,
    'Jaffna': 500,
    'Kilinochchi': 550,
    'Mannar': 500,
    'Vavuniya': 450,
    'Mullaitivu': 500,
    'Batticaloa': 400,
    'Ampara': 450,
    'Trincomalee': 400,
    'Kurunegala': 300,
    'Puttalam': 350,
    'Anuradhapura': 400,
    'Polonnaruwa': 350,
    'Badulla': 400,
    'Moneragala': 450,
    'Ratnapura': 300,
    'Kegalle': 250
  };

  return shippingRates[district] || 500; // Default rate for other districts
}

// Calculate tax (15% VAT)
export function calculateTax(subtotal: number): number {
  return Math.round(subtotal * 0.15);
}

// Validate payment details
export function validatePaymentDetails(paymentDetails: PaymentDetails): string[] {
  const errors: string[] = [];

  if (!paymentDetails.customerInfo.firstName.trim()) {
    errors.push('First name is required');
  }

  if (!paymentDetails.customerInfo.lastName.trim()) {
    errors.push('Last name is required');
  }

  if (!paymentDetails.customerInfo.email.trim()) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(paymentDetails.customerInfo.email)) {
      errors.push('Please enter a valid email address');
    }
  }

  if (!paymentDetails.customerInfo.phone.trim()) {
    errors.push('Phone number is required');
  } else {
    const phoneRegex = /^(\+94|0)[0-9]{9}$/;
    if (!phoneRegex.test(paymentDetails.customerInfo.phone.replace(/\s/g, ''))) {
      errors.push('Please enter a valid Sri Lankan phone number');
    }
  }

  if (paymentDetails.paymentMethod === 'card' && paymentDetails.cardDetails) {
    if (!paymentDetails.cardDetails.number.trim()) {
      errors.push('Card number is required');
    }

    if (!paymentDetails.cardDetails.expiry.trim()) {
      errors.push('Expiry date is required');
    }

    if (!paymentDetails.cardDetails.cvv.trim()) {
      errors.push('CVV is required');
    }

    if (!paymentDetails.cardDetails.name.trim()) {
      errors.push('Cardholder name is required');
    }
  }

  return errors;
}
