// User Types
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: 'customer' | 'admin' | 'super_admin'
  created_at: string
  updated_at: string
}

// Product Types
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  parent_id?: string
  sort_order: number
  is_active: boolean
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  short_description?: string
  price: number
  sale_price?: number
  sku?: string
  stock_quantity: number
  manage_stock: boolean
  category_id: string
  category?: Category
  images: string[]
  ingredients?: string[]
  medical_warnings?: string
  usage_instructions?: string
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

// Cart Types
export interface CartItem {
  id: string
  product_id: string
  product: Product
  quantity: number
  unit_price: number
  total_price: number
}

export interface Cart {
  items: CartItem[]
  total_items: number
  total_amount: number
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  final_amount: number
}

// Order Types
export interface Order {
  id: string
  user_id: string
  user?: User
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total_amount: number
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  payment_method?: string
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  shipping_address: Address
  billing_address: Address
  notes?: string
  items: OrderItem[]
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product: Product
  quantity: number
  unit_price: number
  total_price: number
}

export interface Address {
  first_name: string
  last_name: string
  company?: string
  address_line_1: string
  address_line_2?: string
  city: string
  postal_code: string
  country: string
  phone?: string
}

// Course Types
export interface Course {
  id: string
  title: string
  slug: string
  description: string
  short_description?: string
  price: number
  duration_hours?: number
  level: 'beginner' | 'intermediate' | 'advanced'
  thumbnail_url?: string
  trailer_url?: string
  is_featured: boolean
  is_active: boolean
  lessons: CourseLesson[]
  created_at: string
  updated_at: string
}

export interface CourseLesson {
  id: string
  course_id: string
  title: string
  description?: string
  video_url?: string
  duration_minutes?: number
  sort_order: number
  is_free: boolean
  resources: Resource[]
}

export interface Resource {
  id: string
  name: string
  type: 'pdf' | 'video' | 'audio' | 'link'
  url: string
  size?: number
}

export interface CourseEnrollment {
  id: string
  user_id: string
  course_id: string
  course: Course
  progress: number
  completed_at?: string
  enrolled_at: string
}

export interface LessonProgress {
  id: string
  user_id: string
  lesson_id: string
  lesson: CourseLesson
  completed: boolean
  watched_duration: number
  completed_at?: string
}

// Diagnostic Types
export interface DiagnosticQuestion {
  id: string
  question: string
  question_type: 'multiple_choice' | 'single_choice' | 'scale' | 'text'
  options?: string[]
  category: string
  weight: number
  sort_order: number
  is_active: boolean
}

export interface DiagnosticAnswer {
  question_id: string
  answer: string | string[] | number
}

export interface UserDiagnostic {
  id: string
  user_id: string
  answers: DiagnosticAnswer[]
  recommendations: ProductRecommendation[]
  completed_at: string
}

export interface ProductRecommendation {
  product_id: string
  product: Product
  score: number
  reason: string
}

// API Response Types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    per_page: number
    total: number
    total_pages: number
  }
}

// Form Types
export interface ContactForm {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface NewsletterForm {
  email: string
  name?: string
}

// Filter Types
export interface ProductFilters {
  category?: string
  min_price?: number
  max_price?: number
  in_stock?: boolean
  featured?: boolean
  search?: string
}
