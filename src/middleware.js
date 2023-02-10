// middleware.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
	//get token form local storage
	const token = request.cookies.get('token')?.value;
	let stages = request.cookies.get('stages')?.value;
	stages = stages ? JSON.parse(stages) : null;

	let url = request.url;
	if (url.includes('/login') && token) {
		let pathArr = request.nextUrl.pathname.split('/');
		let slug = pathArr[pathArr.length - 1];
		if (slug === 'login') {
			return NextResponse.redirect(new URL('/progress', request.url));
		} else {
			if (stages && stages[slug].completed) {
				return NextResponse.redirect(
					new URL(`/scanerror/${stages[slug].title}`, request.url),
				);
			} else {
				return NextResponse.redirect(
					new URL(`/progress/info/${slug}`, request.url),
				);
			}
		}
	}

	if (!url.includes('/login')) {
		let pathArr = request.nextUrl.pathname.split('/');
		let slug = pathArr[pathArr.length - 1];
		if (!token) {
			return NextResponse.redirect(new URL(`/login`, request.url));
		}
		if (url.includes('/questions') || url.includes('/progress/info')) {
			if (stages && stages[slug].completed) {
				return NextResponse.redirect(
					new URL(`/scanerror/${stages[slug].title}`, request.url),
				);
			}
		}
		if (url.includes('/direct')) {
			console.log(
				'stages && stages[slug].direct_points',
				stages && stages[slug].direct_points,
			);
			if (stages && stages[slug].direct_points) {
				return NextResponse.redirect(
					new URL(`/scanerror/${stages[slug].title}`, request.url),
				);
			}
		}
	}

	// return NextResponse.redirect(new URL('/progress', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		'/login/:path*',
		'/progress/:path*',
		'/questions/:path*',
		'/direct/:path*',
	],
};
