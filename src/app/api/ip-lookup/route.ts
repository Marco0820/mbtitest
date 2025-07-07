import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const ip = req.ip || req.headers.get('x-forwarded-for')?.split(',')[0] || '8.8.8.8';
    
    // For local development, req.ip might be undefined or ::1
    const finalIp = (ip === '::1' || ip === '127.0.0.1') ? '8.8.8.8' : ip;

    const response = await axios.get(`http://ip-api.com/json/${finalIp}`);
    const data = response.data;

    if (data.status === 'success') {
      return NextResponse.json({
        country: data.country,
        state: data.regionName,
        city: data.city,
      });
    } else {
      throw new Error('Failed to lookup IP information.');
    }
  } catch (error: any) {
    console.error('IP Lookup Error:', error);
    return NextResponse.json({ message: error.message || 'Error looking up IP information.' }, { status: 500 });
  }
} 