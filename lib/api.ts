import { NextRequest, NextResponse } from 'next/server';
import { AuthService, User } from './auth';
import { StripeService, SecurePaymentProcessor } from './stripe';
import { SecurityValidator, RateLimiter, CSRFProtection, AuditLogger, SECURITY_HEADERS } from './security';

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Middleware for security
export class ApiSecurity {
  // Apply security headers
  static applySecurityHeaders(response: NextResponse): NextResponse {
    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  // Rate limiting middleware
  static checkRateLimit(request: NextRequest): { allowed: boolean; remaining?: number } {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const identifier = `${ip}_${request.url}`;
    
    if (!RateLimiter.isAllowed(identifier)) {
      AuditLogger.logSecurityEvent('Rate limit exceeded', { ip, url: request.url });
      return { allowed: false };
    }
    
    return { 
      allowed: true, 
      remaining: RateLimiter.getRemainingRequests(identifier) 
    };
  }

  // CSRF protection
  static validateCSRF(request: NextRequest, sessionId?: string): boolean {
    if (!sessionId) return false;
    
    const csrfToken = request.headers.get('x-csrf-token');
    if (!csrfToken) return false;
    
    return CSRFProtection.validateToken(sessionId, csrfToken);
  }

  // Input validation
  static validateInput(data: any, schema: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    for (const [field, rules] of Object.entries(schema)) {
      const value = data[field];
      
      if (rules.required && (!value || value.toString().trim() === '')) {
        errors.push(`${field} is required`);
        continue;
      }
      
      if (value && rules.type === 'email' && !SecurityValidator.isValidEmail(value)) {
        errors.push(`${field} must be a valid email address`);
      }
      
      if (value && rules.type === 'phone' && !SecurityValidator.isValidSriLankanPhone(value)) {
        errors.push(`${field} must be a valid Sri Lankan phone number`);
      }
      
      if (value && rules.minLength && value.length < rules.minLength) {
        errors.push(`${field} must be at least ${rules.minLength} characters`);
      }
      
      if (value && rules.maxLength && value.length > rules.maxLength) {
        errors.push(`${field} must be no more than ${rules.maxLength} characters`);
      }
    }
    
    return { valid: errors.length === 0, errors };
  }
}

// Authentication middleware
export class AuthMiddleware {
  static async authenticate(request: NextRequest): Promise<{ user: User | null; session: any | null }> {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { user: null, session: null };
    }
    
    const token = authHeader.substring(7);
    const sessionId = request.headers.get('x-session-id');
    
    if (!sessionId) {
      return { user: null, session: null };
    }
    
    const validation = await AuthService.validateSession(sessionId, token);
    return { user: validation.user || null, session: validation.session || null };
  }
  
  static requireAuth(handler: (request: NextRequest, user: User, session: any) => Promise<NextResponse>) {
    return async (request: NextRequest): Promise<NextResponse> => {
      const { user, session } = await this.authenticate(request);
      
      if (!user || !session) {
        return NextResponse.json(
          { success: false, error: 'Authentication required' },
          { status: 401 }
        );
      }
      
      return handler(request, user, session);
    };
  }
  
  static requireRole(role: string) {
    return (handler: (request: NextRequest, user: User, session: any) => Promise<NextResponse>) => {
      return async (request: NextRequest): Promise<NextResponse> => {
        const { user, session } = await this.authenticate(request);
        
        if (!user || !session) {
          return NextResponse.json(
            { success: false, error: 'Authentication required' },
            { status: 401 }
          );
        }
        
        if (user.role !== role && user.role !== 'admin') {
          return NextResponse.json(
            { success: false, error: 'Insufficient permissions' },
            { status: 403 }
          );
        }
        
        return handler(request, user, session);
      };
    };
  }
}

