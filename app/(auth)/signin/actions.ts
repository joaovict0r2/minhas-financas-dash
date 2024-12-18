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

  try {
    const response = await fetch(`${process.env.API_URL}auth/signin`, {
      method: "POST",
      body: JSON.stringify({
        email,
        phone
      })
    })
    
    const { success, userId } = await response.json()
    
    if (success) {
      await createSession(userId)
      return
    }
  } catch (error) {
    console.log(error)
  } finally {
    redirect('/auth-token')
  }
}