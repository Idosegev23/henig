'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { RippleButton } from '@/components/magicui/ripple-button'
import { formatPrice } from '@/lib/utils'
import { ProductsService } from '@/lib/services/products'
import { CategoriesService } from '@/lib/services/categories'
import { useCart } from '@/contexts/CartContext'
import { 
  FunnelIcon, 
  MagnifyingGlassIcon,
  StarIcon,
  ShoppingCartIcon 
} from '@heroicons/react/24/outline'

// Metadata will be handled by layout or metadata API

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

// טקסטים דינמיים לקטגוריות
const categoryDescriptions = {
  '': {
    title: 'כל המוצרים שלנו',
    description: 'גלו את מגוון המוצרים הטבעיים האיכותיים שלנו לטיפול יעיל ובטוח בבעיות עיכול. כל מוצר פותח בקפידה על בסיס מחקר מדעי ומסורת טבעית.',
    icon: '🌿',
    color: 'from-primary-600 to-secondary-600'
  },
  'heartburn': {
    title: 'פתרונות לצרבת ורפלוקס',
    description: 'מוצרים טבעיים ויעילים לטיפול בצרבת, רפלוקס ותחושת שריפה בחזה. פורמולות מתקדמות שמספקות הקלה מהירה וטווח ארוך.',
    icon: '🔥',
    color: 'from-red-500 to-orange-500'
  },
  'ibs': {
    title: 'פתרונות למעי רגיש',
    description: 'טיפולים טבעיים לתסמונת המעי הרגיש (IBS) - הקלה מכאבי בטן, נפיחות, שלשולים וקשיים. נוסחות מיוחדות לאיזון מערכת העיכול.',
    icon: '🤲',
    color: 'from-blue-500 to-teal-500'
  },
  'candida': {
    title: 'מאבק בקנדידה ופטריות',
    description: 'מוצרים מתקדמים למאבק יעיל בקנדידה ופטריות במערכת העיכול. פורמולות טבעיות שמחזירות את האיזון הטבעי של הגוף.',
    icon: '⚔️',
    color: 'from-purple-500 to-pink-500'
  },
  'inflammation': {
    title: 'טיפול בדלקות במעיים',
    description: 'פתרונות טבעיים לטיפול בדלקות במערכת העיכול. מוצרים המכילים חומרים אנטי-דלקתיים טבעיים לריפוי ושיקום.',
    icon: '🩹',
    color: 'from-green-500 to-emerald-500'
  },
  'probiotics': {
    title: 'פרוביוטיקה איכותית',
    description: 'פרוביוטיקה מתקדמת לשיקום וחיזוק מערכת העיכול. מיליארדי חיידקים טובים המסייעים לבריאות המעיים והחיסון.',
    icon: '🦠',
    color: 'from-indigo-500 to-blue-500'
  },
  'detox': {
    title: 'ניקוי וטיהור מערכת העיכול',
    description: 'מוצרי דיטוקס עדינים ויעילים לניקוי מערכת העיכול מרעלים וחומרים מזיקים. תהליך טיהור טבעי ובטוח.',
    icon: '✨',
    color: 'from-yellow-500 to-amber-500'
  }
}

function ProductsPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addItem, openCart } = useCart()
  const [products, setProducts] = useState<typeof mockProducts>(mockProducts)
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'featured')
  const [inStockOnly, setInStockOnly] = useState(searchParams.get('inStock') === 'true')

  // קבלת התיאור הדינמי לקטגוריה הנבחרת
  const categoryInfo = categoryDescriptions[selectedCategory as keyof typeof categoryDescriptions] || categoryDescriptions['']

  // פונקציה כללית לעדכון פרמטרים
  const updateSearchParams = (updates: { [key: string]: string | null }) => {
    const params = new URLSearchParams(searchParams)
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    
    router.push(`/products?${params.toString()}`)
  }

  // פונקציה לשינוי קטגוריה
  const handleCategoryChange = (categoryValue: string) => {
    updateSearchParams({ category: categoryValue || null })
  }

  // פונקציה לחיפוש
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    updateSearchParams({ search: term || null })
  }

  // פונקציה לפילטר מחירים
  const handlePriceFilter = () => {
    updateSearchParams({ 
      minPrice: minPrice || null, 
      maxPrice: maxPrice || null 
    })
  }

  // פונקציה למיון
  const handleSort = (sortValue: string) => {
    setSortBy(sortValue)
    updateSearchParams({ sortBy: sortValue })
  }

  // פונקציה לפילטר מלאי
  const handleStockFilter = (checked: boolean) => {
    setInStockOnly(checked)
    updateSearchParams({ inStock: checked ? 'true' : null })
  }

  // פונקציה לקבלת שם הקטגוריה
  const getCategoryName = (categoryValue: string) => {
    const categoryMap: { [key: string]: string } = {
      'heartburn': 'צרבת',
      'ibs': 'מעי רגיש',
      'candida': 'קנדידה',
      'inflammation': 'דלקות',
      'probiotics': 'פרוביוטיקה',
      'detox': 'ניקוי'
    }
    return categoryMap[categoryValue] || ''
  }

  // פונקציה לפילטור ומיון המוצרים
  const filterAndSortProducts = () => {
    let filtered = [...mockProducts]

    // פילטור לפי קטגוריה
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category.name.includes(getCategoryName(selectedCategory))
      )
    }

    // פילטור לפי חיפוש
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.short_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // פילטור לפי מחיר
    if (minPrice) {
      filtered = filtered.filter(product => 
        (product.sale_price || product.price) >= Number(minPrice)
      )
    }
    if (maxPrice) {
      filtered = filtered.filter(product => 
        (product.sale_price || product.price) <= Number(maxPrice)
      )
    }

    // פילטור לפי מלאי
    if (inStockOnly) {
      filtered = filtered.filter(product => product.in_stock)
    }

    // מיון
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price))
        break
      case 'price-high':
        filtered.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price))
        break
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'newest':
        // אין לנו תאריך יצירה אמיתי, אז נמיין לפי ID
        filtered.sort((a, b) => Number(b.id) - Number(a.id))
        break
      case 'featured':
      default:
        filtered.sort((a, b) => Number(b.is_featured) - Number(a.is_featured))
        break
    }

    setProducts(filtered)
  }

  useEffect(() => {
    // עדכון state מ-URL parameters
    setSelectedCategory(searchParams.get('category') || '')
    setSearchTerm(searchParams.get('search') || '')
    setMinPrice(searchParams.get('minPrice') || '')
    setMaxPrice(searchParams.get('maxPrice') || '')
    setSortBy(searchParams.get('sortBy') || 'featured')
    setInStockOnly(searchParams.get('inStock') === 'true')
  }, [searchParams])

  useEffect(() => {
    // פילטור המוצרים כשהפרמטרים משתנים
    filterAndSortProducts()
  }, [selectedCategory, searchTerm, minPrice, maxPrice, sortBy, inStockOnly])

  // פונקציה להוספה לעגלה
  const handleAddToCart = (product: typeof mockProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      sale_price: product.sale_price,
      image: (product.images as string[])?.[0] || '/placeholder-product.jpg',
      slug: product.slug,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      stock_quantity: (product as any).stock_quantity || 999,
    })
    openCart()
  }

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

      {/* Dynamic Category Section */}
      {selectedCategory && (
        <div className="bg-white border-b-2 border-primary-100">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${categoryInfo.color} mb-6 shadow-lg`}>
                <span className="text-3xl">{categoryInfo.icon}</span>
              </div>
              <h2 className="text-3xl font-bold text-primary-800 mb-4" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.1)'}}>
                {categoryInfo.title}
              </h2>
              <p className="text-lg text-primary-600 max-w-4xl mx-auto leading-relaxed">
                {categoryInfo.description}
              </p>
              <div className="mt-6">
                <div className={`h-1 w-32 bg-gradient-to-r ${categoryInfo.color} mx-auto rounded-full`}></div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
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
                  <label key={category.value} className="flex items-center group cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={selectedCategory === category.value}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-2 border-primary-300 group-hover:border-secondary-400 transition-colors"
                    />
                    <span className="mr-3 text-sm text-primary-700 group-hover:text-secondary-600 font-medium transition-colors">
                      {category.name} <span className="text-primary-500">({category.count})</span>
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
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="מחיר מינימלי"
                    className="w-full rounded-lg border-2 border-primary-300 py-2 px-3 text-sm text-primary-800 placeholder-primary-400 focus:border-secondary-500 focus:ring-secondary-500 focus:outline-none transition-colors"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="מחיר מקסימלי"
                    className="w-full rounded-lg border-2 border-primary-300 py-2 px-3 text-sm text-primary-800 placeholder-primary-400 focus:border-secondary-500 focus:ring-secondary-500 focus:outline-none transition-colors"
                  />
                </div>
                <Button 
                  onClick={handlePriceFilter}
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
                  checked={inStockOnly}
                  onChange={(e) => handleStockFilter(e.target.checked)}
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
                מציג <span className="text-secondary-600">{products.length}</span> מתוך <span className="text-secondary-600">{mockProducts.length}</span> מוצרים
              </p>
              <div className="flex items-center gap-4">
                <select 
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="rounded-lg border-2 border-primary-300 py-2 px-4 text-sm text-primary-800 focus:border-secondary-500 focus:ring-secondary-500 focus:outline-none transition-colors bg-white"
                >
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
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-primary-100 rounded-2xl h-64 mb-4"></div>
                    <div className="bg-primary-100 rounded h-4 mb-2"></div>
                    <div className="bg-primary-100 rounded h-4 w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-primary-800 mb-2">לא נמצאו מוצרים</h3>
                <p className="text-primary-600 mb-4">נסו לשנות את הפילטרים או החיפוש</p>
                <Button 
                  onClick={() => {
                    setSelectedCategory('')
                    setSearchTerm('')
                    setMinPrice('')
                    setMaxPrice('')
                    setInStockOnly(false)
                    router.push('/products')
                  }}
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white"
                >
                  נקה פילטרים
                </Button>
              </div>
            ) : (
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
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(product as any).stock_quantity === 0 && (
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
                        <span className="p-company">{product.category?.name || 'מוצר טבעי'}</span>
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

                    <div className="cart">
                      <Link href={`/products/${product.slug}`} className="price">
                        {product.sale_price ? (
                          <>
                            ₪{product.sale_price}
                            <span className="text-xs line-through text-primary-400 block">₪{product.price}</span>
                          </>
                        ) : (
                          `₪${product.price}`
                        )}
                      </Link>
                      <span className="add-to-cart">
                        <RippleButton 
                          rippleColor="#29D967"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleAddToCart(product)
                          }}
                          className="txt bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 px-4 py-2 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300"
                          style={{borderRadius: '20px 0 20px 0'}}
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          disabled={(product as any).stock_quantity === 0}
                        >
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {(product as any).stock_quantity === 0 ? 'אזל מהמלאי' : 'הוסף לעגלה'}
                        </RippleButton>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}

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

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  )
}
