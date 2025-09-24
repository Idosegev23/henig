import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { RippleButton } from "@/components/magicui/ripple-button"
import {
  AcademicCapIcon,
  UserGroupIcon,
  BeakerIcon,
  GlobeAltIcon,
  HeartIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'אודות מכון הניג - מובילים בטיפולים טבעיים',
  description: 'למדו על מכון הניג, המוביל בישראל בטיפולים טבעיים לבעיות עיכול. 20+ שנות ניסיון, אלפי לקוחות מרוצים ומחקר מתקדם.',
  keywords: 'מכון הניג, אודות, טיפולים טבעיים, בעיות עיכול, מחקר, ניסיון',
}

const teamMembers = [
  {
    name: 'פרופ׳ משה הניג',
    title: 'מייסד ומנהל מדעי',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
    description: 'מוביל בתחום הטיפולים הטבעיים עם מעל 25 שנות ניסיון קליני ומחקרי'
  },
  {
    name: 'ד"ר שרה כהן',
    title: 'מומחית מיקרוביום',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
    description: 'חוקרת מובילה בתחום המיקרוביום האנושי ופרוביוטיקה מתקדמת'
  },
  {
    name: 'ד"ר דוד לוי',
    title: 'מומחה אבחון',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face',
    description: 'מומחה בבדיקות פונקציונליות ואבחון מתקדם בטיפול הטבעי'
  },
  {
    name: 'ד"ר רחל אברהם',
    title: 'מומחית קנדידה',
    image: 'https://images.unsplash.com/photo-1594824475480-aa5c93dd7cec?w=300&h=300&fit=crop&crop=face',
    description: 'מומחית בטיפול בקנדידה ופטריות עם פרוטוקולים מוכחים'
  }
]

const achievements = [
  { number: '20+', label: 'שנות ניסיון', icon: StarIcon },
  { number: '15,000+', label: 'לקוחות מרוצים', icon: HeartIcon },
  { number: '500+', label: 'בוגרי קורסים', icon: AcademicCapIcon },
  { number: '50+', label: 'מחקרים פורסמו', icon: BeakerIcon }
]

