'use server'

import { SigninFormState, SigninFormSchema } from "@/app/_lib/definitions"
import { createSession } from "@/app/_lib/session"
import { redirect } from "next/navigation"

export async function signin(state: SigninFormState, formData: FormData) {
  const validationResult = SigninFormSchema.safeParse({
    email: formData.get('email'),
    phone: formData.get('phone')
  })

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors
    }
  }

  const { email, phone } = validationResult.data

  const response = await fetch(`${process.env.API_URL}/auth/signIn`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      phone
    })
  })

  if (!response.ok) {
    return { message: 'Algo deu errado' }
  }
  
  const { userId } = await response.json()
  
  console.log(userId)

  await createSession(userId)
  // redirect('/auth-token') pulando essa parte por enquanto e mandando direto para a dashboard.
  redirect('/dashboard')
}