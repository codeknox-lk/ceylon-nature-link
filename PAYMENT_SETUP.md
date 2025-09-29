# 💳 Payment Setup Guide - Where Money Goes

## 🏦 **Your Stripe Account Setup**

### **Step 1: Create Stripe Account**
1. Go to **https://stripe.com**
2. Click **"Start now"**
3. Choose **"Sri Lanka"** as your country
4. Complete business verification

### **Step 2: Get Your Keys**
After account setup, you'll get these keys:

```bash
# Test Keys (No Real Money)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Live Keys (Real Money) - Replace with YOUR keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_REAL_KEY_HERE
STRIPE_SECRET_KEY=sk_live_YOUR_REAL_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

### **Step 3: Update Your Environment**
Create `.env.local` file in your project root:

```bash
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_REAL_PUBLISHABLE_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_REAL_SECRET_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET

# Your Business Information
BUSINESS_NAME=Ceylon Nature Link
BUSINESS_EMAIL=orders@ceylonnaturelink.com
BUSINESS_PHONE=+94 77 123 4567
BUSINESS_ADDRESS=123 Main Street, Colombo, Sri Lanka

# Payment Settings
CURRENCY=LKR
FREE_SHIPPING_THRESHOLD=2000
DEFAULT_SHIPPING_COST=300
VAT_RATE=15
```

## 💰 **Where Payments Go**

### **Payment Flow:**
1. **Customer pays** → **Stripe processes** → **Money goes to YOUR bank account**
2. **Stripe fee**: 2.9% + 30¢ per transaction
3. **Your money**: Remaining amount after Stripe fees
4. **Payout schedule**: Daily, weekly, or monthly (your choice)

### **Sri Lankan Bank Account Setup:**
1. **Add your Sri Lankan bank account** in Stripe dashboard
2. **Verify your bank account** with test deposits
3. **Set payout schedule** (recommend daily for cash flow)
4. **Enable local payment methods** (FPX, Mobile payments)

## 🏪 **Business Verification for Sri Lanka**

### **Required Documents:**
- ✅ **Business Registration Certificate**
- ✅ **VAT Registration Certificate**
- ✅ **Bank Account Statement**
- ✅ **Identity Verification**
- ✅ **Business Address Proof**

### **Sri Lankan Payment Methods:**
- 💳 **Credit/Debit Cards** (Visa, Mastercard)
- 🏦 **Bank Transfers** (FPX)
- 📱 **Mobile Payments** (Dialog, Mobitel)
- 💰 **Digital Wallets** (eZ Cash, mCash)

## 📊 **Revenue Tracking**

### **Stripe Dashboard Shows:**
- 💰 **Total revenue** collected
- 📈 **Daily/weekly/monthly** sales
- 🏦 **Payouts** to your bank account
- 📊 **Transaction fees** paid to Stripe
- 🛡️ **Fraud protection** alerts

### **Your Bank Account Receives:**
- 💵 **Net amount** after Stripe fees
- 📅 **Daily payouts** (if configured)
- 🏦 **Direct deposit** to your Sri Lankan bank
- 📋 **Detailed transaction** records

## 🔒 **Security & Compliance**

### **PCI DSS Compliance:**
- ✅ **Stripe handles** all card data
- ✅ **No card storage** on your servers
- ✅ **Automatic compliance** through Stripe
- ✅ **Fraud protection** included

### **Sri Lankan Regulations:**
- ✅ **VAT compliance** (15% tax)
- ✅ **Local currency** (LKR)
- ✅ **Bank regulations** compliance
- ✅ **Tax reporting** ready

## 🚀 **Going Live Checklist**

### **Before Launch:**
- [ ] **Stripe account** verified and activated
- [ ] **Bank account** connected and verified
- [ ] **Business documents** uploaded
- [ ] **Test payments** working
- [ ] **Webhook endpoints** configured
- [ ] **SSL certificate** installed
- [ ] **Domain** connected to Stripe

### **After Launch:**
- [ ] **Monitor payments** in Stripe dashboard
- [ ] **Check bank deposits** daily
- [ ] **Review transaction** reports
- [ ] **Handle disputes** if any
- [ ] **Update tax records** monthly

## 💡 **Revenue Optimization**

### **Increase Sales:**
- 🎯 **Local payment methods** (FPX, Mobile)
- 💰 **Multiple currencies** (USD, LKR)
- 🚚 **Free shipping** thresholds
- 🎁 **Discount codes** and promotions
- 📱 **Mobile-optimized** checkout

### **Reduce Fees:**
- 💳 **Encourage bank transfers** (lower fees)
- 🏦 **Bulk processing** discounts
- 📊 **Volume discounts** with Stripe
- 💰 **Optimize pricing** strategy

## 📞 **Support & Help**

### **Stripe Support:**
- 📧 **Email**: support@stripe.com
- 💬 **Live chat** in dashboard
- 📚 **Documentation**: https://stripe.com/docs
- 🎥 **Video tutorials** available

### **Sri Lankan Banking:**
- 🏦 **Contact your bank** for international transfers
- 💱 **Currency conversion** rates
- 📋 **Tax reporting** requirements
- 🏛️ **Regulatory compliance**

---

## 🎯 **Summary: Where Your Money Goes**

1. **Customer pays** → **Stripe processes** → **Your bank account**
2. **Stripe fee**: 2.9% + 30¢ per transaction
3. **Your revenue**: Remaining amount after fees
4. **Payout schedule**: Daily, weekly, or monthly
5. **Bank account**: Your Sri Lankan business account

**Your payments go directly to YOUR bank account after Stripe processing!** 🏦💰
