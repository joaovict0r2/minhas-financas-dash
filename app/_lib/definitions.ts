import { z } from 'zod'

export const SigninFormSchema = z.object({
  email: z.string().email({ message: 'Digite um e-mail válido.'}),
  phone: z.string().min(1, { message: 'O campo de telefone não pode estar vazio.'}),
})

export const TokenFormSchema = z.object({
  token: z.string().min(1, { message: 'Preencha um código válido.'}),
})

export type FormState<T extends z.ZodObject<any>> = {
  errors?: Partial<Record<keyof z.infer<T>, string[]>>
  message?: string
} | undefined

export type SigninFormState = FormState<typeof SigninFormSchema>
export type TokenFormState = FormState<typeof TokenFormSchema>