// API Handlers
export class ApiHandlers {
  // User registration
  static async register(request: NextRequest): Promise<NextResponse> {
    try {
      // Check rate limit
      const rateLimit = ApiSecurity.checkRateLimit(request);
      if (!rateLimit.allowed) {
        return NextResponse.json(
          { success: false, error: 'Too many requests' },
          { status: 429 }
        );
      }
      
      const body = await request.json();
      
      // Validate input
      const validation = ApiSecurity.validateInput(body, {
        email: { required: true, type: 'email' },
        password: { required: true, minLength: 8 },
        firstName: { required: true, minLength: 2, maxLength: 50 },
        lastName: { required: true, minLength: 2, maxLength: 50 },
        phone: { type: 'phone' }
      });
      
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: validation.errors.join(', ') },
          { status: 400 }
        );
      }
      
      // Register user
      const result = await AuthService.registerUser(body);
      
      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 400 }
        );
      }
      
      return NextResponse.json({
        success: true,
        data: { user: result.user },
        message: 'Registration successful'
      });
      
    } catch (error) {
      AuditLogger.log('ERROR', 'Registration API error', { error: error.message });
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
  
  // User login
  static async login(request: NextRequest): Promise<NextResponse> {
    try {
      // Check rate limit
      const rateLimit = ApiSecurity.checkRateLimit(request);
      if (!rateLimit.allowed) {
        return NextResponse.json(
          { success: false, error: 'Too many requests' },
          { status: 429 }
        );
      }
      
      const body = await request.json();
      const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
      const userAgent = request.headers.get('user-agent') || 'unknown';
      
      // Validate input
      const validation = ApiSecurity.validateInput(body, {
        email: { required: true, type: 'email' },
        password: { required: true }
      });
      
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: validation.errors.join(', ') },
          { status: 400 }
        );
      }
      
      // Login user
      const result = await AuthService.loginUser(body.email, body.password, ip, userAgent);
      
      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 401 }
        );
      }
      
      // Generate CSRF token
      const csrfToken = CSRFProtection.generateToken(result.session!.id);
      
      return NextResponse.json({
        success: true,
        data: { 
          user: result.user,
          session: result.session,
          csrfToken
        },
        message: 'Login successful'
      });
      
    } catch (error) {
      AuditLogger.log('ERROR', 'Login API error', { error: error.message });
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
  
  // User logout
  static async logout(request: NextRequest): Promise<NextResponse> {
    try {
      const sessionId = request.headers.get('x-session-id');
      if (!sessionId) {
        return NextResponse.json(
          { success: false, error: 'Session not found' },
          { status: 400 }
        );
      }
      
      await AuthService.logoutUser(sessionId);
      
      return NextResponse.json({
        success: true,
        message: 'Logout successful'
      });
      
    } catch (error) {
      AuditLogger.log('ERROR', 'Logout API error', { error: error.message });
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
  
  // Get user profile
  static async getProfile(request: NextRequest, user: User): Promise<NextResponse> {
    try {
      return NextResponse.json({
        success: true,
        data: { user }
      });
      
    } catch (error) {
      AuditLogger.log('ERROR', 'Get profile API error', { error: error.message });
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
  
  // Update user profile
  static async updateProfile(request: NextRequest, user: User): Promise<NextResponse> {
    try {
      const body = await request.json();
      
      // Validate input
      const validation = ApiSecurity.validateInput(body, {
        firstName: { minLength: 2, maxLength: 50 },
        lastName: { minLength: 2, maxLength: 50 },
        phone: { type: 'phone' }
      });
      
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: validation.errors.join(', ') },
          { status: 400 }
        );
      }
      
      const result = await AuthService.updateUserProfile(user.id, body);
      
      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 400 }
        );
      }
      
      return NextResponse.json({
        success: true,
        data: { user: result.user },
        message: 'Profile updated successfully'
      });
      
    } catch (error) {
      AuditLogger.log('ERROR', 'Update profile API error', { error: error.message });
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
  
  // Change password
  static async changePassword(request: NextRequest, user: User): Promise<NextResponse> {
    try {
      const body = await request.json();
      
      // Validate input
      const validation = ApiSecurity.validateInput(body, {
        currentPassword: { required: true },
        newPassword: { required: true, minLength: 8 }
      });
      
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: validation.errors.join(', ') },
          { status: 400 }
        );
      }
      
      const result = await AuthService.changePassword(
        user.id,
        body.currentPassword,
        body.newPassword
      );
      
      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 400 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Password changed successfully'
      });
      
    } catch (error) {
      AuditLogger.log('ERROR', 'Change password API error', { error: error.message });
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
  
  // Process payment
  static async processPayment(request: NextRequest, user: User): Promise<NextResponse> {
    try {
      // Check rate limit
      const rateLimit = ApiSecurity.checkRateLimit(request);
      if (!rateLimit.allowed) {
        return NextResponse.json(
          { success: false, error: 'Too many requests' },
          { status: 429 }
        );
      }
      
      const body = await request.json();
      
      // Validate input
      const validation = ApiSecurity.validateInput(body, {
        amount: { required: true },
        currency: { required: true },
        paymentMethod: { required: true },
        orderId: { required: true }
      });
      
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: validation.errors.join(', ') },
          { status: 400 }
        );
      }
      
      // Process payment
      const result = await SecurePaymentProcessor.processPayment(
        body.amount,
        body.currency,
        body.paymentMethod,
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          address: user.address
        },
        body.orderId
      );
      
      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 400 }
        );
      }
      
      AuditLogger.logPaymentEvent('Payment processed', {
        userId: user.id,
        amount: body.amount,
        orderId: body.orderId,
        paymentIntentId: result.paymentIntentId
      });
      
      return NextResponse.json({
        success: true,
        data: { paymentIntentId: result.paymentIntentId },
        message: 'Payment processed successfully'
      });
      
    } catch (error) {
      AuditLogger.log('ERROR', 'Payment API error', { error: error.message });
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
  
  // Get audit logs (admin only)
  static async getAuditLogs(request: NextRequest, user: User): Promise<NextResponse> {
    try {
      if (user.role !== 'admin') {
        return NextResponse.json(
          { success: false, error: 'Insufficient permissions' },
          { status: 403 }
        );
      }
      
      const logs = JSON.parse(localStorage.getItem('audit-logs') || '[]');
      
      return NextResponse.json({
        success: true,
        data: { logs }
      });
      
    } catch (error) {
      AuditLogger.log('ERROR', 'Get audit logs API error', { error: error.message });
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
}

// API Route handlers
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  let response: NextResponse;
  
  try {
    switch (pathname) {
      case '/api/auth/register':
        response = await ApiHandlers.register(request);
        break;
        
      case '/api/auth/login':
        response = await ApiHandlers.login(request);
        break;
        
      case '/api/auth/logout':
        response = await ApiHandlers.logout(request);
        break;
        
      case '/api/payment/process':
        response = await AuthMiddleware.requireAuth(ApiHandlers.processPayment)(request);
        break;
        
      default:
        response = NextResponse.json(
          { success: false, error: 'Not found' },
          { status: 404 }
        );
    }
    
    return ApiSecurity.applySecurityHeaders(response);
    
  } catch (error) {
    AuditLogger.log('ERROR', 'API route error', { error: error.message, pathname });
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  let response: NextResponse;
  
  try {
    switch (pathname) {
      case '/api/user/profile':
        response = await AuthMiddleware.requireAuth(ApiHandlers.getProfile)(request);
        break;
        
      case '/api/admin/audit-logs':
        response = await AuthMiddleware.requireRole('admin')(ApiHandlers.getAuditLogs)(request);
        break;
        
      default:
        response = NextResponse.json(
          { success: false, error: 'Not found' },
          { status: 404 }
        );
    }
    
    return ApiSecurity.applySecurityHeaders(response);
    
  } catch (error) {
    AuditLogger.log('ERROR', 'API route error', { error: error.message, pathname });
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  let response: NextResponse;
  
  try {
    switch (pathname) {
      case '/api/user/profile':
        response = await AuthMiddleware.requireAuth(ApiHandlers.updateProfile)(request);
        break;
        
      case '/api/user/password':
        response = await AuthMiddleware.requireAuth(ApiHandlers.changePassword)(request);
        break;
        
      default:
        response = NextResponse.json(
          { success: false, error: 'Not found' },
          { status: 404 }
        );
    }
    
    return ApiSecurity.applySecurityHeaders(response);
    
  } catch (error) {
    AuditLogger.log('ERROR', 'API route error', { error: error.message, pathname });
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
