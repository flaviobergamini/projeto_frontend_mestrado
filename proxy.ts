import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas de autenticação (inacessíveis para usuários já autenticados)
const authRoutes = ['/login', '/cadastro'];

// Rotas que requerem autenticação
const protectedRoutes = ['/menu', '/pei', '/escola', '/estudo-caso', '/diario'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access_token')?.value;

  // Usuário autenticado não pode acessar rotas de auth → redireciona para /menu
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/menu', request.url));
  }

  // Usuário não autenticado não pode acessar rotas protegidas → redireciona para /login
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
