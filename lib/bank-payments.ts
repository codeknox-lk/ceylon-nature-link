// Sri Lankan Bank Payment Integration
export interface BankPaymentDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
  branch: string;
  swiftCode?: string;
}

export interface BankTransfer {
  id: string;
  amount: number;
  currency: string;
  reference: string;
  status: 'pending' | 'completed' | 'failed';
  bankDetails: BankPaymentDetails;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  createdAt: string;
  completedAt?: string;
}

// Sri Lankan Bank Details
export const SRI_LANKAN_BANKS = {
  'Commercial Bank': {
    bankName: 'Commercial Bank of Ceylon',
    accountNumber: '1234567890',
    accountName: 'Ceylon Nature Link',
    branch: 'Colombo 03',
    swiftCode: 'COCEYSLX'
  },
  'People\'s Bank': {
    bankName: 'People\'s Bank',
    accountNumber: '9876543210',
    accountName: 'Ceylon Nature Link',
    branch: 'Colombo 07',
    swiftCode: 'PEOBSLKL'
  },
  'Sampath Bank': {
    bankName: 'Sampath Bank',
    accountNumber: '1122334455',
    accountName: 'Ceylon Nature Link',
    branch: 'Colombo 05',
    swiftCode: 'SAMPBSLKL'
  },
  'Hatton National Bank': {
    bankName: 'Hatton National Bank',
    accountNumber: '5566778899',
    accountName: 'Ceylon Nature Link',
    branch: 'Colombo 01',
    swiftCode: 'HNBBSLKL'
  }
};

export class BankPaymentService {
  // Generate payment reference
  static generatePaymentReference(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    return `CNL-${timestamp}-${random}`;
  }

  // Create bank transfer instruction
  static createBankTransfer(
    amount: number,
    customerInfo: any,
    selectedBank: string
  ): BankTransfer {
    const bankDetails = SRI_LANKAN_BANKS[selectedBank as keyof typeof SRI_LANKAN_BANKS];
    
    return {
      id: `bank_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount,
      currency: 'LKR',
      reference: this.generatePaymentReference(),
      status: 'pending',
      bankDetails,
      customerInfo,
      createdAt: new Date().toISOString()
    };
  }

  // Generate payment instructions
  static generatePaymentInstructions(transfer: BankTransfer): string {
    return `
PAYMENT INSTRUCTIONS FOR ORDER ${transfer.reference}

Amount: LKR ${transfer.amount.toLocaleString()}
Bank: ${transfer.bankDetails.bankName}
Account Number: ${transfer.bankDetails.accountNumber}
Account Name: ${transfer.bankDetails.accountName}
Branch: ${transfer.bankDetails.branch}
Reference: ${transfer.reference}

Please transfer the exact amount and include the reference number.
Once payment is made, please email us the bank receipt to confirm your order.

Email: orders@ceylonnaturelink.com
Phone: +94 77 123 4567
    `.trim();
  }

  // Verify payment (manual process)
  static async verifyPayment(reference: string): Promise<{ verified: boolean; amount?: number }> {
    // In a real implementation, this would check your bank account
    // For demo purposes, we'll simulate verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate 90% verification success
    const isVerified = Math.random() > 0.1;
    
    if (isVerified) {
      return { verified: true, amount: Math.floor(Math.random() * 10000) + 1000 };
    }
    
    return { verified: false };
  }
}
