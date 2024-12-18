// pages/_middleware.js
import { NextResponse } from 'next/server';

export function middleware(request:any) {
  const url = request.nextUrl.clone();
  const lowercasePath = url.pathname.toLowerCase();

  if (url.pathname !== lowercasePath) {
    url.pathname = lowercasePath;
    return NextResponse.redirect(url); // Redirect to lowercase path
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!public|static).*)', // Exclude `/public` and `/static` paths
  ],
};