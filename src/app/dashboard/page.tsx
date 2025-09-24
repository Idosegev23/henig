'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { RippleButton } from "@/components/magicui/ripple-button"
import {
  UserIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ShoppingBagIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  CalendarIcon,
  ClockIcon,
  StarIcon,
  PlayCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  joinDate: string
  profession?: string
  totalCourses: number
  completedCourses: number
  inProgressCourses: number
  totalHours: number
  completedHours: number
  remainingHours: number
}

// Mock courses data
const userCourses = [
  {
    id: '1',
    title: 'מסלול מומחיות בטיפולים טבעיים מתקדמים',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop',
    progress: 100,
    status: 'completed',
    duration: '60 שעות',
    completedDate: '2024-03-15'
  },
  {
    id: '2',
    title: 'קורס מתקדם בפרוביוטיקה ומיקרוביום',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop',
    progress: 65,
    status: 'in-progress',
    duration: '40 שעות',
    nextLesson: 'יחידה 8: פרה-ביוטיקה מתקדמת'
  },
  {
    id: '3',
    title: 'אבחון ובדיקות בטיפול הטבעי',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=200&fit=crop',
    progress: 25,
    status: 'in-progress',
    duration: '35 שעות',
    nextLesson: 'יחידה 3: בדיקות דם פונקציונליות'
  }
]

