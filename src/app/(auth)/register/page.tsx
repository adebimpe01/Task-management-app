'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { register } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckSquare, Loader2, Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await register({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    })

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      router.push('/login?registered=true')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckSquare size={28} className="text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white">TaskFlow</h1>
          <p className="text-blue-200 mt-1 text-sm">Manage your tasks efficiently</p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-1">Create an account</h2>
          <p className="text-blue-200 text-sm mb-6">Start managing your tasks today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/20 text-red-200 text-sm px-4 py-3 rounded-lg border border-red-400/30">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-100 text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-300 focus:border-white focus:bg-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-100 text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-300 focus:border-white focus:bg-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-100 text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-300 focus:border-white focus:bg-white/20 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-blue-700 hover:bg-blue-50 font-semibold h-11 mt-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>
          </form>

          <p className="text-center text-blue-200 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-white font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}