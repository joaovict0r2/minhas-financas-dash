import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/_lib/session";

const protectedRoutes = ['/dashboard', '/expenses']
const publicRoutes = ['/signin', '/auth-token']

export default async function middleware(req: NextRequest) {
  const cookie = (await cookies()).get('session')?.value
  let session = undefined

  if (cookie) {
    session = await decrypt(cookie)
  }

  const currentPath = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(currentPath)
  const isPublicRoute = publicRoutes.includes(currentPath)

  if (isProtectedRoute && !session?.user) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl))
  }

  if (isPublicRoute && session?.user) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}