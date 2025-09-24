import Link from 'next/link'
import Image from 'next/image'
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

const footerNavigation = {
  מוצרים: [
    { name: 'טיפול בצרבת', href: '/products?category=heartburn' },
    { name: 'מעי רגיש', href: '/products?category=ibs' },
    { name: 'קנדידה', href: '/products?category=candida' },
    { name: 'פרוביוטיקה', href: '/products?category=probiotics' },
    { name: 'כל המוצרים', href: '/products' },
  ],
  קורסים: [
    { name: 'קורס בסיסי לטיפולים טבעיים', href: '/courses/basic-natural-treatment' },
    { name: 'קורס מתקדם בפרוביוטיקה', href: '/courses/advanced-probiotics' },
    { name: 'אבחון ובדיקות', href: '/courses/diagnosis-testing' },
    { name: 'כל הקורסים', href: '/courses' },
  ],
  'מידע שימושי': [
    { name: 'בלוג', href: '/blog' },
    { name: 'שאלות נפוצות', href: '/faq' },
    { name: 'מדריכים', href: '/guides' },
    { name: 'מחקרים', href: '/research' },
  ],
  'שירות לקוחות': [
    { name: 'צור קשר', href: '/contact' },
    { name: 'משלוחים והחזרות', href: '/shipping' },
    { name: 'תקנון', href: '/terms' },
    { name: 'מדיניות פרטיות', href: '/privacy' },
  ],
}

