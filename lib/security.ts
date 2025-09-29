import crypto from 'crypto';

// Security configuration
export const SECURITY_CONFIG = {
  // Password requirements
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REQUIRE_UPPERCASE: true,
  PASSWORD_REQUIRE_LOWERCASE: true,
  PASSWORD_REQUIRE_NUMBERS: true,
  PASSWORD_REQUIRE_SYMBOLS: true,
  
  // Session security
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  
  // Rate limiting
  RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS_PER_WINDOW: 100,
  
  // Encryption
  ENCRYPTION_ALGORITHM: 'aes-256-gcm',
  KEY_DERIVATION_ITERATIONS: 100000,
};

// Input validation and sanitization
export class SecurityValidator {
  // Sanitize HTML input to prevent XSS
  static sanitizeHtml(input: string): string {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  // Validate email format
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  // Validate Sri Lankan phone number
  static isValidSriLankanPhone(phone: string): boolean {
    const phoneRegex = /^(\+94|0)[0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  // Validate password strength
  static validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (password.length < SECURITY_CONFIG.PASSWORD_MIN_LENGTH) {
      errors.push(`Password must be at least ${SECURITY_CONFIG.PASSWORD_MIN_LENGTH} characters long`);
    }
    
    if (SECURITY_CONFIG.PASSWORD_REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (SECURITY_CONFIG.PASSWORD_REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (SECURITY_CONFIG.PASSWORD_REQUIRE_NUMBERS && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (SECURITY_CONFIG.PASSWORD_REQUIRE_SYMBOLS && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Validate credit card number (Luhn algorithm)
  static validateCreditCard(cardNumber: string): boolean {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(cleanNumber)) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  }

  // Validate CVV
  static validateCVV(cvv: string): boolean {
    return /^\d{3,4}$/.test(cvv);
  }

  // Validate expiry date
  static validateExpiryDate(expiry: string): boolean {
    const [month, year] = expiry.split('/');
    if (!month || !year) return false;
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expMonth = parseInt(month);
    const expYear = parseInt(year);
    
    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) return false;
    
    return true;
  }

  // Sanitize SQL input (basic protection)
  static sanitizeSql(input: string): string {
    return input
      .replace(/'/g, "''")
      .replace(/;/g, '')
      .replace(/--/g, '')
      .replace(/\/\*/g, '')
      .replace(/\*\//g, '');
  }

  // Validate and sanitize address
  static sanitizeAddress(address: string): string {
    return address
      .trim()
      .replace(/[<>]/g, '')
      .substring(0, 500); // Limit length
  }
}

// Encryption utilities
export class EncryptionService {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly KEY_LENGTH = 32;
  private static readonly IV_LENGTH = 16;
  private static readonly TAG_LENGTH = 16;

  // Generate secure random key
  static generateKey(): string {
    return crypto.randomBytes(this.KEY_LENGTH).toString('hex');
  }

  // Hash password with salt
  static async hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, SECURITY_CONFIG.KEY_DERIVATION_ITERATIONS, 64, 'sha512');
    return `${salt}:${hash.toString('hex')}`;
  }

  // Verify password
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const [salt, hash] = hashedPassword.split(':');
    const newHash = crypto.pbkdf2Sync(password, salt, SECURITY_CONFIG.KEY_DERIVATION_ITERATIONS, 64, 'sha512');
    return hash === newHash.toString('hex');
  }

  // Encrypt sensitive data
  static encrypt(text: string, key: string): string {
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipher(this.ALGORITHM, key);
    cipher.setAAD(Buffer.from('ceylon-nature-link', 'utf8'));
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`;
  }

  // Decrypt sensitive data
  static decrypt(encryptedText: string, key: string): string {
    const [ivHex, tagHex, encrypted] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    
    const decipher = crypto.createDecipher(this.ALGORITHM, key);
    decipher.setAAD(Buffer.from('ceylon-nature-link', 'utf8'));
    decipher.setAuthTag(tag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}

// Rate limiting
export class RateLimiter {
  private static requests: Map<string, { count: number; resetTime: number }> = new Map();

  static isAllowed(identifier: string): boolean {
    const now = Date.now();
    const windowStart = now - SECURITY_CONFIG.RATE_LIMIT_WINDOW;
    
    // Clean up old entries
    for (const [key, value] of this.requests.entries()) {
      if (value.resetTime < windowStart) {
        this.requests.delete(key);
      }
    }
    
    const current = this.requests.get(identifier);
    
    if (!current) {
      this.requests.set(identifier, { count: 1, resetTime: now });
      return true;
    }
    
    if (current.resetTime < windowStart) {
      this.requests.set(identifier, { count: 1, resetTime: now });
      return true;
    }
    
    if (current.count >= SECURITY_CONFIG.MAX_REQUESTS_PER_WINDOW) {
      return false;
    }
    
    current.count++;
    return true;
  }

  static getRemainingRequests(identifier: string): number {
    const current = this.requests.get(identifier);
    if (!current) return SECURITY_CONFIG.MAX_REQUESTS_PER_WINDOW;
    
    return Math.max(0, SECURITY_CONFIG.MAX_REQUESTS_PER_WINDOW - current.count);
  }
}

// CSRF Protection
export class CSRFProtection {
  private static tokens: Map<string, { token: string; expires: number }> = new Map();

  static generateToken(sessionId: string): string {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + SECURITY_CONFIG.SESSION_TIMEOUT;
    
    this.tokens.set(sessionId, { token, expires });
    return token;
  }

  static validateToken(sessionId: string, token: string): boolean {
    const stored = this.tokens.get(sessionId);
    if (!stored) return false;
    
    if (stored.expires < Date.now()) {
      this.tokens.delete(sessionId);
      return false;
    }
    
    return stored.token === token;
  }

  static revokeToken(sessionId: string): void {
    this.tokens.delete(sessionId);
  }
}

// Security headers
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.stripe.com;",
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

// Audit logging
export class AuditLogger {
  static log(level: 'INFO' | 'WARN' | 'ERROR', message: string, metadata?: any): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata: metadata || {},
    };
    
    // In production, this would be sent to a logging service
    console.log(JSON.stringify(logEntry));
    
    // Store in localStorage for demo purposes
    const logs = JSON.parse(localStorage.getItem('audit-logs') || '[]');
    logs.push(logEntry);
    
    // Keep only last 1000 logs
    if (logs.length > 1000) {
      logs.splice(0, logs.length - 1000);
    }
    
    localStorage.setItem('audit-logs', JSON.stringify(logs));
  }

  static logSecurityEvent(event: string, details: any): void {
    this.log('WARN', `Security Event: ${event}`, details);
  }

  static logPaymentEvent(event: string, details: any): void {
    this.log('INFO', `Payment Event: ${event}`, details);
  }
}
