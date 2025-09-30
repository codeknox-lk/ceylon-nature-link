// SMS Service for Real SMS Integration
// Replace with your actual SMS provider API

export interface SMSConfig {
  apiKey: string;
  apiUrl: string;
  senderId: string;
}

export interface SMSMessage {
  to: string;
  message: string;
  orderReference: string;
}

export class SMSService {
  private config: SMSConfig;

  constructor(config: SMSConfig) {
    this.config = config;
  }

  // Send SMS using your chosen provider
  async sendSMS(message: SMSMessage): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      // TODO: Replace this with your actual SMS provider API call
      // Example for Dialog SMS API:
      /*
      const response = await fetch(this.config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          to: message.to,
          message: message.message,
          sender: this.config.senderId
        })
      });

      const result = await response.json();
      return { success: true, messageId: result.messageId };
      */

      // For now, simulate SMS sending (remove this in production)
      console.log(`📱 SMS SENT TO: ${message.to}`);
      console.log(`📱 MESSAGE: ${message.message}`);
      console.log(`📱 ORDER REF: ${message.orderReference}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { 
        success: true, 
        messageId: `SMS_${Date.now()}`,
        error: 'SMS simulation - replace with real API'
      };

    } catch (error) {
      console.error('SMS sending failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Send order confirmation SMS
  async sendOrderConfirmation(phone: string, orderReference: string, deliveryDate: string, timeSlot: string): Promise<boolean> {
    const message = `Order Confirmed! Ref: ${orderReference}. Delivery: ${deliveryDate} (${timeSlot}). Our delivery person will call 30min before arrival. Keep ID ready for verification.`;
    
    const result = await this.sendSMS({
      to: phone,
      message,
      orderReference
    });

    return result.success;
  }

  // Send payment verification instructions
  async sendPaymentInstructions(phone: string, orderReference: string, amount: number): Promise<boolean> {
    const message = `Bank Transfer Instructions for Order ${orderReference}:\n\n1. Transfer LKR ${amount.toLocaleString()} to Commercial Bank Account\n2. Include reference: ${orderReference}\n3. Upload your payment slip at: ${typeof window !== 'undefined' ? window.location.origin : 'your-website.com'}/payment-verification?ref=${orderReference}\n4. WhatsApp: +94 76 156 6346\n\nOrder will be processed after payment verification.`;
    
    const result = await this.sendSMS({
      to: phone,
      message,
      orderReference
    });

    return result.success;
  }
}

// Default SMS service instance (configure with your provider)
export const smsService = new SMSService({
  apiKey: process.env.SMS_API_KEY || 'your-api-key-here',
  apiUrl: process.env.SMS_API_URL || 'https://api.dialog.lk/sms/send', // Replace with your provider
  senderId: process.env.SMS_SENDER_ID || 'CEYLON' // Your sender ID
});

// Environment variables needed:
/*
SMS_API_KEY=your_actual_api_key
SMS_API_URL=https://api.your-provider.com/sms/send
SMS_SENDER_ID=YOUR_SENDER_ID
*/
