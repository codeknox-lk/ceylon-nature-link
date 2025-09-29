import { NextRequest, NextResponse } from 'next/server';
import { AuthMiddleware, ApiSecurity } from '@/lib/api';

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimit = ApiSecurity.checkRateLimit(request);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests' },
        { status: 429 }
      );
    }
    
    // Authenticate user
    const { user, session } = await AuthMiddleware.authenticate(request);
    if (!user || !session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
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
    const result = await ApiHandlers.processPayment(request, user);
    return ApiSecurity.applySecurityHeaders(result);
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
