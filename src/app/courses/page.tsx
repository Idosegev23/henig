import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { RippleButton } from "@/components/magicui/ripple-button"
import {
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  SparklesIcon,
  ArrowLeftIcon,
  TruckIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'קורסים מקצועיים לטיפולים טבעיים | מכון הניג',
  description: 'קורסים מקצועיים בטיפולים טבעיים לבעיות עיכול. הכשרה מקיפה למטפלים ובעלי מקצוע בתחום הבריאות הטבעית.',
  keywords: 'קורסים מקצועיים, הכשרת מטפלים, טיפולים טבעיים, בעיות עיכול, הכשרה רפואית',
}

// Mock courses data - יוחלף בנתונים אמיתיים מהדאטאבייס
const courses = [
    {
      id: '1',
      title: 'מסלול מומחיות בטיפולים טבעיים מתקדמים',
      slug: 'advanced-natural-digestive-mastery',
      description: 'מסלול הכשרה מקיף המשלב מדע מתקדם עם טכניקות טיפול חדשניות לבעיות עיכול מורכבות',
      longDescription: 'מסלול מומחיות יוקרתי המיועד למטפלים מקצועיים. משלב מחקר עדכני, טכנולוגיות אבחון מתקדמות ופרוטוקולי טיפול מותאמים אישית.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
      instructor: 'פרופ׳ משה הניג',
      instructorTitle: 'מנהל מדעי, מכון הניג',
      duration: '60 שעות אקדמיות',
      lessons: 15,
      students: 156,
      price: 2400,
      salePrice: 1899,
      rating: 4.9,
      reviews: 47,
      level: 'מקצועי מתקדם',
      category: 'מומחיות קלינית',
      badge: 'הכי פופולרי',
      features: [
        'תעודת מומחיות מוכרת בינלאומית',
        'ליווי אישי עם מומחים קליניים',
        'גישה למעבדות מחקר מתקדמות',
        'רשת מקצועית בינלאומית',
        'עדכונים מחקריים חדשניים',
        'כלי אבחון דיגיטליים'
      ],
      curriculum: [
        'מדע המיקרוביום המתקדם',
        'אבחון פונקציונלי מתקדם',
        'פרמקולוגיה של צמחי מרפא',
        'רפואה אישית ומותאמת',
        'פרוטוקולי טיפול מתקדמים'
      ]
    },
  {
    id: '2',
    title: 'קורס מתקדם בפרוביוטיקה ומיקרוביום',
    slug: 'advanced-probiotics-microbiome',
    description: 'קורס מתקדם העוסק בעולם המיקרוביום ושימוש בפרוביוטיקה לטיפול',
    longDescription: 'קורס מתקדם המיועד למטפלים מנוסים. עוסק בהבנה מעמיקה של המיקרוביום האנושי ושימוש מתקדם בפרוביוטיקה לטיפול במגוון בעיות בריאות.',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop',
    instructor: 'ד"ר שרה כהן',
    duration: '60 שעות',
    lessons: 18,
    students: 89,
    price: 1800,
    salePrice: null,
    rating: 4.8,
    reviews: 23,
    level: 'מתקדמים',
    category: 'מיקרוביום',
    features: [
      'תעודת מומחיות',
      'מעבדה מעשית',
      'מחקרים עדכניים',
      'רשת מקצועית',
      'ייעוץ עסקי'
    ],
    curriculum: [
      'מיקרוביום ובריאות',
      'בדיקות מיקרוביום',
      'פרוביוטיקה מתקדמת',
      'פרה-ביוטיקה',
      'פוסט-ביוטיקה'
    ]
  },
  {
    id: '3',
    title: 'אבחון ובדיקות בטיפול הטבעי',
    slug: 'natural-diagnosis-testing',
    description: 'קורס מיוחד העוסק בשיטות אבחון ובדיקות בטיפול הטבעי',
    longDescription: 'קורס ייחודי המתמקד בשיטות אבחון חדשניות בטיפול הטבעי. כולל בדיקות מעבדה מתקדמות, אבחון פונקציונלי ושילוב עם הרפואה המשלימה.',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop',
    instructor: 'ד"ר דוד לוי',
    duration: '35 שעות',
    lessons: 10,
    students: 67,
    price: 1500,
    salePrice: 1199,
    rating: 4.7,
    reviews: 18,
    level: 'ביניים',
    category: 'אבחון',
    features: [
      'תעודת מומחיות באבחון',
      'גישה למעבדות מתקדמות',
      'כלי אבחון דיגיטליים',
      'מעקב אחר מטופלים',
      'עדכון רציף'
    ],
    curriculum: [
      'עקרונות האבחון הטבעי',
      'בדיקות דם פונקציונליות',
      'בדיקות צואה מתקדמות',
      'אבחון תזונתי',
      'מעקב והערכת תוצאות'
    ]
  },
  {
    id: '4',
    title: 'קורס לטיפול בקנדידה ופטריות',
    slug: 'candida-fungal-treatment',
    description: 'קורס מתמחה בטיפול טבעי בקנדידה ובעיות פטריות במערכת העיכול',
    longDescription: 'קורס מומחה המתמקד בהבנה מעמיקה של בעיות קנדידה ופטריות. כולל אבחון מדויק, פרוטוקולי טיפול יעילים ומניעת הישנות.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
    instructor: 'ד"ר רחל אברהם',
    duration: '25 שעות',
    lessons: 8,
    students: 134,
    price: 999,
    salePrice: 699,
    rating: 4.9,
    reviews: 41,
    level: 'כל הרמות',
    category: 'טיפול מיוחד',
    features: [
      'פרוטוקולי טיפול מוכחים',
      'מעקב אישי',
      'קהילת תמיכה',
      'חומרי עזר מעשיים',
      'עדכונים חדשים'
    ],
    curriculum: [
      'הבנת קנדידה ופטריות',
      'אבחון וזיהוי',
      'דיאטת אנטי-קנדידה',
      'תוספי מזון טיפוליים',
      'מניעת הישנות'
    ]
  }
]

