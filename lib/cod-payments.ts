// Cash on Delivery (COD) Payment System
export interface CODPayment {
  id: string;
  amount: number;
  currency: string;
  reference: string;
  status: 'pending' | 'out_for_delivery' | 'delivered' | 'failed';
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    address: {
      street: string;
      city: string;
      district: string;
      postalCode: string;
    };
  };
  deliveryInfo: {
    deliveryDate: string;
    timeSlot: string;
    deliveryFee: number;
    totalAmount: number;
  };
  createdAt: string;
  deliveredAt?: string;
}

export interface DeliveryTimeSlot {
  id: string;
  label: string;
  time: string;
  available: boolean;
}

// Delivery time slots
export const DELIVERY_TIME_SLOTS: DeliveryTimeSlot[] = [
  { id: 'morning', label: 'Morning (9:00 AM - 12:00 PM)', time: '09:00-12:00', available: true },
  { id: 'afternoon', label: 'Afternoon (12:00 PM - 3:00 PM)', time: '12:00-15:00', available: true },
  { id: 'evening', label: 'Evening (3:00 PM - 6:00 PM)', time: '15:00-18:00', available: true },
  { id: 'night', label: 'Night (6:00 PM - 9:00 PM)', time: '18:00-21:00', available: false }
];

// Delivery fees by district
export const DELIVERY_FEES = {
  'Colombo': 200,
  'Gampaha': 250,
  'Kalutara': 300,
  'Kandy': 400,
  'Galle': 450,
  'Matara': 500,
  'Jaffna': 600,
  'Anuradhapura': 550,
  'Trincomalee': 500,
  'Batticaloa': 600,
  'Other': 700
};

export class CODPaymentService {
  // Generate COD reference
  static generateCODReference(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    return `COD-${timestamp}-${random}`;
  }

  // Create COD payment
  static createCODPayment(
    amount: number,
    customerInfo: any,
    deliveryDate: string,
    timeSlot: string
  ): CODPayment {
    const deliveryFee = this.calculateDeliveryFee(customerInfo.address.district);
    const totalAmount = amount + deliveryFee;

    return {
      id: `cod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount,
      currency: 'LKR',
      reference: this.generateCODReference(),
      status: 'pending',
      customerInfo,
      deliveryInfo: {
        deliveryDate,
        timeSlot,
        deliveryFee,
        totalAmount
      },
      createdAt: new Date().toISOString()
    };
  }

  // Calculate delivery fee
  static calculateDeliveryFee(district: string): number {
    return DELIVERY_FEES[district as keyof typeof DELIVERY_FEES] || DELIVERY_FEES.Other;
  }

  // Generate COD instructions
  static generateCODInstructions(payment: CODPayment): string {
    return `
CASH ON DELIVERY (COD) ORDER CONFIRMATION

Order Reference: ${payment.reference}
Customer: ${payment.customerInfo.name}
Phone: ${payment.customerInfo.phone}
Email: ${payment.customerInfo.email}

Delivery Address:
${payment.customerInfo.address.street}
${payment.customerInfo.address.city}, ${payment.customerInfo.address.district}
${payment.customerInfo.address.postalCode}

Order Details:
- Product Amount: LKR ${payment.amount.toLocaleString()}
- Delivery Fee: LKR ${payment.deliveryInfo.deliveryFee.toLocaleString()}
- Total Amount: LKR ${payment.deliveryInfo.totalAmount.toLocaleString()}

Delivery Schedule:
- Date: ${payment.deliveryInfo.deliveryDate}
- Time: ${payment.deliveryInfo.timeSlot}

Payment Instructions:
1. Our delivery person will call you before delivery
2. Please have the exact amount ready (LKR ${payment.deliveryInfo.totalAmount.toLocaleString()})
3. Payment is made in cash upon delivery
4. You can inspect the products before payment
5. Receipt will be provided upon payment

Contact Information:
- Phone: +94 77 123 4567
- Email: orders@ceylonnaturelink.com
- WhatsApp: +94 77 123 4567

Thank you for choosing Ceylon Nature Link!
    `.trim();
  }

  // Update COD status
  static updateCODStatus(
    payment: CODPayment,
    status: CODPayment['status']
  ): CODPayment {
    const updatedPayment = { ...payment, status };
    
    if (status === 'delivered') {
      updatedPayment.deliveredAt = new Date().toISOString();
    }
    
    return updatedPayment;
  }

  // Get available delivery dates
  static getAvailableDeliveryDates(): string[] {
    const dates: string[] = [];
    const today = new Date();
    
    // Generate next 7 days
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  }

  // Get available time slots for a date
  static getAvailableTimeSlots(date: string): DeliveryTimeSlot[] {
    // In a real implementation, this would check actual availability
    // For demo purposes, return all slots as available
    return DELIVERY_TIME_SLOTS.map(slot => ({ ...slot, available: true }));
  }
}
