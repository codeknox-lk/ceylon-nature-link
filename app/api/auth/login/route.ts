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
    const result = await ApiHandlers.login(request);
    return ApiSecurity.applySecurityHeaders(result);
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
