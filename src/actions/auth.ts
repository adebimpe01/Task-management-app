'use server'

import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { registerSchema } from '@/lib/validations'
import { signIn } from '@/lib/auth'
import { AuthError } from 'next-auth'

export async function register(data: {
  name: string
  email: string
  password: string
}) {
  const parsed = registerSchema.safeParse(data)
  if (!parsed.success) {
    return { error: 'Invalid input' }
  }

  const { name, email, password } = parsed.data

  const existingUser = await db.user.findUnique({ where: { email } })
  if (existingUser) {
    return { error: 'Email already in use' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.create({
    data: { name, email, password: hashedPassword },
  })

  return { success: 'Account created successfully' }
}

export async function login(data: { email: string; password: string }) {
  try {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirectTo: '/dashboard',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Invalid email or password' }
    }
    throw error
  }
}