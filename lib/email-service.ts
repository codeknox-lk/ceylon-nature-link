// lib/email-service.ts
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  inquiryType: string;
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
}

class EmailService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = process.env.EMAIL_API_KEY || '';
    this.apiUrl = process.env.EMAIL_API_URL || '';
  }

  async sendContactForm(data: ContactFormData): Promise<boolean> {
    try {
      const emailContent = this.formatContactEmail(data);
      
      // For now, we'll simulate email sending
      // In production, integrate with a real email service like:
      // - SendGrid
      // - Nodemailer with SMTP
      // - Resend
      // - AWS SES
      
      console.log('📧 Email would be sent to sales@ceylonnaturelink.com:');
      console.log('Subject:', emailContent.subject);
      console.log('Content:', emailContent.text);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  private formatContactEmail(data: ContactFormData): EmailOptions {
    const subject = `New Contact Form Submission: ${data.subject}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
          <p><strong>Inquiry Type:</strong> ${this.formatInquiryType(data.inquiryType)}</p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Message Details</h3>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-left: 4px solid #059669; margin-top: 10px;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            This email was sent from the Ceylon Nature Link contact form.
            <br>Please respond directly to: ${data.email}
          </p>
        </div>
      </div>
    `;

    const text = `
New Contact Form Submission

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone || 'Not provided'}
- Company: ${data.company || 'Not provided'}
- Inquiry Type: ${this.formatInquiryType(data.inquiryType)}

Message Details:
- Subject: ${data.subject}
- Message: ${data.message}

This email was sent from the Ceylon Nature Link contact form.
Please respond directly to: ${data.email}
    `;

    return {
      to: 'sales@ceylonnaturelink.com',
      subject,
      html,
      text
    };
  }

  private formatInquiryType(type: string): string {
    const types: { [key: string]: string } = {
      'general': 'General Inquiry',
      'product': 'Product Information',
      'quote': 'Request Quote',
      'export': 'Export Services',
      'private-label': 'Private Label',
      'partnership': 'Partnership'
    };
    return types[type] || type;
  }
}

export const emailService = new EmailService();

// Example integration with real email services:

/*
// SendGrid Integration
import sgMail from '@sendgrid/mail';

class SendGridEmailService extends EmailService {
  constructor() {
    super();
    sgMail.setApiKey(this.apiKey);
  }

  async sendContactForm(data: ContactFormData): Promise<boolean> {
    try {
      const emailContent = this.formatContactEmail(data);
      
      await sgMail.send({
        to: emailContent.to,
        from: 'noreply@ceylonnaturelink.com',
        subject: emailContent.subject,
        text: emailContent.text,
        html: emailContent.html,
      });
      
      return true;
    } catch (error) {
      console.error('SendGrid error:', error);
      return false;
    }
  }
}

// Nodemailer Integration
import nodemailer from 'nodemailer';

class NodemailerEmailService extends EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    super();
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendContactForm(data: ContactFormData): Promise<boolean> {
    try {
      const emailContent = this.formatContactEmail(data);
      
      await this.transporter.sendMail({
        from: 'noreply@ceylonnaturelink.com',
        to: emailContent.to,
        subject: emailContent.subject,
        text: emailContent.text,
        html: emailContent.html,
      });
      
      return true;
    } catch (error) {
      console.error('Nodemailer error:', error);
      return false;
    }
  }
}
*/
