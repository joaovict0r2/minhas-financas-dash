import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type Session = {
  userId: number,
  user: {
    id: number,
    created_at: string
    nome: string
    email: string
    phone: string
    thread_id: number
    last_message_date: string
  }
}

const secretKey = process.env.SECRET
const encodedKey = new TextEncoder().encode(secretKey)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify<Session>(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Falha ao verificar a sessão', error)
  }
}

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expires })

  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/'
  })
}

export async function updateSession(payload: any) {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!cookie || !session) {
    return null
  }

  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const encryptedSession = await encrypt(payload)

  const cookieStore = await cookies()
  cookieStore.set('session', encryptedSession, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function verifySession() {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.user) {
    redirect('/signin')
  }

  return { isAuth: true, user: session.user }
}

export async function deleteSession() {
  (await cookies()).delete('session')
  redirect('/signin')
}