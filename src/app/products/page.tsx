import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { RippleButton } from '@/components/magicui/ripple-button'
import { formatPrice } from '@/lib/utils'
import { ProductsService } from '@/lib/services/products'
import { CategoriesService } from '@/lib/services/categories'
import { 
  FunnelIcon, 
  MagnifyingGlassIcon,
  StarIcon,
  ShoppingCartIcon 
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'מוצרים שלנו - מוצרים טבעיים איכותיים | מכון הניג',
  description: 'גלו את מגוון המוצרים הטבעיים האיכותיים שלנו לטיפול בבעיות עיכול - צרבת, מעי רגיש, קנדידה ועוד',
  keywords: 'מוצרים טבעיים, מכון הניג, בעיות עיכול, צרבת, מעי רגיש, קנדידה, טיפול טבעי',
}

// Mock data - יוחלף בנתונים אמיתיים מהדאטאבייס
const mockProducts = [
  {
    id: '1',
    name: 'פורמולת הניג לצרבת',
    slug: 'henig-heartburn-formula',
    short_description: 'פתרון טבעי יעיל לצרבת ורפלוקס עם תוצאות מהירות',
    price: 89,
    sale_price: 79,
    images: ['/placeholder-product.jpg'],
    category: { name: 'טיפול בצרבת' },
    rating: 4.8,
    reviews_count: 156,
    is_featured: true,
    in_stock: true,
  },
  {
    id: '2',
    name: 'קומפלקס למעי רגיש',
    slug: 'ibs-complex',
    short_description: 'נוסחה מתקדמת לטיפול בתסמונת המעי הרגיש',
    price: 95,
    images: ['/placeholder-product.jpg'],
    category: { name: 'מעי רגיש' },
    rating: 4.6,
    reviews_count: 89,
    is_featured: false,
    in_stock: true,
  },
  {
    id: '3',
    name: 'אנטי קנדידה פלוס',
    slug: 'anti-candida-plus',
    short_description: 'מוצר טבעי למאבק יעיל בקנדידה ופטריות',
    price: 120,
    sale_price: 99,
    images: ['/placeholder-product.jpg'],
    category: { name: 'קנדידה' },
    rating: 4.9,
    reviews_count: 203,
    is_featured: true,
    in_stock: false,
  },
  {
    id: '4',
    name: 'נוסחת אנטי דלקתית',
    slug: 'anti-inflammatory-formula',
    short_description: 'טיפול טבעי בדלקות במעיים ובמערכת העיכול',
    price: 110,
    images: ['/placeholder-product.jpg'],
    category: { name: 'דלקות במעיים' },
    rating: 4.7,
    reviews_count: 124,
    is_featured: false,
    in_stock: true,
  },
  {
    id: '5',
    name: 'פרוביוטיקה מתקדמת',
    slug: 'advanced-probiotics',
    short_description: 'פרוביוטיקה איכותית לשיקום מערכת העיכול',
    price: 75,
    images: ['/placeholder-product.jpg'],
    category: { name: 'פרוביוטיקה' },
    rating: 4.5,
    reviews_count: 67,
    is_featured: false,
    in_stock: true,
  },
  {
    id: '6',
    name: 'דיטוקס עיכולי',
    slug: 'digestive-detox',
    short_description: 'ניקוי עדין ויעיל של מערכת העיכול',
    price: 85,
    images: ['/placeholder-product.jpg'],
    category: { name: 'ניקוי רעלים' },
    rating: 4.4,
    reviews_count: 45,
    is_featured: false,
    in_stock: true,
  },
]

const categories = [
  { name: 'הכל', value: '', count: 6 },
  { name: 'טיפול בצרבת', value: 'heartburn', count: 1 },
  { name: 'מעי רגיש', value: 'ibs', count: 1 },
  { name: 'קנדידה', value: 'candida', count: 1 },
  { name: 'דלקות במעיים', value: 'inflammation', count: 1 },
  { name: 'פרוביוטיקה', value: 'probiotics', count: 1 },
  { name: 'ניקוי רעלים', value: 'detox', count: 1 },
]