export default function AboutPage() {
  return (
    <div className="hebrew-text">
      
      {/* Hero Section */}
      <section className="relative py-20 min-h-[600px] bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>
              אודות מכון הניג
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{textShadow: '1px 1px 6px rgba(0,0,0,0.7)'}}>
              מובילים בישראל בטיפולים טבעיים לבעיות עיכול מזה למעלה מ-20 שנה
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <RippleButton 
                  rippleColor="#29D967"
                  className="px-8 py-4 text-lg font-bold text-white shadow-2xl border-2 transition-all duration-300"
                  style={{
                    borderRadius: '50px 0 50px 0',
                    background: 'linear-gradient(135deg, #027333 0%, #29D967 100%)',
                    borderColor: '#027333',
                    textShadow: '1px 1px 4px rgba(0,0,0,0.8)'
                  }}
                >
                  <span className="flex items-center gap-2">
                    צור קשר
                    <ArrowLeftIcon className="w-5 h-5" />
                  </span>
                </RippleButton>
              </Link>
              
              <Link href="/courses">
                <RippleButton 
                  rippleColor="#29D967"
                  className="px-8 py-4 text-lg font-bold shadow-2xl border-2 border-white transition-all duration-300"
                  style={{
                    borderRadius: '50px 0 50px 0',
                    backgroundColor: 'white',
                    color: '#027333'
                  }}
                >
                  <span className="flex items-center gap-2">
                    הקורסים שלנו
                    <AcademicCapIcon className="w-5 h-5" />
                  </span>
                </RippleButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">הסיפור שלנו</h2>
              <p className="text-xl text-primary-700 leading-relaxed">
                מכון הניג נוסד ב-2003 על ידי פרופ׳ משה הניג עם חזון לספק פתרונות טבעיים ויעילים לבעיות עיכול
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-primary-50 p-8 rounded-3xl border-2 border-primary-200">
                  <h3 className="text-2xl font-bold text-primary-800 mb-4">החזון שלנו</h3>
                  <p className="text-primary-700 leading-relaxed">
                    להוביל את המהפכה בטיפולים טבעיים ולהפוך בעיות עיכול לעבר של המטופלים שלנו. 
                    אנו מאמינים שהטבע מחזיק בפתרונות המתקדמים ביותר לבריאותנו.
                  </p>
                </div>
                
                <div className="bg-secondary-50 p-8 rounded-3xl border-2 border-secondary-200">
                  <h3 className="text-2xl font-bold text-primary-800 mb-4">המשימה שלנו</h3>
                  <p className="text-primary-700 leading-relaxed">
                    לפתח, לחקור ולהעביר ידע מתקדם בתחום הטיפולים הטבעיים. אנו מחנכים דור חדש של 
                    מטפלים מקצועיים ומספקים פתרונות מותאמים אישית לכל מטופל.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-primary-200">
                  <Image
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop"
                    alt="מכון הניג - מחקר וטיפול"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Floating Achievement Card */}
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-2xl border-2 border-secondary-300">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">98%</div>
                    <div className="text-sm text-gray-600">שביעות רצון</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">ההישגים שלנו</h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto leading-relaxed">
              מעל שני עשורים של מצוינות בטיפולים טבעיים והכשרה מקצועית
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={achievement.label} className="text-center group">
                <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-primary-200 group-hover:border-secondary-400 transition-all duration-300 group-hover:shadow-xl">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <achievement.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-primary-800 mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-primary-700 font-medium">
                    {achievement.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">הצוות המקצועי</h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto leading-relaxed">
              מומחים מובילים בתחומם עם ניסיון קליני ומחקרי עשיר
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={member.name} className="group text-center">
                <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-primary-200 group-hover:border-secondary-400 transition-all duration-300 group-hover:shadow-xl">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary-200 group-hover:border-secondary-300 transition-all duration-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-primary-800 mb-2">{member.name}</h3>
                  <p className="text-secondary-600 font-medium mb-4">{member.title}</p>
                  <p className="text-primary-700 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">הערכים שלנו</h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto leading-relaxed">
              העקרונות המנחים אותנו בכל פעילות שאנו עושים
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'מקצועיות',
                description: 'שמירה על סטנדרטים גבוהים בכל טיפול ופעילות',
                icon: AcademicCapIcon,
                color: 'blue'
              },
              {
                title: 'חדשנות',
                description: 'מחקר מתמיד ופיתוח של שיטות טיפול מתקדמות',
                icon: BeakerIcon,
                color: 'green'
              },
              {
                title: 'אמפתיה',
                description: 'הבנה עמוקה של צרכי המטופלים והתאמה אישית',
                icon: HeartIcon,
                color: 'red'
              }
            ].map((value, index) => (
              <div key={value.title} className="group text-center">
                <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-primary-200 group-hover:border-secondary-400 transition-all duration-300 group-hover:shadow-xl h-full">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                    value.color === 'blue' ? 'bg-blue-100' :
                    value.color === 'green' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <value.icon className={`w-10 h-10 ${
                      value.color === 'blue' ? 'text-blue-600' :
                      value.color === 'green' ? 'text-green-600' : 'text-red-600'
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-800 mb-4">{value.title}</h3>
                  <p className="text-primary-700 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.3)'}}>
              מוכנים לשנות את החיים שלכם?
            </h2>
            <p className="text-xl mb-8" style={{textShadow: '1px 1px 6px rgba(0,0,0,0.3)'}}>
              הצטרפו לאלפי האנשים שכבר גילו את הכוח של הטיפולים הטבעיים
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <RippleButton 
                  rippleColor="#29D967"
                  className="px-8 py-4 text-lg font-bold shadow-2xl border-2 border-white transition-all duration-300"
                  style={{
                    borderRadius: '50px 0 50px 0',
                    backgroundColor: 'white',
                    color: '#027333'
                  }}
                >
                  <span className="flex items-center gap-2">
                    הזמן ייעוץ חינם
                    <CheckCircleIcon className="w-5 h-5" />
                  </span>
                </RippleButton>
              </Link>
              
              <Link href="/products">
                <RippleButton 
                  rippleColor="#ffffff"
                  className="px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-white hover:bg-white hover:text-primary-600 shadow-2xl transition-all duration-300"
                  style={{borderRadius: '50px 0 50px 0', textShadow: '1px 1px 4px rgba(0,0,0,0.3)'}}
                >
                  <span className="flex items-center gap-2">
                    צפה במוצרים
                    <ArrowLeftIcon className="w-5 h-5" />
                  </span>
                </RippleButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}