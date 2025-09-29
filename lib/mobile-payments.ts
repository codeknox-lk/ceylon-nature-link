// Sri Lankan Mobile Payment Integration
export interface MobilePaymentProvider {
  name: string;
  code: string;
  logo: string;
  instructions: string;
  qrCode?: string;
}

export interface MobilePayment {
  id: string;
  amount: number;
  currency: string;
  reference: string;
  provider: string;
  status: 'pending' | 'completed' | 'failed';
  customerInfo: {
    name: string;
    phone: string;
    email: string;
  };
  createdAt: string;
  completedAt?: string;
}

// Sri Lankan Mobile Payment Providers
export const MOBILE_PAYMENT_PROVIDERS = {
  'Dialog eZ Cash': {
    name: 'Dialog eZ Cash',
    code: 'DIALOG',
    logo: '/mobile-payments/dialog-ez-cash.png',
    instructions: 'Send money to +94 77 123 4567 via Dialog eZ Cash',
    qrCode: 'dialog://pay?amount=AMOUNT&reference=REFERENCE'
  },
  'Mobitel mCash': {
    name: 'Mobitel mCash',
    code: 'MOBITEL',
    logo: '/mobile-payments/mobitel-mcash.png',
    instructions: 'Send money to +94 77 123 4567 via Mobitel mCash',
    qrCode: 'mobitel://pay?amount=AMOUNT&reference=REFERENCE'
  },
  'Hutch eZ Cash': {
    name: 'Hutch eZ Cash',
    code: 'HUTCH',
    logo: '/mobile-payments/hutch-ez-cash.png',
    instructions: 'Send money to +94 77 123 4567 via Hutch eZ Cash',
    qrCode: 'hutch://pay?amount=AMOUNT&reference=REFERENCE'
  },
  'Airtel Money': {
    name: 'Airtel Money',
    code: 'AIRTEL',
    logo: '/mobile-payments/airtel-money.png',
    instructions: 'Send money to +94 77 123 4567 via Airtel Money',
    qrCode: 'airtel://pay?amount=AMOUNT&reference=REFERENCE'
  }
};

export class MobilePaymentService {
  // Generate payment reference
  static generatePaymentReference(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    return `CNL-${timestamp}-${random}`;
  }

  // Create mobile payment
  static createMobilePayment(
    amount: number,
    customerInfo: any,
    provider: string
  ): MobilePayment {
    return {
      id: `mobile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount,
      currency: 'LKR',
      reference: this.generatePaymentReference(),
      provider,
      status: 'pending',
      customerInfo,
      createdAt: new Date().toISOString()
    };
  }

  // Generate payment instructions
  static generatePaymentInstructions(payment: MobilePayment): string {
    const provider = MOBILE_PAYMENT_PROVIDERS[payment.provider as keyof typeof MOBILE_PAYMENT_PROVIDERS];
    
    return `
${provider.name} PAYMENT INSTRUCTIONS

Amount: LKR ${payment.amount.toLocaleString()}
Reference: ${payment.reference}
Phone: +94 77 123 4567

${provider.instructions}

1. Open your ${provider.name} app
2. Select "Send Money" or "Transfer"
3. Enter phone number: +94 77 123 4567
4. Enter amount: LKR ${payment.amount.toLocaleString()}
5. Add reference: ${payment.reference}
6. Complete the transaction
7. Take a screenshot of the receipt
8. Email receipt to: orders@ceylonnaturelink.com

Your order will be processed once payment is confirmed.
    `.trim();
  }

  // Verify mobile payment
  static async verifyMobilePayment(reference: string): Promise<{ verified: boolean; amount?: number }> {
    // In a real implementation, this would integrate with mobile payment APIs
    // For demo purposes, we'll simulate verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate 85% verification success
    const isVerified = Math.random() > 0.15;
    
    if (isVerified) {
      return { verified: true, amount: Math.floor(Math.random() * 10000) + 1000 };
    }
    
    return { verified: false };
  }
}
