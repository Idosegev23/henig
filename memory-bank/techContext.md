# הקשר טכני - מכון הניג

## מחסנית טכנולוגיות מומלצת

### 🎯 Frontend Stack
```typescript
// Core Framework
Next.js 14.2+          // App Router, Server Components, Streaming
TypeScript 5.0+        // Type safety
React 18+              // Concurrent features

// Styling
Tailwind CSS 3.4+      // Utility-first CSS
Headless UI            // Accessible components
Framer Motion          // Animations
next/font              // Font optimization

// State Management
Zustand                // Simple state management
React Query/TanStack   // Server state management
React Hook Form        // Form handling with Zod validation

// UI Components
Radix UI               // Headless components
Lucide React           // Icons
React Hot Toast        // Notifications
```

### 🔧 Backend Stack
```typescript
// API & Server
Next.js API Routes     // Serverless functions
Middleware             // Authentication & rate limiting

// Database & Storage
Supabase               // PostgreSQL + Auth + Storage + Realtime
Prisma (optional)      // Type-safe database client
Redis (Upstash)        // Caching & sessions

// Authentication
NextAuth.js            // Social + email auth
Supabase Auth          // Built-in auth system

// Payments
Stripe                 // International payments
Tranzila              // Israeli market (optional)

// Email & Communications
Resend                 // Transactional emails
Twilio                 // SMS notifications
```

### 🚀 DevOps & Infrastructure
```yaml
# Hosting & Deployment
Vercel:                # Frontend hosting + serverless functions
  - Automatic deployments from Git
  - Preview deployments
  - Edge network (CDN)
  - Analytics built-in

# Database
Supabase:              # Managed PostgreSQL
  - Auto-scaling
  - Real-time subscriptions
  - Row Level Security (RLS)
  - Built-in backup

# CDN & Performance
Cloudflare:            # CDN + Security
  - Image optimization
  - DDoS protection
  - SSL certificates
  - Analytics

# Monitoring
Sentry:                # Error tracking
Vercel Analytics:      # Performance monitoring
PostHog:               # Product analytics
```

## מבנה מסד הנתונים

### 📊 Schema מומלץ
```sql
-- Users & Authentication
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  role user_role DEFAULT 'customer',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Product Management
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  sku VARCHAR(50) UNIQUE,
  stock_quantity INTEGER DEFAULT 0,
  manage_stock BOOLEAN DEFAULT true,
  category_id UUID REFERENCES categories(id),
  images JSONB DEFAULT '[]',
  ingredients TEXT[],
  medical_warnings TEXT,
  usage_instructions TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Order Management
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  status order_status DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  payment_method VARCHAR(50),
  payment_status payment_status DEFAULT 'pending',
  shipping_address JSONB,
  billing_address JSONB,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL
);

-- Course Management
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  price DECIMAL(10,2) NOT NULL,
  duration_hours INTEGER,
  level course_level DEFAULT 'beginner',
  thumbnail_url TEXT,
  trailer_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE course_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  video_url TEXT,
  duration_minutes INTEGER,
  sort_order INTEGER DEFAULT 0,
  is_free BOOLEAN DEFAULT false,
  resources JSONB DEFAULT '[]'
);

CREATE TABLE course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  course_id UUID REFERENCES courses(id),
  progress DECIMAL(3,2) DEFAULT 0.00,
  completed_at TIMESTAMP,
  enrolled_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- User Progress Tracking
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  lesson_id UUID REFERENCES course_lessons(id),
  completed BOOLEAN DEFAULT false,
  watched_duration INTEGER DEFAULT 0,
  completed_at TIMESTAMP,
  UNIQUE(user_id, lesson_id)
);

-- Diagnostic System
CREATE TABLE diagnostic_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  question_type question_type DEFAULT 'multiple_choice',
  options JSONB,
  category VARCHAR(100),
  weight INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE user_diagnostics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  answers JSONB NOT NULL,
  recommendations JSONB,
  completed_at TIMESTAMP DEFAULT NOW()
);

-- Enums
CREATE TYPE user_role AS ENUM ('customer', 'admin', 'super_admin');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE course_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE question_type AS ENUM ('multiple_choice', 'single_choice', 'scale', 'text');
```

## אבטחה ופרטיות

