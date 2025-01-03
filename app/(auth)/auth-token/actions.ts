'use server'

import { TokenFormSchema, TokenFormState } from "@/app/_lib/definitions"
import { decrypt, updateSession } from "@/app/_lib/session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function validateToken(state: TokenFormState, formData: FormData) {
  const validationResult = TokenFormSchema.safeParse({
    token: formData.get('token')
  })

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors
    }
  }

  const { token } = validationResult.data
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  const response = await fetch(`${process.env.API_URL}/auth/validateToken`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: session?.userId, token })
  })
 
  const { success, user } = await response.json()

  if (!success) {
    return { message: 'Algo deu errado' }
  }
  
  await updateSession({ ...session, user })
  redirect('/dashboard')
}