export default async function ProductsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const productsService = new ProductsService()
  const categoriesService = new CategoriesService()

  // Parse search parameters
  const filters = {
    category: searchParams.category as string,
    search: searchParams.search as string,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    inStock: searchParams.inStock === 'true',
    sortBy: (['name', 'price', 'rating', 'created_at'].includes(searchParams.sortBy as string) 
      ? searchParams.sortBy as 'name' | 'price' | 'rating' | 'created_at' 
      : 'created_at'),
    sortOrder: (searchParams.sortOrder as 'asc' | 'desc') || 'desc',
    page: searchParams.page ? Number(searchParams.page) : 1,
  }

  // Fetch data
  const [productsResult, categories] = await Promise.all([
    productsService.getProducts(filters),
    categoriesService.getCategories(),
  ])

  const { data: products, count, totalPages } = productsResult

  return (
    <div className="hebrew-text">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary-800 sm:text-5xl mb-6" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.1)'}}>
              המוצרים שלנו
            </h1>
            <p className="mt-4 text-xl text-primary-700 max-w-3xl mx-auto leading-relaxed">
              גלו את מגוון המוצרים הטבעיים האיכותיים שלנו לטיפול יעיל ובטוח בבעיות עיכול
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-primary-50 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 space-y-6">
            {/* Search */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-primary-200">
              <label htmlFor="search" className="block text-lg font-semibold text-primary-800 mb-3">
                חיפוש מוצרים
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
                <input
                  type="text"
                  id="search"
                  placeholder="חפשו מוצר..."
                  className="w-full rounded-lg border-2 border-primary-300 py-3 pl-12 pr-4 text-sm text-primary-800 placeholder-primary-400 focus:border-secondary-500 focus:ring-secondary-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Categories Filter */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-primary-200">
              <h3 className="text-lg font-semibold text-primary-800 mb-4">קטגוריות</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center group cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category.slug}
                      className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-2 border-primary-300 group-hover:border-secondary-400 transition-colors"
                      defaultChecked={category.slug === ''}
                    />
                    <span className="mr-3 text-sm text-primary-700 group-hover:text-secondary-600 font-medium transition-colors">
                      {category.name} <span className="text-primary-500">({category.products_count || 0})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-primary-200">
              <h3 className="text-lg font-semibold text-primary-800 mb-4">טווח מחירים</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="מחיר מינימלי"
                    className="w-full rounded-lg border-2 border-primary-300 py-2 px-3 text-sm text-primary-800 placeholder-primary-400 focus:border-secondary-500 focus:ring-secondary-500 focus:outline-none transition-colors"
                  />
                  <input
                    type="number"
                    placeholder="מחיר מקסימלי"
                    className="w-full rounded-lg border-2 border-primary-300 py-2 px-3 text-sm text-primary-800 placeholder-primary-400 focus:border-secondary-500 focus:ring-secondary-500 focus:outline-none transition-colors"
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:border-secondary-500 hover:text-secondary-600 transition-all duration-300"
                >
                  החל מסנן
                </Button>
              </div>
            </div>

            {/* Stock Filter */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-primary-200">
              <h3 className="text-lg font-semibold text-primary-800 mb-4">זמינות</h3>
              <label className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-2 border-primary-300 rounded group-hover:border-secondary-400 transition-colors"
                />
                <span className="mr-3 text-sm text-primary-700 group-hover:text-secondary-600 font-medium transition-colors">רק מוצרים זמינים</span>
              </label>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort & View Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-lg border-2 border-primary-200">
              <p className="text-lg font-semibold text-primary-800">
                מציג <span className="text-secondary-600">{products.length}</span> מתוך <span className="text-secondary-600">{count}</span> מוצרים
              </p>
              <div className="flex items-center gap-4">
                <select className="rounded-lg border-2 border-primary-300 py-2 px-4 text-sm text-primary-800 focus:border-secondary-500 focus:ring-secondary-500 focus:outline-none transition-colors bg-white">
                  <option value="featured">מומלצים</option>
                  <option value="price-low">מחיר נמוך לגבוה</option>
                  <option value="price-high">מחיר גבוה לנמוך</option>
                  <option value="newest">חדשים ביותר</option>
                  <option value="rating">דירוג הגבוה ביותר</option>
                </select>
                <div className="flex items-center gap-2 text-primary-600">
                  <FunnelIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">מיון</span>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="el-wrapper group">
                  {/* Top Section - Image */}
                  <div className="box-up">
                    <Image
                      src={(product.images as string[])?.[0] || 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500'}
                      alt={product.name}
                      fill
                      className="img object-cover"
                    />
                    
                    {/* Sale Badge */}
                    {product.sale_price && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-secondary-500 to-accent-500 text-white text-xs font-bold px-3 py-1 shadow-lg"
                           style={{borderRadius: '15px 0 15px 0'}}>
                        חסכו ₪{product.price - product.sale_price}
                      </div>
                    )}
                    
                    {/* Out of Stock Overlay */}
                    {product.stock_quantity === 0 && (
                      <div className="absolute inset-0 bg-primary-800/70 flex items-center justify-center">
                        <span className="bg-white text-primary-800 px-4 py-2 font-bold shadow-xl"
                              style={{borderRadius: '20px 0 20px 0'}}>
                          אזל מהמלאי
                        </span>
                      </div>
                    )}
                    
                    <div className="img-info">
                      <div className="info-inner">
                        <span className="p-name">{product.name}</span>
                        <span className="p-company">{product.categories?.name || 'מוצר טבעי'}</span>
                      </div>
                      <div className="a-size">
                        דירוג: <span className="size">{product.rating || 4.5} ⭐</span> ({product.reviews_count || 0} ביקורות)
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section - Price & Cart */}
                  <div className="box-down">
                    <div className="h-bg">
                      <div className="h-bg-inner"></div>
                    </div>

                    <Link href={`/products/${product.slug}`} className="cart">
                      <span className="price">
                        {product.sale_price ? (
                          <>
                            ₪{product.sale_price}
                            <span className="text-xs line-through text-primary-400 block">₪{product.price}</span>
                          </>
                        ) : (
                          `₪${product.price}`
                        )}
                      </span>
                      <span className="add-to-cart">
                        <RippleButton 
                          rippleColor="#29D967"
                          className="txt bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 px-4 py-2 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300"
                          style={{borderRadius: '20px 0 20px 0'}}
                          disabled={product.stock_quantity === 0}
                        >
                          {product.stock_quantity === 0 ? 'אזל מהמלאי' : 'הוסף לעגלה'}
                        </RippleButton>
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex justify-center">
              <nav className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-lg border-2 border-primary-200">
                <RippleButton
                  rippleColor="#29D967"
                  disabled
                  className="px-4 py-2 text-sm font-medium text-primary-400 bg-primary-50 border-2 border-primary-200 cursor-not-allowed"
                  style={{borderRadius: '15px 0 15px 0'}}
                >
                  הקודם
                </RippleButton>
                <RippleButton
                  rippleColor="#29D967"
                  className="px-4 py-2 text-sm font-medium text-primary-800 bg-gradient-to-r from-secondary-200 to-secondary-300 border-2 border-secondary-400 shadow-lg"
                  style={{borderRadius: '15px 0 15px 0'}}
                >
                  1
                </RippleButton>
                <RippleButton
                  rippleColor="#29D967"
                  className="px-4 py-2 text-sm font-medium text-primary-600 bg-white border-2 border-primary-300 hover:bg-primary-50 hover:border-secondary-400 transition-all duration-300"
                  style={{borderRadius: '15px 0 15px 0'}}
                >
                  2
                </RippleButton>
                <RippleButton
                  rippleColor="#29D967"
                  className="px-4 py-2 text-sm font-medium text-primary-600 bg-white border-2 border-primary-300 hover:bg-primary-50 hover:border-secondary-400 transition-all duration-300"
                  style={{borderRadius: '15px 0 15px 0'}}
                >
                  3
                </RippleButton>
                <RippleButton
                  rippleColor="#29D967"
                  className="px-4 py-2 text-sm font-medium text-primary-600 bg-white border-2 border-primary-300 hover:bg-primary-50 hover:border-secondary-400 transition-all duration-300"
                  style={{borderRadius: '15px 0 15px 0'}}
                >
                  הבא
                </RippleButton>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
