import { NextRequest } from 'next/server';

/**
 * Validates API key from request headers
 * @param request - The incoming request
 * @returns boolean - true if valid, false otherwise
 */
export function validateApiKey(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const apiKey = process.env.API_KEY;
  
  // Check if API key is configured
  if (!apiKey) {
    console.error('API_KEY environment variable is not set');
    return false;
  }
  
  // Check if authorization header exists
  if (!authHeader) {
    return false;
  }
  
  // Extract token from "Bearer <token>" format
  const token = authHeader.replace(/^Bearer\s+/i, '');
  
  // Validate token
  return token === apiKey;
}

/**
 * Creates an unauthorized response
 * @returns NextResponse with 401 status
 */
export function createUnauthorizedResponse() {
  return new Response(
    JSON.stringify({ 
      error: 'Unauthorized',
      message: 'Valid API key required' 
    }),
    { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

/**
 * Middleware function to protect API routes
 * @param request - The incoming request
 * @returns Response or null (null means proceed)
 */
export function protectApiRoute(request: NextRequest): Response | null {
  if (!validateApiKey(request)) {
    return createUnauthorizedResponse();
  }
  
  return null; // Proceed with request
}
