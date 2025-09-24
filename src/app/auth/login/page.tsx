'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { RippleButton } from "@/components/magicui/ripple-button"
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError('')
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
      
      if (error) {
        setError('שגיאה בהתחברות עם Google: ' + error.message)
      }
    } catch (error) {
      console.error('Error:', error)
      setError('שגיאה בהתחברות')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError('שגיאה בהתחברות: ' + error.message)
      } else if (data.user) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('שגיאה בהתחברות')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="hebrew-text min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <UserIcon className="w-10 h-10 text-primary-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>
            ברוכים השבים
          </h2>
          <p className="text-primary-100" style={{textShadow: '1px 1px 6px rgba(0,0,0,0.7)'}}>
            התחברו לאיזור האישי שלכם
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-red-700 text-sm text-center">{error}</p>
            </div>
          )}
          
          {/* Google Login Button */}
          <div className="mb-6">
            <RippleButton
              onClick={handleGoogleLogin}
              disabled={isLoading}
              rippleColor="#4285f4"
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isLoading ? 'מתחבר...' : 'התחבר עם Google'}
            </RippleButton>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">או התחבר עם אימייל</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                כתובת אימייל
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  placeholder="הכנס את האימייל שלך"
                />
                <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                סיסמה
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 pl-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  placeholder="הכנס את הסיסמה שלך"
                />
                <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="remember" className="mr-2 text-sm text-gray-600">
                  זכור אותי
                </label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-primary-600 hover:text-primary-500 font-medium">
                שכחת סיסמה?
              </Link>
            </div>

            {/* Submit Button */}
            <RippleButton
              type="submit"
              disabled={isLoading}
              rippleColor="#29D967"
              className="w-full px-6 py-4 text-lg font-bold text-white shadow-2xl border-2 transition-all duration-300"
              style={{
                borderRadius: '50px 0 50px 0',
                background: 'linear-gradient(135deg, #027333 0%, #29D967 100%)',
                borderColor: '#027333'
              }}
            >
              {isLoading ? 'מתחבר...' : 'התחבר'}
            </RippleButton>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              עדיין אין לך חשבון?{' '}
              <Link href="/auth/register" className="text-primary-600 hover:text-primary-500 font-bold">
                הירשם כאן
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white hover:text-secondary-200 font-medium transition-colors"
            style={{textShadow: '1px 1px 6px rgba(0,0,0,0.7)'}}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            חזור לאתר הראשי
          </Link>
        </div>
      </div>
    </div>
  )
}