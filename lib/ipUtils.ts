import { NextRequest } from 'next/server';

/**
 * Extract real client IP address from request
 * Handles proxies, CDNs (Cloudflare, Render, etc.)
 * 
 * Order of priority:
 * 1. x-real-ip (most reliable for single proxy)
 * 2. x-forwarded-for (first IP in chain)
 * 3. cf-connecting-ip (Cloudflare)
 * 4. x-client-ip
 * 5. forwarded (RFC 7239)
 * 6. request.ip (Next.js default)
 * 
 * Required for ING WebPay compliance (Ghid 1.4.2 - IP tracking)
 */
export function getClientIP(request: NextRequest): string {
  // Try x-real-ip first (most reliable)
  const realIP = request.headers.get('x-real-ip');
  if (realIP) return realIP.trim();

  // Try x-forwarded-for (may contain chain of IPs, take first)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIP = forwardedFor.split(',')[0].trim();
    if (firstIP) return firstIP;
  }

  // Try Cloudflare connecting IP
  const cfIP = request.headers.get('cf-connecting-ip');
  if (cfIP) return cfIP.trim();

  // Try x-client-ip
  const clientIP = request.headers.get('x-client-ip');
  if (clientIP) return clientIP.trim();

  // Try RFC 7239 Forwarded header
  const forwarded = request.headers.get('forwarded');
  if (forwarded) {
    const forMatch = forwarded.match(/for=([^;,\s]+)/i);
    if (forMatch && forMatch[1]) {
      // Remove "for=" and quotes
      return forMatch[1].replace(/["\[\]]/g, '').split(':')[0];
    }
  }

  // Fallback to Next.js request.ip
  const nextIP = request.ip;
  if (nextIP) return nextIP;

  // Ultimate fallback
  return 'unknown';
}

/**
 * Check if IP is from a suspicious/high-risk country
 * Can be extended with GeoIP database lookup
 */
export function isHighRiskIP(ip: string): boolean {
  // For now, just flag unknown IPs
  if (ip === 'unknown') return true;
  
  // TODO: Implement GeoIP lookup for international IPs
  // ING recommends extra checks for international IPs
  
  return false;
}

/**
 * Validate IP format (IPv4 or IPv6)
 */
export function isValidIP(ip: string): boolean {
  if (ip === 'unknown') return false;
  
  // IPv4 regex
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipv4Regex.test(ip)) {
    const parts = ip.split('.');
    return parts.every(part => {
      const num = parseInt(part, 10);
      return num >= 0 && num <= 255;
    });
  }
  
  // IPv6 regex (simplified)
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv6Regex.test(ip);
}
