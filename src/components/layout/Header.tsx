'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  UserIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/contexts/CartContext'

const navigation = [
  { name: 'בית', href: '/' },
  { name: 'מוצרים שלנו', href: '/products' },
  { name: 'אודות', href: '/about' },
  { name: 'קורסים', href: '/courses' },
  { name: 'מידע', href: '/blog' },
  { name: 'צור קשר', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const { state, toggleCart } = useCart()

  return (
    <>
      {/* Main Header */}
      <header 
        id="main-navigation"
        className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm"
        role="banner"
        aria-label="ניווט ראשי"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 lg:py-6">
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                type="button"
                className="p-2 rounded-lg text-neutral-700 hover:text-primary-500 hover:bg-primary-50 transition-colors"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="relative w-12 h-12 lg:w-16 lg:h-16">
                  <Image
                    src="https://henig.co.il/wp-content/uploads/2025/08/Henig-09-1-1.png"
                    alt="מכון הניג"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="mr-3 hidden sm:block">
                  <div className="text-xl lg:text-2xl font-bold text-primary-600">
                    מכון הניג
                  </div>
                  <div className="text-xs lg:text-sm text-neutral-600 font-medium">
                    טיפולים טבעיים לבעיות עיכול
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav 
              className="hidden lg:flex lg:items-center lg:gap-8"
              role="navigation"
              aria-label="תפריט ניווט ראשי"
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-lg font-semibold transition-all duration-300 relative group px-2 py-1 rounded-lg ${
                    pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                  <span className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-300 group-hover:w-8 ${
                    pathname === item.href ? 'w-8' : ''
                  }`} />
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              
              {/* Search */}
              <div className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 rounded-lg text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300"
                >
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
                
                {/* Search Dropdown */}
                {searchOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-strong border p-4 animate-scale-in">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="חפש מוצרים..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                      />
                      <Button size="sm">
                        חפש
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative p-2 rounded-lg text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300"
              >
                <ShoppingBagIcon className="h-6 w-6" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-secondary-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                    {state.itemCount > 9 ? '9+' : state.itemCount}
                  </span>
                )}
              </button>

              {/* User Account */}
              <Link
                href="/dashboard"
                className="p-2 rounded-lg text-gray-600 hover:text-primary-500 hover:bg-gray-50 transition-colors"
              >
                <UserIcon className="h-6 w-6" />
              </Link>


              {/* CTA Button */}
              <div className="hidden lg:block mr-4">
                <Button size="sm" className="shadow-soft">
                  ייעוץ חינם
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="lg:hidden border-t bg-gray-50 px-4 py-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="חפש מוצרים..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              />
              <Button size="sm">
                חפש
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-strong animate-slide-in-right">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center">
                <div className="relative w-10 h-10">
                  <Image
                    src="https://henig.co.il/wp-content/uploads/2025/08/Henig-09-1-1.png"
                    alt="מכון הניג"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="mr-3">
                  <div className="text-lg font-bold text-primary-500">
                    מכון הניג
                  </div>
                  <div className="text-xs text-gray-600">
                    טיפולים טבעיים
                  </div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            {/* Navigation Links */}
            <nav className="p-6">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                      pathname === item.href
                        ? 'text-primary-500 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* Mobile CTA */}
              <div className="mt-8 space-y-4">
                <Button className="w-full justify-center" size="lg">
                  ייעוץ חינם
                </Button>
                <div className="text-center text-sm text-gray-600">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <PhoneIcon className="w-4 h-4" />
                    <span>073-7569463</span>
                  </div>
                  <div>משלוח חינם מעל ₪200</div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}