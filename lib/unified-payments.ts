// Unified Payment System - Multiple Payment Methods
import { BankPaymentService, BankTransfer } from './bank-payments';
import { MobilePaymentService, MobilePayment } from './mobile-payments';
import { CODPaymentService, CODPayment } from './cod-payments';
import { PayPalPaymentService, PayPalPayment } from './paypal-payments';

export type PaymentMethod = 'cod';

export interface UnifiedPayment {
  id: string;
  method: PaymentMethod;
  amount: number;
  currency: string;
  reference: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address?: any;
  };
  paymentDetails: BankTransfer | MobilePayment | CODPayment | PayPalPayment;
  createdAt: string;
  completedAt?: string;
}

export interface PaymentInstructions {
  method: PaymentMethod;
  instructions: string;
  reference: string;
  amount: number;
  additionalInfo?: any;
}

export class UnifiedPaymentService {
  // Create payment based on method
  static async createPayment(
    method: PaymentMethod,
    amount: number,
    customerInfo: any,
    additionalData?: any
  ): Promise<{ success: boolean; payment?: UnifiedPayment; instructions?: PaymentInstructions; error?: string }> {
    try {
      let paymentDetails: any;
      let instructions: string;

      switch (method) {
        case 'bank_transfer':
          const bankTransfer = BankPaymentService.createBankTransfer(
            amount,
            customerInfo,
            additionalData?.selectedBank || 'Commercial Bank'
          );
          paymentDetails = bankTransfer;
          instructions = BankPaymentService.generatePaymentInstructions(bankTransfer);
          break;

        case 'mobile_payment':
          const mobilePayment = MobilePaymentService.createMobilePayment(
            amount,
            customerInfo,
            additionalData?.provider || 'Dialog eZ Cash'
          );
          paymentDetails = mobilePayment;
          instructions = MobilePaymentService.generatePaymentInstructions(mobilePayment);
          break;

        case 'cod':
          const codPayment = CODPaymentService.createCODPayment(
            amount,
            customerInfo,
            additionalData?.deliveryDate || new Date().toISOString().split('T')[0],
            additionalData?.timeSlot || 'morning'
          );
          paymentDetails = codPayment;
          instructions = CODPaymentService.generateCODInstructions(codPayment);
          break;

        case 'paypal':
          const paypalResult = await PayPalPaymentService.createPayPalPayment(
            amount,
            'LKR',
            customerInfo,
            `ORD-${Date.now()}`
          );
          
          if (!paypalResult.success) {
            return { success: false, error: paypalResult.error };
          }
          
          paymentDetails = {
            id: `paypal_${Date.now()}`,
            amount,
            currency: 'LKR',
            reference: `ORD-${Date.now()}`,
            status: 'pending',
            customerInfo,
            createdAt: new Date().toISOString(),
            paymentUrl: paypalResult.paymentUrl
          };
          instructions = `Please complete your payment using PayPal: ${paypalResult.paymentUrl}`;
          break;

        default:
          return { success: false, error: 'Invalid payment method' };
      }

      const payment: UnifiedPayment = {
        id: `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        method,
        amount,
        currency: 'LKR',
        reference: paymentDetails.reference,
        status: 'pending',
        customerInfo,
        paymentDetails,
        createdAt: new Date().toISOString()
      };

      const paymentInstructions: PaymentInstructions = {
        method,
        instructions,
        reference: paymentDetails.reference,
        amount,
        additionalInfo: paymentDetails
      };

      return {
        success: true,
        payment,
        instructions: paymentInstructions
      };

    } catch (error) {
      return {
        success: false,
        error: 'Failed to create payment'
      };
    }
  }

  // Verify payment
  static async verifyPayment(
    payment: UnifiedPayment
  ): Promise<{ verified: boolean; amount?: number; error?: string }> {
    try {
      switch (payment.method) {
        case 'bank_transfer':
          return await BankPaymentService.verifyPayment(payment.reference);

        case 'mobile_payment':
          return await MobilePaymentService.verifyMobilePayment(payment.reference);

        case 'cod':
          // COD doesn't need verification - payment is made on delivery
          return { verified: true, amount: payment.amount };

        case 'paypal':
          return await PayPalPaymentService.verifyPayPalPayment(payment.paymentDetails.id);

        default:
          return { verified: false, error: 'Invalid payment method' };
      }
    } catch (error) {
      return { verified: false, error: 'Verification failed' };
    }
  }

  // Get available payment methods
  static getAvailablePaymentMethods(): Array<{
    id: PaymentMethod;
    name: string;
    description: string;
    icon: string;
    fees: number;
    processingTime: string;
  }> {
    return [
      {
        id: 'cod',
        name: 'Cash on Delivery',
        description: 'Pay in cash when your order is delivered',
        icon: '💰',
        fees: 200,
        processingTime: 'On delivery'
      }
    ];
  }

  // Get payment method details
  static getPaymentMethodDetails(method: PaymentMethod): any {
    switch (method) {
      case 'cod':
        return {
          deliveryDates: CODPaymentService.getAvailableDeliveryDates(),
          timeSlots: CODPaymentService.getAvailableTimeSlots(new Date().toISOString().split('T')[0]),
          deliveryFees: require('./cod-payments').DELIVERY_FEES
        };

      default:
        return {};
    }
  }

  // Update payment status
  static updatePaymentStatus(
    payment: UnifiedPayment,
    status: UnifiedPayment['status']
  ): UnifiedPayment {
    const updatedPayment = { ...payment, status };
    
    if (status === 'completed') {
      updatedPayment.completedAt = new Date().toISOString();
    }
    
    return updatedPayment;
  }

  // Get payment history
  static getPaymentHistory(): UnifiedPayment[] {
    // In a real implementation, this would fetch from database
    return [];
  }

  // Cancel payment
  static cancelPayment(payment: UnifiedPayment): UnifiedPayment {
    return this.updatePaymentStatus(payment, 'cancelled');
  }
}
