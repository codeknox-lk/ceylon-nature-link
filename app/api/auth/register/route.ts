import { NextRequest, NextResponse } from 'next/server';
import { ApiHandlers, ApiSecurity } from '@/lib/api';

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
    const result = await ApiHandlers.register(request);
    return ApiSecurity.applySecurityHeaders(result);
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
