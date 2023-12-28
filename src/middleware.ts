import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {

	const query = request.nextUrl.searchParams;
	const city = query.get('city');
	
	const env = process.env.NODE_ENV;

	const baseURL =
		env == 'development'
			? `http://localhost:${process.env.PORT}`
			: process.env.NEXT_PUBLIC_SITE_URL
		;
	
	const res = await fetch(`${baseURL}/api/search`, {
		method: 'POST',
		body: city
	});

	const search = (await res.json())[0];

	if (!search.success) {
		return NextResponse.redirect(new URL('/not-found', request.url));
	}
	else if (!city) {
		return NextResponse.redirect(new URL('/not-found', request.url));
	}
}

export const config = {
	matcher: '/search'
};