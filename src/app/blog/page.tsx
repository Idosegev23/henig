import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { RippleButton } from "@/components/magicui/ripple-button"
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  ArrowLeftIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'בלוג מכון הניג - מאמרים מקצועיים על טיפולים טבעיים',
  description: 'מאמרים מקצועיים, מחקרים ועדכונים בתחום הטיפולים הטבעיים לבעיות עיכול. תוכן איכותי ומבוסס מדע.',
  keywords: 'בלוג, מאמרים, טיפולים טבעיים, בעיות עיכול, מחקרים, בריאות',
}

// Mock blog posts data - יוחלף בנתונים אמיתיים מהדאטאבייס
const featuredPost = {
  id: '1',
  title: 'המדריך המקיף לטיפול טבעי בקנדידה',
  slug: 'complete-guide-candida-treatment',
  excerpt: 'גלו את השיטות המתקדמות ביותר לטיפול בקנדידה באופן טבעי ויעיל. מדריך מקיף עם פרוטוקולים מוכחים.',
  content: 'תוכן המאמר המלא יבוא כאן...',
  image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
  author: 'ד"ר רחל אברהם',
  authorImage: 'https://images.unsplash.com/photo-1594824475480-aa5c93dd7cec?w=100&h=100&fit=crop&crop=face',
  publishedAt: '2024-03-20',
  readTime: '8 דקות קריאה',
  views: 2847,
  likes: 142,
  category: 'טיפולים מיוחדים',
  tags: ['קנדידה', 'פטריות', 'טיפול טבעי']
}

const blogPosts = [
  {
    id: '2',
    title: 'חמישה מזונות שחייבים להימנע מהם במעי רגיש',
    slug: 'foods-to-avoid-ibs',
    excerpt: 'רשימת המזונות הבעייתיים ביותר לסובלים ממעי רגיש ואלטרנטיבות בריאות.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop',
    author: 'פרופ׳ משה הניג',
    authorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
    publishedAt: '2024-03-18',
    readTime: '5 דקות קריאה',
    views: 1924,
    likes: 89,
    category: 'תזונה',
    tags: ['מעי רגיש', 'תזונה', 'IBS']
  },
  {
    id: '3',
    title: 'המיקרוביום שלכם: המפתח לבריאות מושלמת',
    slug: 'microbiome-key-to-health',
    excerpt: 'הבנת המיקרוביום והשפעתו על הבריאות הכללית שלכם.',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop',
    author: 'ד"ר שרה כהן',
    authorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
    publishedAt: '2024-03-15',
    readTime: '7 דקות קריאה',
    views: 3156,
    likes: 201,
    category: 'מחקר',
    tags: ['מיקרוביום', 'פרוביוטיקה', 'בריאות']
  },
  {
    id: '4',
    title: 'פרוטוקול טיפול בהליקובקטר פילורי',
    slug: 'helicobacter-pylori-treatment',
    excerpt: 'גישה טבעית ויעילה לטיפול בהליקובקטר פילורי ללא אנטיביוטיקה.',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=250&fit=crop',
    author: 'ד"ר דוד לוי',
    authorImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face',
    publishedAt: '2024-03-12',
    readTime: '10 דקות קריאה',
    views: 2341,
    likes: 156,
    category: 'טיפולים',
    tags: ['הליקובקטר', 'טיפול טבעי', 'קיבה']
  },
  {
    id: '5',
    title: 'צרבת: הסיבות האמיתיות והפתרונות הטבעיים',
    slug: 'heartburn-causes-solutions',
    excerpt: 'מה באמת גורם לצרבת ואיך לטפל בה בצורה טבעית ויעילה.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
    author: 'פרופ׳ משה הניג',
    authorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
    publishedAt: '2024-03-10',
    readTime: '6 דקות קריאה',
    views: 1876,
    likes: 134,
    category: 'טיפולים',
    tags: ['צרבת', 'רפלוקס', 'חומצת קיבה']
  },
  {
    id: '6',
    title: 'חדשות מהמחקר: פריצת דרך בטיפול בדלקות מעיים',
    slug: 'new-research-ibd-treatment',
    excerpt: 'מחקר חדשני מראה יעילות מרשימה של צמחי מרפא בטיפול בדלקות מעיים.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
    author: 'ד"ר שרה כהן',
    authorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
    publishedAt: '2024-03-08',
    readTime: '9 דקות קריאה',
    views: 2654,
    likes: 187,
    category: 'מחקר',
    tags: ['דלקות מעיים', 'IBD', 'מחקר']
  }
]

