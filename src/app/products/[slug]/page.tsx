'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import {
  StarIcon,
  ShoppingCartIcon,
  HeartIcon,
  ShareIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

// Mock data - יוחלף בנתונים אמיתיים
const mockProduct = {
  id: '1',
  name: 'פורמולת הניג לצרבת',
  slug: 'henig-heartburn-formula',
  description: `פורמולת הניג לצרבת היא פתרון טבעי מתקדם שפותח במיוחד לטיפול יעיל בצרבת, רפלוקס ובעיות עיכול נוספות. 

הנוסחה מבוססת על שנים של מחקר ופיתוח במכון הניג, ומשלבת רכיבים טבעיים איכותיים שהוכחו כיעילים בטיפול בבעיות עיכול.

המוצר מכיל תמצית עשבי תיבול ייחודית המסייעת לנטרול עודפי חומצה, להרגעת הקיבה ולשיקום רירית הקיבה והוושט. הנוסחה פועלת בצורה עדינה וטבעית, ללא תופעות לוואי.`,
  short_description: 'פתרון טבעי יעיל לצרבת ורפלוקס עם תוצאות מהירות',
  price: 89,
  sale_price: 79,
  sku: 'HEN-HEART-001',
  stock_quantity: 25,
  images: [
    '/placeholder-product.jpg',
    '/placeholder-product-2.jpg',
    '/placeholder-product-3.jpg',
  ],
  category: { name: 'טיפול בצרבת', slug: 'heartburn' },
  ingredients: [
    'תמצית שורש ליקוריץ',
    'תמצית עלי אלוורה',
    'קמומיל',
    'עשב לימון',
    'ג\'ינג\'ר',
    'קלציום קרבונט טבעי',
  ],
  medical_warnings: 'לא מומלץ לנשים הרות ומניקות. יש להתייעץ עם רופא לפני השימוש אם אתם נטלים תרופות.',
  usage_instructions: 'קחו כפית אחת 3 פעמים ביום, 30 דקות לפני האוכל. ניתן לערבב בכוס מים או לקחת ישירות.',
  rating: 4.8,
  reviews_count: 156,
  is_featured: true,
  benefits: [
    'הקלה מיידית על צרבת',
    'נטרול עודפי חומצת קיבה',
    'הרגעת רירית הקיבה',
    'שיפור העיכול הכללי',
    'מניעת רפלוקס',
    'ללא תופעות לוואי',
  ]
}

const mockReviews = [
  {
    id: '1',
    user_name: 'שרה כהן',
    rating: 5,
    date: '2025-01-15',
    title: 'מוצר פלא!',
    content: 'סבלתי מצרבת כרונית שנים רבות. אחרי שבועיים של שימוש במוצר הזה, הצרבת נעלמה כמעט לחלוטין. ממליצה בחום!',
    verified_purchase: true,
  },
  {
    id: '2',
    user_name: 'דוד לוי',
    rating: 4,
    date: '2025-01-10',
    title: 'עובד טוב',
    content: 'המוצר עזר לי הרבה עם הרפלוקס. הטעם נעים והתוצאות מורגשות כבר אחרי כמה ימים.',
    verified_purchase: true,
  },
  {
    id: '3',
    user_name: 'מירי אברהם',
    rating: 5,
    date: '2025-01-05',
    title: 'הפתרון שחיפשתי',
    content: 'אחרי שנסיתי המון דברים, סוף סוף מצאתי משהו שעובד. הצרבת פחתה משמעותית והתחושה הכללית השתפרה.',
    verified_purchase: false,
  },
]

