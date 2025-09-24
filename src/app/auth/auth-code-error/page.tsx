import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 hebrew-text">
            שגיאה בהתחברות
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 hebrew-text">
            אירעה שגיאה במהלך תהליך ההתחברות. אנא נסו שוב.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700 hebrew-text">
              <h3 className="font-medium">מה קרה?</h3>
              <p className="mt-2">
                תהליך ההתחברות לא הושלם בהצלחה. זה יכול לקרות מהסיבות הבאות:
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>ביטלתם את תהליך ההתחברות</li>
                <li>הקוד שהתקבל פג תוקף</li>
                <li>שגיאה זמנית בשירות</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/auth/login">
              <Button className="w-full">
                נסו שוב להתחבר
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="outline" className="w-full">
                חזרו לדף הבית
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 hebrew-text">
              זקוקים לעזרה?{' '}
              <Link
                href="/contact"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                צרו איתנו קשר
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
