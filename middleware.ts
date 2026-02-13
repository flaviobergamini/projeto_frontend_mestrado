import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas que não requerem autenticação
const publicRoutes = ['/', '/login', '/cadastro'];

// Rotas que requerem autenticação
const protectedRoutes = ['/menu', '/pei', '/escola', '/estudo-caso', '/diario'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar se é uma rota protegida
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Verificar se há token de acesso
    const accessToken = request.cookies.get('access_token')?.value;

    if (!accessToken) {
      // Redirecionar para login se não houver token
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
