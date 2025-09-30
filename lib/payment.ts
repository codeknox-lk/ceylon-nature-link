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

// Calculate shipping cost based on distance from Matale
export function calculateShipping(subtotal: number, district: string): number {
  // Free shipping for orders over LKR 2,000
  if (subtotal >= 2000) {
    return 0;
  }

  // Shipping rates based on distance from Matale (delivery origin)
  const shippingRates: { [key: string]: number } = {
    // Central Province (closest to Matale)
    'Matale': 200,        // Same district - lowest cost
    'Kandy': 250,         // Very close to Matale
    'Nuwara Eliya': 300,  // Close to Matale
    
    // Western Province (moderate distance)
    'Colombo': 400,       // Capital city - moderate distance
    'Gampaha': 450,       // Close to Colombo
    'Kalutara': 500,      // Further west
    
    // Sabaragamuwa Province (close to central)
    'Ratnapura': 300,     // Close to central province
    'Kegalle': 350,       // Between Kandy and Colombo
    
    // North Western Province (moderate distance)
    'Kurunegala': 400,    // Moderate distance from Matale
    'Puttalam': 450,      // Further north west
    
    // North Central Province (moderate distance)
    'Anuradhapura': 450,  // Moderate distance
    'Polonnaruwa': 400,   // Moderate distance
    
    // Uva Province (moderate distance)
    'Badulla': 400,       // Moderate distance
    'Moneragala': 450,    // Further south east
    
    // Southern Province (further distance)
    'Galle': 500,         // Further south
    'Matara': 550,        // Further south
    'Hambantota': 600,    // Furthest south
    
    // Eastern Province (further distance)
    'Batticaloa': 550,    // Further east
    'Ampara': 600,        // Further east
    'Trincomalee': 500,   // Further east
    
    // Northern Province (furthest distance)
    'Jaffna': 700,        // Furthest north
    'Kilinochchi': 750,   // Furthest north
    'Mannar': 700,        // Furthest north west
    'Vavuniya': 650,      // Far north
    'Mullaitivu': 750     // Furthest north east
  };

  return shippingRates[district] || 600; // Default rate for other districts
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
