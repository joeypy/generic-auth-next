// proxy.ts (Next 16)
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(req: NextRequest) {
  // Si ya hay cookie de sesión, no permitas visitar /login ni /register
  if (
    req.nextUrl.pathname.startsWith("/auth/signin") ||
    req.nextUrl.pathname.startsWith("/auth/signup")
  ) {
    const sessionCookie = getSessionCookie(req); // solo EXISTENCIA, no valida
    if (sessionCookie) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"], // ajusta a tus rutas públicas
};
