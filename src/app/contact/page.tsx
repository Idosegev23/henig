'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { RippleButton } from "@/components/magicui/ripple-button"
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

const contactInfo = [
  {
    icon: PhoneIcon,
    title: 'טלפון',
    value: '03-1234567',
    link: 'tel:03-1234567',
    color: 'blue'
  },
  {
    icon: EnvelopeIcon,
    title: 'אימייל',
    value: 'info@henig-institute.com',
    link: 'mailto:info@henig-institute.com',
    color: 'green'
  },
  {
    icon: MapPinIcon,
    title: 'כתובת',
    value: 'רחוב הרופאים 15, תל אביב',
    link: 'https://maps.google.com/?q=רחוב+הרופאים+15+תל+אביב',
    color: 'red'
  },
  {
    icon: ClockIcon,
    title: 'שעות פעילות',
    value: 'א׳-ה׳: 8:00-18:00, ו׳: 8:00-13:00',
    color: 'purple'
  }
]

const reasons = [
  {
    title: 'ייעוץ חינם',
    description: 'קבלו ייעוץ ראשוני חינם ללא התחייבות',
    icon: '💬'
  },
  {
    title: 'מענה מהיר',
    description: 'אנו מתחייבים למענה תוך 24 שעות',
    icon: '⚡'
  },
  {
    title: 'מומחים זמינים',
    description: 'הצוות המקצועי שלנו כאן כדי לעזור',
    icon: '👨‍⚕️'
  },
  {
    title: 'פתרונות מותאמים',
    description: 'כל טיפול מותאם אישית לצרכים שלכם',
    icon: '🎯'
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // TODO: שלח את הטופס לשרת
      console.log('Form submitted:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="hebrew-text min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-3xl p-12 shadow-2xl text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">תודה רבה!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            הודעתכם התקבלה בהצלחה. נחזור אליכם בהקדם האפשרי.
          </p>
          <RippleButton
            onClick={() => setIsSubmitted(false)}
            rippleColor="#027333"
            className="px-6 py-3 text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            style={{borderRadius: '25px 0 25px 0'}}
          >
            שלח הודעה נוספת
          </RippleButton>
        </div>
      </div>
    )
  }

  return (
    <div className="hebrew-text">
      
      {/* Hero Section */}
      <section className="relative py-20 min-h-[400px] bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>
              צור קשר
            </h1>
            <p className="text-xl mb-8 leading-relaxed" style={{textShadow: '1px 1px 6px rgba(0,0,0,0.7)'}}>
              נשמח לענות על כל שאלה ולהעניק לכם ייעוץ מקצועי חינם
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div key={info.title} className="group text-center">
                <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-primary-200 group-hover:border-secondary-400 transition-all duration-300 group-hover:shadow-xl">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                    info.color === 'blue' ? 'bg-blue-100' :
                    info.color === 'green' ? 'bg-green-100' :
                    info.color === 'red' ? 'bg-red-100' : 'bg-purple-100'
                  }`}>
                    <info.icon className={`w-8 h-8 ${
                      info.color === 'blue' ? 'text-blue-600' :
                      info.color === 'green' ? 'text-green-600' :
                      info.color === 'red' ? 'text-red-600' : 'text-purple-600'
                    }`} />
                  </div>
                  <h3 className="text-lg font-bold text-primary-800 mb-3">{info.title}</h3>
                  {info.link ? (
                    <a 
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-primary-700 hover:text-secondary-600 transition-colors leading-relaxed"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-primary-700 leading-relaxed">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-primary-200">
                <h2 className="text-3xl font-bold text-primary-800 mb-6 text-center">
                  שלחו לנו הודעה
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      שם מלא *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="הכנס את השם המלא שלך"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      כתובת אימייל *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="הכנס את האימייל שלך"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      מספר טלפון
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="050-1234567"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      נושא הפנייה *
                    </label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    >
                      <option value="">בחר נושא</option>
                      <option value="consultation">ייעוץ כללי</option>
                      <option value="treatment">שאלה על טיפול</option>
                      <option value="course">מידע על קורסים</option>
                      <option value="appointment">קביעת תור</option>
                      <option value="product">שאלה על מוצר</option>
                      <option value="other">אחר</option>
                    </select>
                  </div>

                  {/* Preferred Contact */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      דרך יצירת קשר מועדפת
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="email"
                          checked={formData.preferredContact === 'email'}
                          onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                          className="w-4 h-4 text-primary-600"
                        />
                        <span className="text-gray-700">אימייל</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="phone"
                          checked={formData.preferredContact === 'phone'}
                          onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                          className="w-4 h-4 text-primary-600"
                        />
                        <span className="text-gray-700">טלפון</span>
                      </label>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      הודעה *
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 resize-none"
                      placeholder="ספר לנו על הבעיה שלך או השאלה שלך..."
                    />
                  </div>

                  {/* Submit Button */}
                  <RippleButton
                    type="submit"
                    disabled={isLoading}
                    rippleColor="#29D967"
                    className="w-full px-6 py-4 text-lg font-bold text-white shadow-2xl border-2 transition-all duration-300 disabled:opacity-50"
                    style={{
                      borderRadius: '50px 0 50px 0',
                      background: 'linear-gradient(135deg, #027333 0%, #29D967 100%)',
                      borderColor: '#027333'
                    }}
                  >
                    {isLoading ? 'שולח...' : 'שלח הודעה'}
                  </RippleButton>
                </form>
              </div>
            </div>

            {/* Why Contact Us */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-primary-800 mb-6">
                  למה לפנות אלינו?
                </h2>
                <p className="text-primary-700 text-lg leading-relaxed mb-8">
                  אנו כאן כדי לעזור לכם למצוא את הפתרון הטוב ביותר לבעיות העיכול שלכם. 
                  הצוות המקצועי שלנו מביא ניסיון של עשרות שנים בתחום.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reasons.map((reason, index) => (
                  <div key={reason.title} className="bg-white rounded-2xl p-6 shadow-lg border border-primary-200">
                    <div className="text-3xl mb-4">{reason.icon}</div>
                    <h3 className="text-lg font-bold text-primary-800 mb-2">{reason.title}</h3>
                    <p className="text-primary-700 text-sm leading-relaxed">{reason.description}</p>
                  </div>
                ))}
              </div>

              {/* Quick Contact Options */}
              <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.3)'}}>
                  צריכים מענה מהיר?
                </h3>
                <div className="space-y-4">
                  <a 
                    href="tel:03-1234567"
                    className="flex items-center gap-4 p-4 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-colors"
                  >
                    <PhoneIcon className="w-6 h-6" />
                    <div>
                      <div className="font-bold">התקשרו עכשיו</div>
                      <div className="text-sm opacity-90">03-1234567</div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://wa.me/972501234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-colors"
                  >
                    <ChatBubbleLeftRightIcon className="w-6 h-6" />
                    <div>
                      <div className="font-bold">WhatsApp</div>
                      <div className="text-sm opacity-90">מענה מיידי</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Placeholder */}
      <section className="h-96 bg-gray-300 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <MapPinIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">מפה תבוא כאן</h3>
            <p className="text-gray-600">רחוב הרופאים 15, תל אביב</p>
          </div>
        </div>
      </section>
    </div>
  )
}