const categories = [
  { name: 'כל הקורסים', value: 'all', count: courses.length },
  { name: 'טיפולים טבעיים', value: 'natural', count: 2 },
  { name: 'מיקרוביום', value: 'microbiome', count: 1 },
  { name: 'אבחון', value: 'diagnosis', count: 1 },
  { name: 'טיפול מיוחד', value: 'special', count: 1 }
]

const levels = [
  { name: 'כל הרמות', value: 'all' },
  { name: 'מתחילים', value: 'beginner' },
  { name: 'ביניים', value: 'intermediate' },
  { name: 'מתקדמים', value: 'advanced' }
]

export default function CoursesPage() {
  return (
    <div className="hebrew-text">
      {/* Hero Section - Education Theme */}
      <section className="relative py-20 min-h-[650px]" style={{
        background: 'linear-gradient(135deg, #027333 0%, #025c29 50%, #29D967 100%)'
      }}>
        {/* Clean Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Main Hero Content */}
            <div className="text-center text-white mb-16">
              <div className="inline-flex items-center gap-3 bg-secondary-600/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-secondary-400/40">
                <AcademicCapIcon className="w-6 h-6 text-secondary-200" />
                <span className="text-secondary-200 font-bold">הכשרה מקצועית מוכרת</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0px 0px 16px rgba(0,0,0,0.6)'}}>
                אקדמיה מקצועית
                <br />
                <span className="text-secondary-300">לטיפולים טבעיים</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-primary-100 mb-10 max-w-3xl mx-auto leading-relaxed" style={{textShadow: '1px 1px 6px rgba(0,0,0,0.7), 0px 0px 12px rgba(0,0,0,0.5)'}}>
                הצטרפו לדור הבא של מטפלים מקצועיים עם הכשרה מדעית מתקדמת ותעודות בינלאומיות
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="#courses">
                  <RippleButton 
                    rippleColor="#29D967"
                    className="px-10 py-5 text-lg font-bold text-white shadow-2xl border-2 transition-all duration-300"
                    style={{
                      borderRadius: '50px 0 50px 0',
                      background: 'linear-gradient(135deg, #027333 0%, #29D967 100%)',
                      borderColor: '#027333',
                      textShadow: '1px 1px 4px rgba(0,0,0,0.8)'
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <AcademicCapIcon className="w-6 h-6" style={{filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'}} />
                      התחל ללמוד היום
                    </span>
                  </RippleButton>
                </Link>
                
                <Link href="/auth/login">
                  <RippleButton 
                    rippleColor="#29D967"
                    className="px-10 py-5 text-lg font-bold shadow-2xl border-2 border-white transition-all duration-300"
                    style={{
                      borderRadius: '50px 0 50px 0',
                      backgroundColor: 'white',
                      color: '#027333'
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <UserGroupIcon className="w-6 h-6" />
                      איזור אישי
                    </span>
                  </RippleButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Trust Indicators */}
      <section className="py-16 bg-gradient-to-r from-slate-50 to-blue-50 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center gap-4 p-6 bg-white rounded-2xl shadow-lg border border-blue-100">
              <div className="p-3 bg-blue-100 rounded-full">
                <AcademicCapIcon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-800 text-lg">הסמכה בינלאומית</div>
                <div className="text-slate-600 text-sm">תעודות מוכרות עולמית</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 p-6 bg-white rounded-2xl shadow-lg border border-emerald-100">
              <div className="p-3 bg-emerald-100 rounded-full">
                <UserGroupIcon className="w-8 h-8 text-emerald-600" />
                  </div>
              <div className="text-right">
                <div className="font-bold text-slate-800 text-lg">קהילת בוגרים</div>
                <div className="text-slate-600 text-sm">רשת מקצועית פעילה</div>
                  </div>
                </div>
            <div className="flex items-center justify-center gap-4 p-6 bg-white rounded-2xl shadow-lg border border-yellow-100">
              <div className="p-3 bg-yellow-100 rounded-full">
                <CheckCircleIcon className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-800 text-lg">למידה מתמשכת</div>
                <div className="text-slate-600 text-sm">עדכונים לכל החיים</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programs */}
      <section id="courses" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <span>🎓</span>
              תוכניות לימודים אקדמיות
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              תוכניות ההכשרה המקצועיות שלנו
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              תוכניות לימודים מתקדמות המשלבות מדע עדכני, מחקר קליני וניסיון מעשי של עשרות שנים בתחום הרפואה הטבעית
            </p>
          </div>
          
          {/* Academic Filters */}
          <div className="bg-white rounded-3xl p-8 mb-16 shadow-xl border border-slate-200">
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
              
              {/* Academic Categories */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span>📚</span>
                  תחומי התמחות:
                </h3>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                        category.value === 'all'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                          : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-300 hover:border-blue-300'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Academic Level Filter */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span>🎯</span>
                  רמה אקדמית:
                </h3>
                <select className="px-5 py-3 border-2 border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 bg-white min-w-[200px]">
                  {levels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Academic Programs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {courses.map((course, index) => (
              <div key={course.id} className="group relative">
                {/* Academic Course Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:border-blue-300">
                
                {/* Course Image with Academic Overlay */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Academic Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <span>🎓</span>
                    {course.level}
                  </div>
                  {course.salePrice && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                      הנחה מיוחדת ₪{course.price - course.salePrice}
                    </div>
                  )}
                  
                  {/* Academic Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-6">
                    <div className="text-white">
                      <div className="text-sm font-medium text-blue-300 mb-1">{course.category}</div>
                      <h3 className="text-xl font-bold mb-2 line-clamp-2">{course.title}</h3>
                    </div>
                  </div>
                </div>

                {/* Academic Course Content */}
                <div className="p-8">
                  {/* Course Description */}
                  <div className="mb-6">
                    <p className="text-slate-600 leading-relaxed text-lg mb-4">
                      {course.description}
                    </p>
                  </div>

                  {/* Academic Details */}
                  <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <AcademicCapIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">מרצה מוביל</div>
                        <div className="text-slate-600">{course.instructor}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <ClockIcon className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">משך הקורס</div>
                        <div className="text-slate-600">{course.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <PlayCircleIcon className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">מספר שיעורים</div>
                        <div className="text-slate-600">{course.lessons} שיעורים</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <UserGroupIcon className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">סטודנטים</div>
                        <div className="text-slate-600">{course.students} פעילים</div>
                      </div>
                    </div>
                  </div>

                  {/* Course Rating */}
                  <div className="flex items-center gap-3 mb-6 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(course.rating)
                              ? 'text-yellow-500 fill-current'
                              : 'text-yellow-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-slate-800 font-medium">
                      {course.rating} מתוך 5 ({course.reviews} הערכות סטודנטים)
                    </span>
                  </div>

                  {/* Academic Features */}
                  <div className="mb-8">
                    <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <span>🏆</span>
                      תכונות התוכנית:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {course.features.slice(0, 4).map((feature) => (
                        <span
                          key={feature}
                          className="text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-full border border-blue-200 font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                      {course.features.length > 4 && (
                        <span className="text-xs text-slate-500 font-medium px-3 py-2">
                          +{course.features.length - 4} נוספות
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Enrollment & Price */}
                  <div className="border-t border-slate-200 pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                      {course.salePrice ? (
                        <>
                            <span className="text-3xl font-bold text-emerald-600">
                            ₪{course.salePrice}
                          </span>
                            <span className="text-lg text-slate-500 line-through">
                            ₪{course.price}
                          </span>
                        </>
                      ) : (
                          <span className="text-3xl font-bold text-slate-800">
                          ₪{course.price}
                        </span>
                      )}
                    </div>
                    
                    <Link href={`/courses/${course.slug}`}>
                        <RippleButton 
                          rippleColor="#3B82F6"
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300"
                        >
                          <span className="flex items-center gap-2">
                            <span>הירשם עכשיו</span>
                            <PlayCircleIcon className="w-5 h-5" />
                          </span>
                        </RippleButton>
                    </Link>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Excellence */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <span>🌟</span>
              מצוינות אקדמית
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              למה האקדמיה שלנו מובילה בתחום?
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              עשרות שנים של ניסיון אקדמי, מחקר מתקדם ושיתופי פעולה בינלאומיים הופכים אותנו למובילים בחינוך הרפואי הטבעי
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: AcademicCapIcon,
                title: 'סגל אקדמי מוביל',
                description: 'פרופסורים ומרצים מובילים עם ניסיון קליני ומחקרי בינלאומי',
                color: 'blue'
              },
              {
                icon: CheckCircleIcon,
                title: 'הסמכה בינלאומית',
                description: 'תעודות מוכרות עולמית המקנות הסמכה מקצועית מלאה',
                color: 'emerald'
              },
              {
                icon: UserGroupIcon,
                title: 'רשת בוגרים עולמית',
                description: 'קהילה פעילה של בוגרים ברחבי העולם עם הזדמנויות שיתוף פעולה',
                color: 'purple'
              },
              {
                icon: PlayCircleIcon,
                title: 'טכנולוגיה מתקדמת',
                description: 'פלטפורמת למידה דיגיטלית מתקדמת עם VR וסימולציות',
                color: 'indigo'
              },
              {
                icon: ClockIcon,
                title: 'מחקר מתמשך',
                description: 'עדכונים מתמידים מהמחקרים החדשניים ביותר בתחום',
                color: 'teal'
              },
              {
                icon: StarIcon,
                title: 'מנטורינג אישי',
                description: 'ליווי אישי צמוד מצוות המרצים לאורך כל תהליך הלימודים',
                color: 'yellow'
              }
            ].map((feature, index) => (
              <div key={feature.title} className="group relative">
                <div className={`h-full bg-white rounded-3xl border-2 transition-all duration-300 shadow-lg group-hover:shadow-xl p-8 text-center ${
                  feature.color === 'blue' ? 'border-blue-100 group-hover:border-blue-300' :
                  feature.color === 'emerald' ? 'border-emerald-100 group-hover:border-emerald-300' :
                  feature.color === 'purple' ? 'border-purple-100 group-hover:border-purple-300' :
                  feature.color === 'indigo' ? 'border-indigo-100 group-hover:border-indigo-300' :
                  feature.color === 'teal' ? 'border-teal-100 group-hover:border-teal-300' :
                  'border-yellow-100 group-hover:border-yellow-300'
                }`}>
                  {/* Academic Icon */}
                  <div className={`w-20 h-20 mx-auto mb-6 border-2 flex items-center justify-center rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 ${
                    feature.color === 'blue' ? 'bg-blue-50 border-blue-200 text-blue-600' :
                    feature.color === 'emerald' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' :
                    feature.color === 'purple' ? 'bg-purple-50 border-purple-200 text-purple-600' :
                    feature.color === 'indigo' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' :
                    feature.color === 'teal' ? 'bg-teal-50 border-teal-200 text-teal-600' :
                    'bg-yellow-50 border-yellow-200 text-yellow-600'
                  }`}>
                    <feature.icon className="h-10 w-10" />
                </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors">
                  {feature.title}
                </h3>
                  <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
                  
                  {/* Academic Accent */}
                  <div className={`mt-6 w-16 h-1 mx-auto rounded-full ${
                    feature.color === 'blue' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                    feature.color === 'emerald' ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' :
                    feature.color === 'purple' ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
                    feature.color === 'indigo' ? 'bg-gradient-to-r from-indigo-400 to-indigo-600' :
                    feature.color === 'teal' ? 'bg-gradient-to-r from-teal-400 to-teal-600' :
                    'bg-gradient-to-r from-yellow-400 to-yellow-600'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Enrollment CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Academic Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 text-white/5 text-8xl">📚</div>
          <div className="absolute top-20 right-20 text-white/5 text-6xl">🎓</div>
          <div className="absolute bottom-20 left-20 text-white/5 text-7xl">🧬</div>
          <div className="absolute bottom-10 right-10 text-white/5 text-5xl">⚗️</div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <span className="text-2xl">🚀</span>
              <span className="text-white font-bold">התחל את המסע האקדמי שלך</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-white leading-tight">
              הצטרף לדור הבא של
              <br />
              <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                מטפלים מקצועיים
              </span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              התחל עוד היום במסע לימודים מרתק שיפתח בפניך דלתות להזדמנויות קריירה אין־סופיות בתחום הרפואה הטבעית
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="#courses">
                <RippleButton 
                  rippleColor="#10B981"
                  className="px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-2xl border-2 border-emerald-500 transition-all duration-300"
                  style={{borderRadius: '60px'}}
                >
                  <span className="flex items-center gap-3">
                    <AcademicCapIcon className="w-6 h-6" />
                    הירשם לקורס עכשיו
                  </span>
                </RippleButton>
              </Link>
              
              <Link href="/contact">
                <RippleButton 
                  rippleColor="#ffffff"
                  className="px-12 py-6 text-xl font-bold text-slate-800 bg-white hover:bg-gray-50 shadow-2xl border-2 border-white transition-all duration-300"
                  style={{borderRadius: '60px'}}
                >
                  <span className="flex items-center gap-3">
                    <CheckCircleIcon className="w-6 h-6" />
                    קבל ייעוץ אישי
                  </span>
                </RippleButton>
              </Link>
              
              <Link href="/auth/login">
                <RippleButton 
                  rippleColor="#ffffff"
                  className="px-12 py-6 text-xl font-bold text-white bg-transparent border-2 border-white hover:bg-white hover:text-slate-800 shadow-2xl transition-all duration-300"
                  style={{borderRadius: '60px'}}
                >
                  <span className="flex items-center gap-3">
                    <UserGroupIcon className="w-6 h-6" />
                    איזור אישי
                  </span>
                </RippleButton>
              </Link>
            </div>
            
            {/* Academic Trust Badges */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 text-center text-white/80">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <span className="text-sm font-medium">הסמכה בינלאומית</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <span className="text-sm font-medium">דירוג 5 כוכבים</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <span className="text-sm font-medium">500+ בוגרים מוסמכים</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
