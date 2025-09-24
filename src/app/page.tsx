import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeftIcon, TruckIcon, ShieldCheckIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { RippleButton } from "@/components/magicui/ripple-button"
import { ProductsService } from '@/lib/services/products'
import { CategoriesService } from '@/lib/services/categories'

export const metadata = {
  title: 'מכון הניג - מוצרים טבעיים לבעיות עיכול',
  description: 'חנות המוצרים הטבעיים המובילה בישראל לטיפול בבעיות עיכול. מוצרים איכותיים עם משלוח מהיר ואחריות מלאה.',
  keywords: 'מוצרים טבעיים, בעיות עיכול, צרבת, מעי רגיש, קנדידה, טיפול טבעי, מכון הניג',
}

export default async function HomePage() {
  const productsService = new ProductsService()
  const categoriesService = new CategoriesService()

  const [, featuredProducts] = await Promise.all([
    categoriesService.getCategories(),
    productsService.getFeaturedProducts(8),
  ])

  const problemCategories = [
    { name: 'מעי רגיש', href: '/products?category=ibs', icon: '/icons/senstom.png' },
    { name: 'צרבת', href: '/products?category=heartburn', icon: '/icons/heartburn.png' },
    { name: 'עצירות', href: '/products?category=constipation', icon: '/icons/cons.png' },
    { name: 'דלקות מעיים', href: '/products?category=ibd', icon: '/icons/stominf.png' },
    { name: 'הליקובקטר פילורי', href: '/products?category=helicobacter', icon: '/icons/helicobacter.png' },
    { name: 'קנדידה', href: '/products?category=candida', icon: '/icons/candida.png' },
  ]

  return (
    <div className="hebrew-text">
      {/* Hero Section */}
      <section className="relative py-20 min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero.png"
            alt="מוצרים טבעיים לבעיות עיכול"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-primary-600/70"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0px 0px 16px rgba(0,0,0,0.6)'}}>
              מוצרים טבעיים
              <br />
              <span className="text-secondary-200" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0px 0px 16px rgba(0,0,0,0.6)'}}>לבעיות עיכול</span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto" style={{textShadow: '1px 1px 6px rgba(0,0,0,0.7), 0px 0px 12px rgba(0,0,0,0.5)'}}>
              חנות המוצרים הטבעיים המובילה בישראל עם מעל 15,000 לקוחות מרוצים
            </p>
            <div className="flex justify-center">
              <Link href="/products">
                <RippleButton 
                  rippleColor="#29D967"
                  className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 shadow-2xl border-2 border-primary-500 hover:border-secondary-500 transition-all duration-300"
                  style={{borderRadius: '50px 0 50px 0', textShadow: '1px 1px 4px rgba(0,0,0,0.8)'}}
                >
                  <span className="flex items-center gap-2">
                    קנה עכשיו
                    <ArrowLeftIcon className="w-5 h-5" style={{filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'}} />
                  </span>
                </RippleButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center gap-3">
              <TruckIcon className="w-8 h-8 text-secondary-500" />
              <div>
                <div className="font-semibold text-primary-800">משלוח מהיר</div>
                <div className="text-primary-600 text-sm">24-48 שעות</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <ShieldCheckIcon className="w-8 h-8 text-primary-500" />
              <div>
                <div className="font-semibold text-primary-800">תשלום מאובטח</div>
                <div className="text-primary-600 text-sm">SSL מוצפן</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <CheckCircleIcon className="w-8 h-8 text-accent-500" />
              <div>
                <div className="font-semibold text-primary-800">החזר כספי</div>
                <div className="text-primary-600 text-sm">30 יום</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.1)'}}>
              קנה לפי הבעיה שלך
            </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto leading-relaxed">
              מוצרים מותאמים אישית לכל בעיית עיכול - בחר את הבעיה שלך וקבל פתרון מדויק
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {problemCategories.map((category, index) => (
                <Link
                  key={category.name}
                  href={category.href}
                className="group relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {/* Glass Background - Leaf Shape */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 backdrop-blur-sm border-2 border-primary-500 transition-all duration-300 group-hover:from-primary-400/30 group-hover:to-secondary-400/30 group-hover:border-secondary-500" 
                     style={{borderRadius: '30px 0 30px 0'}}></div>
                
                {/* Content */}
                <div className="relative z-10 p-6 text-center">
                  <div className="mb-3">
                    <div className="w-12 h-12 mx-auto relative">
                      <Image
                        src={category.icon}
                        alt={category.name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-primary-800 group-hover:text-secondary-700 transition-colors leading-tight" style={{textShadow: '0.5px 0.5px 2px rgba(255,255,255,0.8)'}}>
                    {category.name}
                  </h3>
                </div>
                </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.1)'}}>
              המוצרים הנמכרים ביותר
            </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto leading-relaxed mb-8">
              המוצרים הפופולריים ביותר שלנו עם אלפי לקוחות מרוצים ותוצאות מוכחות
            </p>
            <Link href="/products" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-bold text-lg transition-colors">
              צפה בכל המוצרים
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile First Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {/* Add dummy products if we don't have enough */}
            {[...featuredProducts, 
              ...(featuredProducts.length < 4 ? [
                { id: 'dummy1', name: 'פורמולת הניג לצרבת', short_description: 'פתרון טבעי יעיל לצרבת ורפלוקס עם תוצאות מהירות', price: 89, sale_price: 79, rating: 4.5, reviews_count: 156, categories: { name: 'צרבת' }, images: ['/placeholder-product.jpg'] },
                { id: 'dummy2', name: 'אנטי קנדידה פלוס', short_description: 'מוצר טבעי למאבק יעיל בקנדידה ופטריות', price: 120, sale_price: 99, rating: 4.8, reviews_count: 203, categories: { name: 'קנדידה' }, images: ['/placeholder-product.jpg'] },
                { id: 'dummy3', name: 'דיגסטיב פרו', short_description: 'תמיכה בעיכול ובריאות המעיים', price: 75, sale_price: null, rating: 4.6, reviews_count: 89, categories: { name: 'עיכול' }, images: ['/placeholder-product.jpg'] },
                { id: 'dummy4', name: 'הליקו סטופ', short_description: 'פתרון טבעי להליקובקטר פילורי', price: 95, sale_price: 85, rating: 4.7, reviews_count: 142, categories: { name: 'הליקובקטר' }, images: ['/placeholder-product.jpg'] }
              ] : [])
            ].slice(0, 4).map((product, index) => (
              <div key={product.id} className="el-wrapper group">
                {/* Top Section - Image */}
                <div className="box-up">
                  <Image
                    src={Array.isArray(product.images) && product.images[0] ? String(product.images[0]) : '/placeholder-product.jpg'}
                    alt={product.name || 'מוצר'}
                    fill
                    className="img object-cover"
                  />
                  <div className="img-info">
                    <div className="info-inner">
                      <span className="p-name">{product.name || 'מוצר'}</span>
                      <span className="p-company">{product.categories?.name || 'מוצר טבעי'}</span>
                    </div>
                    <div className="a-size">
                      דירוג: <span className="size">{product.rating || 4.5} ⭐ ({product.reviews_count || 127} ביקורות)</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Section - Price & Cart */}
                <div className="box-down">
                  <div className="h-bg">
                    <div className="h-bg-inner"></div>
        </div>

                  <Link href={`/products/${'slug' in product ? product.slug : product.id || '#'}`} className="cart">
                    <span className="price">
                      {product.sale_price ? `ש ${product.sale_price}` : `ש ${product.price || 89}`}
                    </span>
                    <span className="add-to-cart">
                      <RippleButton 
                        rippleColor="#29D967"
                        className="txt bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 px-4 py-2 rounded-lg text-white font-bold text-xs uppercase tracking-wider"
                      >
                        הוסף לעגלה
                      </RippleButton>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.1)'}}>
              למה לבחור במכון הניג?
          </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto leading-relaxed">
              מעל 20 שנות ניסיון בטיפולים טבעיים עם אלפי לקוחות מרוצים ותוצאות מוכחות
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Quality */}
            <div className="group relative transition-all duration-300 hover:scale-105">
              <div className="relative overflow-hidden h-full bg-white rounded-2xl border-2 border-primary-300 group-hover:border-secondary-400 transition-all duration-300 shadow-lg group-hover:shadow-xl p-8 text-center">
                {/* Glass background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/90 to-secondary-50/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with leaf shape */}
                  <div className="w-20 h-20 mx-auto mb-6 bg-white border-2 border-primary-500 text-primary-600 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:border-secondary-500 group-hover:text-secondary-600 transition-all duration-300" 
                       style={{borderRadius: '30px 0 30px 0'}}>
                    <CheckCircleIcon className="w-10 h-10" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-primary-800 mb-4 group-hover:text-secondary-700 transition-colors">
                    איכות מוכחת
                  </h3>
                  <p className="text-primary-700 text-lg leading-relaxed">
                    כל המוצרים עוברים בקרת איכות קפדנית ובדיקות מעבדה מתקדמות לביטחון מלא
                  </p>
                  
                  {/* Decorative element */}
                  <div className="mt-6 w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Card 2 - Professional Support */}
            <div className="group relative transition-all duration-300 hover:scale-105">
              <div className="relative overflow-hidden h-full bg-white rounded-2xl border-2 border-primary-300 group-hover:border-secondary-400 transition-all duration-300 shadow-lg group-hover:shadow-xl p-8 text-center">
                {/* Glass background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/90 to-secondary-50/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with leaf shape */}
                  <div className="w-20 h-20 mx-auto mb-6 bg-white border-2 border-primary-500 text-primary-600 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:border-secondary-500 group-hover:text-secondary-600 transition-all duration-300" 
                       style={{borderRadius: '30px 0 30px 0'}}>
                    <ShieldCheckIcon className="w-10 h-10" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-primary-800 mb-4 group-hover:text-secondary-700 transition-colors">
                    ליווי מקצועי
                  </h3>
                  <p className="text-primary-700 text-lg leading-relaxed">
                    צוות מומחים מנוסים מלווה אתכם בבחירת המוצרים המתאימים ומספק ייעוץ אישי
                  </p>
                  
                  {/* Decorative element */}
                  <div className="mt-6 w-16 h-1 bg-gradient-to-r from-secondary-500 to-primary-500 mx-auto rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Card 3 - Fast Delivery */}
            <div className="group relative transition-all duration-300 hover:scale-105">
              <div className="relative overflow-hidden h-full bg-white rounded-2xl border-2 border-primary-300 group-hover:border-secondary-400 transition-all duration-300 shadow-lg group-hover:shadow-xl p-8 text-center">
                {/* Glass background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/90 to-secondary-50/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with leaf shape */}
                  <div className="w-20 h-20 mx-auto mb-6 bg-white border-2 border-primary-500 text-primary-600 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:border-secondary-500 group-hover:text-secondary-600 transition-all duration-300" 
                       style={{borderRadius: '30px 0 30px 0'}}>
                    <TruckIcon className="w-10 h-10" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-primary-800 mb-4 group-hover:text-secondary-700 transition-colors">
                    משלוח מהיר
                  </h3>
                  <p className="text-primary-700 text-lg leading-relaxed">
                    משלוח מהיר לכל הארץ תוך 24-48 שעות עם אפשרות איסוף עצמי נוח
                  </p>
                  
                  {/* Decorative element */}
                  <div className="mt-6 w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}