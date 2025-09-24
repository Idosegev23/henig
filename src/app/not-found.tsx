import Link from 'next/link'
import { RippleButton } from '@/components/magicui/ripple-button'
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  ExclamationTriangleIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex flex-col justify-center items-center px-4 hebrew-text">
      <div className="max-w-2xl mx-auto text-center">
        
        {/* Error Icon */}
        <div className="relative mb-8">
          <div className="text-8xl font-bold text-primary-200 select-none">404</div>
          <ExclamationTriangleIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-secondary-500" />
        </div>

        {/* Error Message */}
        <h1 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">
          עמוד לא נמצא
        </h1>
        
        <p className="text-xl text-primary-600 mb-8 leading-relaxed">
          מצטערים, הדף שחיפשתם לא קיים או הועבר למקום אחר.
          בוא נעזור לכם למצוא את מה שאתם מחפשים.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/">
            <RippleButton 
              rippleColor="#29D967"
              className="px-8 py-4 text-lg font-bold text-white shadow-xl border-2 transition-all duration-300"
              style={{
                borderRadius: '50px 0 50px 0',
                background: 'linear-gradient(135deg, #027333 0%, #29D967 100%)',
                borderColor: '#027333'
              }}
            >
              <span className="flex items-center gap-3">
                <HomeIcon className="w-6 h-6" />
                חזרה לעמוד הבית
              </span>
            </RippleButton>
          </Link>
          
          <Link href="/products">
            <RippleButton 
              rippleColor="#29D967"
              className="px-8 py-4 text-lg font-bold shadow-xl border-2 border-primary-600 transition-all duration-300"
              style={{
                borderRadius: '50px 0 50px 0',
                backgroundColor: 'white',
                color: '#027333'
              }}
            >
              <span className="flex items-center gap-3">
                <MagnifyingGlassIcon className="w-6 h-6" />
                עיון במוצרים
              </span>
            </RippleButton>
          </Link>
        </div>

        {/* Popular Links */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-primary-200">
          <h3 className="text-xl font-bold text-primary-800 mb-6">דפים פופולריים</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'אודותינו', href: '/about', icon: '🏢' },
              { name: 'הקורסים שלנו', href: '/courses', icon: '🎓' },
              { name: 'הבלוג שלנו', href: '/blog', icon: '📝' },
              { name: 'צור קשר', href: '/contact', icon: '📞' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 p-4 rounded-2xl border-2 border-primary-100 hover:border-secondary-300 hover:bg-primary-50 transition-all duration-300 group"
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="text-primary-700 group-hover:text-secondary-600 font-medium">
                  {link.name}
                </span>
                <ArrowRightIcon className="w-4 h-4 text-primary-400 group-hover:text-secondary-500 mr-auto transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <p className="text-sm text-primary-500 mt-8">
          זקוקים לעזרה? <Link href="/contact" className="text-secondary-600 hover:text-secondary-700 font-medium underline">צרו קשר איתנו</Link>
        </p>
      </div>
    </div>
  )
}