const socialLinks = [
  {
    name: 'Facebook',
    href: '#',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12.017 0C8.396 0 7.929.01 6.71.048 5.493.087 4.73.222 4.058.42a5.916 5.916 0 0 0-2.134 1.384A5.916 5.916 0 0 0 .42 4.058C.222 4.73.087 5.493.048 6.71.01 7.929 0 8.396 0 12.017s.01 4.087.048 5.303c.039 1.218.174 1.981.372 2.653a5.916 5.916 0 0 0 1.384 2.134 5.916 5.916 0 0 0 2.134 1.384c.672.198 1.435.333 2.653.372 1.216.039 1.683.048 5.303.048s4.087-.01 5.303-.048c1.218-.039 1.981-.174 2.653-.372a5.916 5.916 0 0 0 2.134-1.384 5.916 5.916 0 0 0 1.384-2.134c.198-.672.333-1.435.372-2.653.039-1.216.048-1.683.048-5.303s-.01-4.087-.048-5.303c-.039-1.218-.174-1.981-.372-2.653A5.916 5.916 0 0 0 19.82 1.404 5.916 5.916 0 0 0 17.686.42C17.014.222 16.251.087 15.033.048 13.814.01 13.347 0 9.727 0H12.017zm-.306 1.802h.306c3.547 0 3.966.01 5.168.048 1.247.057 1.925.267 2.376.444.597.232 1.023.51 1.47.956.447.447.724.873.956 1.47.177.451.387 1.129.444 2.376.038 1.202.047 1.621.047 4.768s-.009 3.566-.047 4.768c-.057 1.247-.267 1.925-.444 2.376-.232.597-.51 1.023-.956 1.47-.447.447-.873.724-1.47.956-.451.177-1.129.387-2.376.444-1.202.038-1.621.047-4.768.047s-3.566-.009-4.768-.047c-1.247-.057-1.925-.267-2.376-.444a3.915 3.915 0 0 1-1.47-.956 3.915 3.915 0 0 1-.956-1.47c-.177-.451-.387-1.129-.444-2.376-.038-1.202-.047-1.621-.047-4.768s.009-3.566.047-4.768c.057-1.247.267-1.925.444-2.376.232-.597.51-1.023.956-1.47a3.915 3.915 0 0 1 1.47-.956c.451-.177 1.129-.387 2.376-.444 1.053-.048 1.462-.058 3.662-.058zm0 2.704a5.847 5.847 0 1 0 0 11.694 5.847 5.847 0 0 0 0-11.694zm0 9.639a3.792 3.792 0 1 1 0-7.584 3.792 3.792 0 0 1 0 7.584zm7.441-10.201a1.365 1.365 0 1 1-2.73 0 1.365 1.365 0 0 1 2.73 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: '#',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-primary-50 border-t-2 border-primary-200">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="sm:flex gap-8">
          {/* Column 1 - Products */}
          <div className="sm:w-1/4 h-auto">
            <div className="text-primary-600 font-bold text-lg mb-4">מוצרים</div>
            <ul className="space-y-2 leading-normal">
              {footerNavigation.מוצרים.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary-600 text-primary-800 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 - Courses & Info */}
          <div className="sm:w-1/4 h-auto sm:mt-0 mt-8">
            <div className="text-primary-600 font-bold text-lg mb-4">קורסים</div>
            <ul className="space-y-2 leading-normal">
              {footerNavigation.קורסים.slice(0, 3).map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary-600 text-primary-800 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="text-secondary-600 font-bold text-lg mb-4 mt-6">מידע שימושי</div>
            <ul className="space-y-2 leading-normal">
              {footerNavigation['מידע שימושי'].slice(0, 3).map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-secondary-600 text-primary-800 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Customer Service */}
          <div className="sm:w-1/4 h-auto sm:mt-0 mt-8">
            <div className="text-accent-600 font-bold text-lg mb-4">שירות לקוחות</div>
            <ul className="space-y-2 leading-normal">
              {footerNavigation['שירות לקוחות'].slice(0, 3).map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-accent-600 text-primary-800 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="text-primary-700 font-bold text-lg mb-4 mt-6">צור קשר</div>
            <ul className="space-y-2 leading-normal">
              <li className="text-primary-800 text-sm">📞 073-7569463</li>
              <li className="text-primary-800 text-sm">✉️ info@henig.co.il</li>
              <li className="text-primary-800 text-sm">🏢 תל אביב, ישראל</li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="sm:w-1/2 sm:mt-0 mt-8 h-auto">
            <div className="text-secondary-600 font-bold text-lg mb-4">ניוזלטר</div>
            <p className="text-primary-800 leading-normal mb-4 text-sm">
              הירשמו לקבלת עדכונים על מוצרים חדשים, מאמרים מקצועיים וטיפים לבריאות טובה יותר
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                className="flex-1 p-3 border-2 border-primary-300 rounded-lg text-primary-800 text-sm focus:outline-none focus:border-secondary-500 transition-colors" 
                placeholder="כתובת האימייל שלכם"
              />
              <button className="bg-white border-2 border-primary-500 hover:border-secondary-500 text-primary-600 hover:text-secondary-600 font-bold text-sm px-6 py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                      style={{borderRadius: '20px 0 20px 0'}}>
                הירשמו
              </button>
            </div>
            
            {/* Social Media */}
            <div className="mt-6">
              <div className="text-primary-700 font-bold text-base mb-3">עקבו אחרינו</div>
              <div className="flex gap-3">
                {socialLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="w-10 h-10 bg-white border-2 border-primary-400 hover:bg-primary-500 hover:border-secondary-500 text-primary-600 hover:text-white transition-all duration-300 flex items-center justify-center"
                    style={{borderRadius: '15px 0 15px 0'}}
                  >
                    <item.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t-2 border-primary-300 mt-12 pt-8 text-center">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-sm text-primary-700">
            <p>
              © {new Date().getFullYear()} מכון הניג. כל הזכויות שמורות.
            </p>
            <div className="flex gap-6">
              <Link href="/terms" className="hover:text-secondary-600 transition-colors">
                תקנון
              </Link>
              <Link href="/privacy" className="hover:text-secondary-600 transition-colors">
                מדיניות פרטיות
              </Link>
              <Link href="/cookies" className="hover:text-secondary-600 transition-colors">
                מדיניות קובצי Cookie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}