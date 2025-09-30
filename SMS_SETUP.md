# 📱 SMS Setup Guide for Real SMS Integration

## Current Status
✅ **SMS Service Created** - `lib/sms-service.ts`  
✅ **Checkout Updated** - Now uses real SMS service  
❌ **SMS Provider** - Still needs to be configured with real API

## 🚀 Quick Setup (Choose One)

### Option 1: Dialog SMS API (Sri Lanka)
1. **Register** at [Dialog Developer Portal](https://developer.dialog.lk/)
2. **Get API Key** from your Dialog account
3. **Update** `.env.local`:
```bash
SMS_API_KEY=your_dialog_api_key_here
SMS_API_URL=https://api.dialog.lk/sms/send
SMS_SENDER_ID=CEYLON
```

### Option 2: Twilio (International)
1. **Sign up** at [Twilio](https://www.twilio.com/)
2. **Get credentials** from Twilio Console
3. **Update** `.env.local`:
```bash
SMS_API_KEY=your_twilio_auth_token
SMS_API_URL=https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json
SMS_SENDER_ID=+1234567890
```

### Option 3: SLT SMS Gateway
1. **Contact** Sri Lanka Telecom for SMS API access
2. **Get credentials** from SLT
3. **Update** `.env.local` with SLT details

## 🔧 Code Changes Needed

### 1. Update `lib/sms-service.ts`
Replace the simulation code with your provider's API:

```typescript
// Replace this simulation:
console.log(`📱 SMS SENT TO: ${message.to}`);

// With real API call:
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
```

### 2. Test SMS Sending
1. **Add items to cart**
2. **Go to checkout**
3. **Place order with COD**
4. **Check console** for SMS status
5. **Check phone** for actual SMS

## 📋 SMS Messages Sent

### COD Orders:
- **Order confirmation** with delivery details
- **Pre-delivery call** scheduling info
- **ID verification** reminder

### Bank Transfer Orders:
- **Payment instructions** with bank details
- **Reference number** for transfer
- **WhatsApp contact** for slip upload

## 💰 Cost Estimation

- **Dialog SMS**: ~LKR 2-5 per SMS
- **Twilio**: ~$0.0075 per SMS (international)
- **SLT**: Contact for pricing

## 🔍 Testing

1. **Test with your own number first**
2. **Check console logs** for success/failure
3. **Verify SMS delivery** on phone
4. **Test with different numbers**

## 🚨 Important Notes

- **Rate Limits**: Most providers have daily/monthly limits
- **Sri Lankan Numbers**: Use format `+94XXXXXXXXX`
- **Error Handling**: Check console for SMS failures
- **Costs**: Monitor your SMS usage and costs

## 📞 Support

If you need help setting up a specific SMS provider, let me know which one you'd like to use and I can help you implement it!