const relatedProducts = [
  {
    id: '2',
    name: 'קומפלקס למעי רגיש',
    slug: 'ibs-complex',
    price: 95,
    image: '/placeholder-product.jpg',
    rating: 4.6,
  },
  {
    id: '4',
    name: 'נוסחת אנטי דלקתית',
    slug: 'anti-inflammatory-formula',
    price: 110,
    image: '/placeholder-product.jpg',
    rating: 4.7,
  },
]

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [isFavorite, setIsFavorite] = useState(false)

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} of product ${mockProduct.id} to cart`)
  }

  const handleBuyNow = () => {
    // Buy now logic here
    console.log(`Buy now ${quantity} of product ${mockProduct.id}`)
  }

  return (
    <div className="hebrew-text">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 space-x-reverse text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-primary-600">
                בית
              </Link>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              <Link href="/products" className="text-gray-500 hover:text-primary-600">
                מוצרים
              </Link>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              <Link href={`/products?category=${mockProduct.category.slug}`} className="text-gray-500 hover:text-primary-600">
                {mockProduct.category.name}
              </Link>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li className="text-gray-900 font-medium">{mockProduct.name}</li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src={mockProduct.images[selectedImage]}
                alt={mockProduct.name}
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImage === index ? 'border-primary-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${mockProduct.name} ${index + 1}`}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-8 lg:mt-0">
            <div className="mb-4">
              <span className="text-sm text-primary-600 font-medium">
                {mockProduct.category.name}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {mockProduct.name}
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              {mockProduct.short_description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarSolidIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(mockProduct.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {mockProduct.rating} ({mockProduct.reviews_count} ביקורות)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              {mockProduct.sale_price ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-primary-600">
                    {formatPrice(mockProduct.sale_price)}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(mockProduct.price)}
                  </span>
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                    חיסכון {formatPrice(mockProduct.price - mockProduct.sale_price)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-primary-600">
                  {formatPrice(mockProduct.price)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {mockProduct.stock_quantity > 0 ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircleIcon className="h-5 w-5" />
                  <span>במלאי ({mockProduct.stock_quantity} יחידות)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <ExclamationTriangleIcon className="h-5 w-5" />
                  <span>אזל מהמלאי</span>
                </div>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="font-medium text-gray-900">
                  כמות:
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={mockProduct.stock_quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 px-2 py-2 text-center border-0 focus:ring-0"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(mockProduct.stock_quantity, quantity + 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={mockProduct.stock_quantity === 0}
                  className="flex-1 flex items-center justify-center gap-2"
                  size="lg"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  הוסף לעגלה
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={mockProduct.stock_quantity === 0}
                  variant="secondary"
                  className="flex-1"
                  size="lg"
                >
                  קנה עכשיו
                </Button>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex items-center gap-2 text-gray-600 hover:text-primary-600"
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5" />
                  )}
                  הוסף למועדפים
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
                  <ShareIcon className="h-5 w-5" />
                  שתף
                </button>
              </div>
            </div>

            {/* Product Benefits */}
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">יתרונות המוצר:</h3>
              <ul className="space-y-2">
                {mockProduct.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircleIcon className="h-4 w-4 text-primary-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 space-x-reverse">
              {[
                { id: 'description', name: 'תיאור מפורט' },
                { id: 'ingredients', name: 'רכיבים' },
                { id: 'usage', name: 'אופן השימוש' },
                { id: 'reviews', name: `ביקורות (${mockProduct.reviews_count})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose prose-lg max-w-none hebrew-text">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {mockProduct.description}
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">רכיבי המוצר:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {mockProduct.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary-500 rounded-full"></div>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
                {mockProduct.medical_warnings && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">אזהרות ואמצעי זהירות:</h4>
                        <p className="text-yellow-700 text-sm mt-1">{mockProduct.medical_warnings}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'usage' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">אופן השימוש:</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <InformationCircleIcon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-blue-800">{mockProduct.usage_instructions}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-medium">
                            {review.user_name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{review.user_name}</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <StarSolidIcon
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            {review.verified_purchase && (
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                                רכישה מאומתת
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString('he-IL')}
                      </span>
                    </div>
                    <div className="mt-4">
                      <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                      <p className="text-gray-700">{review.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">מוצרים קשורים</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600">
                      {formatPrice(product.price)}
                    </span>
                    <div className="flex items-center">
                      <StarSolidIcon className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-gray-600 mr-1">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