// Mock orders data
const recentOrders = [
  {
    id: '1001',
    date: '2024-03-20',
    items: ['פורמולת הניג לצרבת', 'אנטי קנדידה פלוס'],
    total: 168,
    status: 'delivered'
  },
  {
    id: '1002',
    date: '2024-03-10',
    items: ['דיגסטיב פרו'],
    total: 75,
    status: 'shipped'
  }
]

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      // בדוק אם המשתמש מחובר
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !authUser) {
        console.error('No authenticated user:', authError)
        router.push('/auth/login')
        return
      }

      // טען נתונים מפרופיל Google
      const userData: User = {
        id: authUser.id,
        name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || 'משתמש',
        email: authUser.email || '',
        avatar: authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture,
        joinDate: authUser.created_at,
        profession: authUser.user_metadata?.profession || 'לא צוין',
        // ערכים ברירת מחדל - יעודכנו מהדאטאבייס
        totalCourses: 0,
        completedCourses: 0,
        inProgressCourses: 0,
        totalHours: 0,
        completedHours: 0,
        remainingHours: 0
      }

      setUser(userData)
      
      // טען נתונים נוספים מהדאטאבייס (קורסים, הזמנות וכו')
      // TODO: implementieren when database is ready
      
    } catch (error) {
      console.error('Error loading user data:', error)
      router.push('/auth/login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">טוען את המידע שלך...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">שגיאה בטעינת הנתונים</p>
          <Link href="/auth/login">
            <RippleButton
              rippleColor="#027333"
              className="px-6 py-3 text-white bg-primary-600 hover:bg-primary-700"
              style={{borderRadius: '25px 0 25px 0'}}
            >
              התחבר מחדש
            </RippleButton>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="hebrew-text min-h-screen bg-gradient-to-br from-slate-50 to-white">
      
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-primary-200 shadow-lg">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary-100 flex items-center justify-center">
                      <UserIcon className="w-8 h-8 text-primary-600" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">שלום, {user.name}</h1>
                <p className="text-gray-600">{user.profession} | חבר מאז {new Date(user.joinDate).toLocaleDateString('he-IL')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/">
                <RippleButton
                  rippleColor="#027333"
                  className="px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-all duration-300"
                  style={{borderRadius: '25px 0 25px 0'}}
                >
                  <span className="flex items-center gap-2">
                    חזור לאתר
                  </span>
                </RippleButton>
              </Link>
              
              <RippleButton
                onClick={handleLogout}
                rippleColor="#ef4444"
                className="px-6 py-3 text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-all duration-300"
                style={{borderRadius: '25px 0 25px 0'}}
              >
                <span className="flex items-center gap-2">
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  התנתק
                </span>
              </RippleButton>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 rtl:space-x-reverse">
            {[
              { id: 'overview', label: 'סקירה כללית', icon: ChartBarIcon },
              { id: 'courses', label: 'הקורסים שלי', icon: AcademicCapIcon },
              { id: 'orders', label: 'הזמנות', icon: ShoppingBagIcon },
              { id: 'profile', label: 'פרופיל', icon: UserIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-blue-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-2xl">
                    <AcademicCapIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{user.totalCourses}</div>
                    <div className="text-gray-600">קורסים רשומים</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-green-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-2xl">
                    <CheckCircleIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{user.completedCourses}</div>
                    <div className="text-gray-600">קורסים הושלמו</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-purple-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-2xl">
                    <ClockIcon className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{user.completedHours}</div>
                    <div className="text-gray-600">שעות הושלמו</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-orange-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-100 rounded-2xl">
                    <PlayCircleIcon className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{user.inProgressCourses}</div>
                    <div className="text-gray-600">קורסים פעילים</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Continue Learning */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <BookOpenIcon className="w-6 h-6 text-primary-600" />
                  המשך ללמוד
                </h3>
                <div className="space-y-4">
                  {userCourses.filter(course => course.status === 'in-progress').map((course) => (
                    <div key={course.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                      <div className="w-16 h-16 rounded-xl overflow-hidden">
                        <Image
                          src={course.image}
                          alt={course.title}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 line-clamp-1">{course.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{course.nextLesson}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{course.progress}% הושלם</p>
                      </div>
                      <RippleButton
                        rippleColor="#027333"
                        className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                        style={{borderRadius: '15px 0 15px 0'}}
                      >
                        המשך
                      </RippleButton>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <ShoppingBagIcon className="w-6 h-6 text-secondary-600" />
                  הזמנות אחרונות
                </h3>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-4 bg-gray-50 rounded-2xl">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-gray-900">הזמנה #{order.id}</div>
                          <div className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString('he-IL')}</div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status === 'delivered' ? 'נמסר' :
                           order.status === 'shipped' ? 'נשלח' : 'בהכנה'}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {order.items.join(', ')}
                      </div>
                      <div className="font-bold text-primary-600">₪{order.total}</div>
                    </div>
                  ))}
                </div>
                <Link href="/orders" className="block mt-4 text-center text-primary-600 hover:text-primary-700 font-medium">
                  צפה בכל ההזמנות
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">הקורסים שלי</h2>
              <Link href="/courses">
                <RippleButton
                  rippleColor="#027333"
                  className="px-6 py-3 text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                  style={{borderRadius: '25px 0 25px 0'}}
                >
                  עיין בקורסים נוספים
                </RippleButton>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-3xl shadow-lg border overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                      course.status === 'completed' ? 'bg-green-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {course.status === 'completed' ? 'הושלם' : 'בלמידה'}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{course.duration}</p>
                    
                    {course.status === 'completed' ? (
                      <div className="flex items-center gap-2 text-green-600 mb-4">
                        <CheckCircleIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">הושלם ב-{new Date(course.completedDate!).toLocaleDateString('he-IL')}</span>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>התקדמות</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        {course.nextLesson && (
                          <p className="text-xs text-gray-500 mt-2">הבא: {course.nextLesson}</p>
                        )}
                      </div>
                    )}
                    
                    <RippleButton
                      rippleColor="#027333"
                      className="w-full px-4 py-3 text-white bg-primary-600 hover:bg-primary-700 transition-colors font-medium"
                      style={{borderRadius: '20px 0 20px 0'}}
                    >
                      {course.status === 'completed' ? 'צפה שוב' : 'המשך לימוד'}
                    </RippleButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other tabs content */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">ההזמנות שלי</h2>
            <p className="text-gray-600">תוכן ההזמנות יבוא כאן...</p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">הפרופיל שלי</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-200">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary-100 flex items-center justify-center">
                        <UserIcon className="w-12 h-12 text-primary-600" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                    <p className="text-gray-600">{user.profession}</p>
                    <p className="text-sm text-gray-500">חבר מאז {new Date(user.joinDate).toLocaleDateString('he-IL')}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">אימייל</label>
                  <div className="text-gray-900">{user.email}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">מקצוע</label>
                  <div className="text-gray-900">{user.profession}</div>
                </div>
                
                <RippleButton
                  rippleColor="#027333"
                  className="px-6 py-3 text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                  style={{borderRadius: '25px 0 25px 0'}}
                >
                  ערוך פרופיל
                </RippleButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
