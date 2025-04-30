import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export function GET() {
  return NextResponse.redirect(new URL('/affiliate/details', 'https://baucinternational.com'));
}
