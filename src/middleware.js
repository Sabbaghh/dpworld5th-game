// middleware.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
	//get token form local storage
	const token = request.cookies.get('token')?.value;
	let url = request.url;
	if (url.includes('/login') && token) {
		return NextResponse.redirect(new URL('/progress', request.url));
	}

	if (!url.includes('/login') && !token) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	// return NextResponse.redirect(new URL('/progress', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/login/:path*', '/progress/:path*'],
};