### 🔒 אסטרטגיית אבטחה
```typescript
// Row Level Security (RLS) Policies
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Customers can view active products" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

// API Security
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval'"
}

// Rate Limiting
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
})
```

### 🛡️ Data Validation
```typescript
// Zod schemas for type-safe validation
const ProductSchema = z.object({
  name: z.string().min(1).max(200),
  price: z.number().positive(),
  stock_quantity: z.number().int().min(0),
  ingredients: z.array(z.string()).optional(),
  medical_warnings: z.string().optional()
})

const OrderSchema = z.object({
  items: z.array(z.object({
    product_id: z.string().uuid(),
    quantity: z.number().int().positive()
  })),
  shipping_address: AddressSchema,
  payment_method: z.enum(['credit_card', 'paypal', 'bank_transfer'])
})
```

## ביצועים ואופטימיזציה

### ⚡ אסטרטגיית Cache
```typescript
// Multi-level caching strategy
const cacheConfig = {
  // Browser cache
  static: 'public, max-age=31536000, immutable',
  images: 'public, max-age=2592000',
  
  // CDN cache
  api: 'public, s-maxage=300, stale-while-revalidate=600',
  
  // Server cache (Redis)
  products: { ttl: 3600 }, // 1 hour
  categories: { ttl: 86400 }, // 24 hours
  user_sessions: { ttl: 1800 } // 30 minutes
}

// Database query optimization
const productQueries = {
  // Use indexes effectively
  findByCategory: `
    SELECT p.*, c.name as category_name 
    FROM products p 
    JOIN categories c ON p.category_id = c.id 
    WHERE c.slug = $1 AND p.is_active = true
    ORDER BY p.is_featured DESC, p.created_at DESC
  `,
  
  // Paginated results
  findWithPagination: `
    SELECT * FROM products 
    WHERE is_active = true 
    ORDER BY created_at DESC 
    LIMIT $1 OFFSET $2
  `
}
```

### 📱 Progressive Web App (PWA)
```typescript
// PWA Configuration
const pwaConfig = {
  name: 'מכון הניג',
  short_name: 'הניג',
  description: 'מוצרים טבעיים וקורסים מקצועיים',
  theme_color: '#036E3A',
  background_color: '#ffffff',
  display: 'standalone',
  start_url: '/',
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
  ]
}
```

## אינטגרציות חיצוניות

### 💳 מערכת תשלומים
```typescript
// Stripe Integration
const stripeConfig = {
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  secretKey: process.env.STRIPE_SECRET_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  currency: 'ILS',
  supportedPaymentMethods: [
    'card',
    'apple_pay',
    'google_pay'
  ]
}

// Payment processing
const processPayment = async (amount: number, paymentMethodId: string) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to agorot
    currency: 'ils',
    payment_method: paymentMethodId,
    confirm: true,
    return_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`
  })
  return paymentIntent
}
```

### 📧 מערכת Email
```typescript
// Resend Email Service
const emailConfig = {
  apiKey: process.env.RESEND_API_KEY,
  fromAddress: 'noreply@henig.co.il',
  templates: {
    orderConfirmation: 'order-confirmation',
    courseEnrollment: 'course-enrollment',
    passwordReset: 'password-reset'
  }
}

// Email templates
const sendOrderConfirmation = async (order: Order) => {
  await resend.emails.send({
    from: emailConfig.fromAddress,
    to: order.user.email,
    subject: `אישור הזמנה #${order.id}`,
    html: renderOrderConfirmationTemplate(order)
  })
}
```

## סביבת פיתוח

### 🛠️ Development Setup
```bash
# Required Node.js version
node: ">=18.17.0"

# Package manager
pnpm: ">=8.0.0"  # Recommended for performance

# Environment variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
RESEND_API_KEY=your_resend_key
```

### 🧪 Testing Strategy
```typescript
// Testing stack
const testingStack = {
  unit: 'Jest + Testing Library',
  integration: 'Supertest + MSW',
  e2e: 'Playwright',
  visual: 'Chromatic (optional)',
  performance: 'Lighthouse CI'
}

// Test coverage targets
const coverageTargets = {
  statements: 80,
  branches: 70,
  functions: 80,
  lines: 80
}
```

---
*נוצר: ספטמבר 2025 | עודכן לאחרונה: ספטמבר 2025*
