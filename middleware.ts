import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/_lib/session";

const protectedRoutes = ['/dashboard', '/expenses']

export default async function middleware(req: NextRequest) {
  const cookie = (await cookies()).get('session')?.value
  let session = undefined

  if (cookie) {
    session = await decrypt(cookie)
    console.log(session)
  }

  const currentPath = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(currentPath)

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}