const categories = [
  { name: 'כל הקטגוריות', slug: 'all', count: 25 },
  { name: 'טיפולים', slug: 'treatments', count: 8 },
  { name: 'תזונה', slug: 'nutrition', count: 6 },
  { name: 'מחקר', slug: 'research', count: 5 },
  { name: 'טיפולים מיוחדים', slug: 'special', count: 4 },
  { name: 'אורח חיים', slug: 'lifestyle', count: 2 }
]

export default function BlogPage() {
  return (
    <div className="hebrew-text">
      
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>
              בלוג מכון הניג
            </h1>
            <p className="text-xl mb-8 leading-relaxed" style={{textShadow: '1px 1px 6px rgba(0,0,0,0.7)'}}>
              מאמרים מקצועיים, מחקרים ועדכונים בתחום הטיפולים הטבעיים
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.slug}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  category.slug === 'all'
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-300 hover:border-primary-300'
                }`}
                style={category.slug === 'all' ? {borderRadius: '30px 0 30px 0'} : {borderRadius: '30px 0 30px 0'}}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-gradient-to-b from-white to-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-4">מאמר מומלץ</h2>
            <p className="text-primary-700 text-lg">המאמר הפופולרי ביותר השבוע</p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative aspect-video lg:aspect-square">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    מאמר מומלץ
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                      {featuredPost.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={featuredPost.authorImage}
                          alt={featuredPost.author}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{new Date(featuredPost.publishedAt).toLocaleDateString('he-IL')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-6 mb-8 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <EyeIcon className="w-4 h-4" />
                      <span>{featuredPost.views.toLocaleString()} צפיות</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HeartIcon className="w-4 h-4" />
                      <span>{featuredPost.likes} לייקים</span>
                    </div>
                  </div>
                  
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <RippleButton
                      rippleColor="#29D967"
                      className="px-8 py-4 text-lg font-bold text-white shadow-2xl border-2 transition-all duration-300"
                      style={{
                        borderRadius: '50px 0 50px 0',
                        background: 'linear-gradient(135deg, #027333 0%, #29D967 100%)',
                        borderColor: '#027333'
                      }}
                    >
                      <span className="flex items-center gap-2">
                        קרא את המאמר
                        <ArrowLeftIcon className="w-5 h-5" />
                      </span>
                    </RippleButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-4">מאמרים אחרונים</h2>
            <p className="text-primary-700 text-lg">עדכונים טריים מעולם הטיפולים הטבעיים</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={post.id} className="group">
                <div className="bg-white rounded-3xl shadow-lg border border-primary-200 overflow-hidden group-hover:shadow-xl transition-all duration-300 group-hover:border-secondary-300">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-primary-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {/* Author & Date */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={post.authorImage}
                          alt={post.author}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div className="text-sm text-gray-500">
                        <div>{post.author}</div>
                        <div>{new Date(post.publishedAt).toLocaleDateString('he-IL')}</div>
                      </div>
                    </div>
                    
                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <EyeIcon className="w-4 h-4" />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <HeartIcon className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link href={`/blog/${post.slug}`}>
                      <RippleButton
                        rippleColor="#027333"
                        className="w-full px-4 py-3 text-primary-600 bg-primary-50 hover:bg-primary-100 border border-primary-200 hover:border-primary-300 transition-all duration-300 font-medium"
                        style={{borderRadius: '20px 0 20px 0'}}
                      >
                        קרא עוד
                      </RippleButton>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-12">
            <RippleButton
              rippleColor="#027333"
              className="px-8 py-4 text-primary-600 bg-white border-2 border-primary-300 hover:border-secondary-400 hover:bg-primary-50 transition-all duration-300 font-bold"
              style={{borderRadius: '50px 0 50px 0'}}
            >
              טען מאמרים נוספים
            </RippleButton>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.3)'}}>
              הישארו מעודכנים
            </h2>
            <p className="text-xl mb-8" style={{textShadow: '1px 1px 6px rgba(0,0,0,0.3)'}}>
              קבלו את המאמרים החדשים ביותר והעדכונים המקצועיים ישירות למייל
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="הכנס את האימייל שלך"
                className="flex-1 px-6 py-4 rounded-2xl text-gray-900 border-2 border-white focus:ring-2 focus:ring-secondary-300 focus:border-secondary-300"
              />
              <RippleButton
                rippleColor="#29D967"
                className="px-8 py-4 text-primary-600 bg-white hover:bg-gray-50 font-bold transition-colors"
                style={{borderRadius: '25px 0 25px 0'}}
              >
                הירשם
              </RippleButton>
            </div>
            
            <p className="text-sm text-white/80 mt-4">
              * ניתן לבטל את המנוי בכל עת
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}