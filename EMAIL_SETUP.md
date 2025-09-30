# Email Setup Guide

## Current Status
The contact form is now set up to send emails, but currently uses a **simulation mode**. To enable real email sending, you need to integrate with an email service provider.

## What's Currently Working
- ✅ Contact form validation
- ✅ API endpoint (`/api/contact`)
- ✅ Email formatting and templates
- ✅ Success/error handling
- ✅ Loading states

## To Enable Real Email Sending

### Option 1: SendGrid (Recommended)
1. Sign up at [SendGrid](https://sendgrid.com/)
2. Get your API key
3. Install SendGrid: `npm install @sendgrid/mail`
4. Update `lib/email-service.ts` to use SendGridEmailService
5. Set environment variable: `EMAIL_API_KEY=your_sendgrid_api_key`

### Option 2: Nodemailer with SMTP
1. Install Nodemailer: `npm install nodemailer`
2. Get SMTP credentials from your email provider
3. Update `lib/email-service.ts` to use NodemailerEmailService
4. Set environment variables:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

### Option 3: Resend (Modern Alternative)
1. Sign up at [Resend](https://resend.com/)
2. Get your API key
3. Install Resend: `npm install resend`
4. Update `lib/email-service.ts` to use Resend
5. Set environment variable: `EMAIL_API_KEY=your_resend_api_key`

## Environment Variables
Add these to your `.env.local` file:

```env
# Email Service
EMAIL_API_KEY=your_api_key_here
EMAIL_API_URL=your_api_url_here

# For Nodemailer (if using SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@domain.com
SMTP_PASS=your_app_password
```

## Testing
1. Fill out the contact form
2. Check the browser console for the formatted email
3. In production, emails will be sent to `sales@ceylonnaturelink.com`

## Email Template
The system sends beautifully formatted emails with:
- Contact information
- Inquiry type
- Message details
- Professional HTML formatting
- Plain text fallback

## Current Email Address
All contact form submissions are sent to: **sales@ceylonnaturelink.com**

## Next Steps
1. Choose an email service provider
2. Set up the service and get API credentials
3. Update the email service implementation
4. Test with real email sending
5. Deploy to production

The contact form is ready to go - just needs the email service integration! 📧
