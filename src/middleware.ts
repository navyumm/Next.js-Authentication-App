import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
        const path = request.nextUrl.pathname  // ye btayega abhi user konse route pr hai

        // agar login nhi hai to usai ye ye routes deikhane hai
        const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail';

        // after login ye
        const token = request.cookies.get("token")?.value || "";

        if (isPublicPath && token) {
            return NextResponse.redirect(new URL('/', request.url))
        }

        // agar public path nhi hai aur token bhi nhi hai toh -> usai phle login ke liye bolna chahiye
        // means secret route hai
        if (!isPublicPath && !token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

    
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/profile',
        '/verifyemail'
    ]
    // matcher: '/about/:path*',        // kisi bhi file pr jaane se phle MW chlwa sakte h, agar humne config me "matcher" de rkha hai
}