import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { customAlphabet } from 'nanoid';

// Create a custom alphabet for nanoid to generate cleaner IDs
const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
);

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return new NextResponse(JSON.stringify({ message: 'Missing filename query parameter' }), { status: 400 });
  }

  if (!request.body) {
     return new NextResponse(JSON.stringify({ message: 'No file body found' }), { status: 400 });
  }
  
  // The Vercel Blob SDK needs a file path for the `put` function.
  // We'll create a unique path for each avatar.
  const blob = await put(`avatars/${nanoid()}-${filename}`, request.body, {
    access: 'public',
  });

  return NextResponse.json(blob);
} 