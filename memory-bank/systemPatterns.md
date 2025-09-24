# דפוסי מערכת - מכון הניג

## ארכיטקטורה כללית

### גישה: Modular Monolith → Microservices Ready
```mermaid
graph TB
    subgraph "Frontend Layer"
        UI[Next.js 14 App Router]
        PWA[Progressive Web App]
    end
    
    subgraph "API Layer"
        API[Next.js API Routes]
        Auth[Authentication]
        Middleware[Rate Limiting & Security]
    end
    
    subgraph "Business Logic"
        Products[מוצרים]
        Orders[הזמנות]
        Courses[קורסים]
        Users[משתמשים]
        Payments[תשלומים]
    end
    
    subgraph "Data Layer"
        DB[(Supabase PostgreSQL)]
        Files[Supabase Storage]
        Cache[Redis Cache]
    end
    
    subgraph "External Services"
        Stripe[Stripe Payments]
        Email[Email Service]
        SMS[SMS Gateway]
        CDN[Cloudflare CDN]
    end
    
    UI --> API
    API --> Business Logic
    Business Logic --> DB
    API --> External Services
```

## דפוסי עיצוב עיקריים

### 1. Repository Pattern
```typescript
interface ProductRepository {
  findById(id: string): Promise<Product | null>
  findByCategory(category: string): Promise<Product[]>
  create(product: CreateProductDto): Promise<Product>
  update(id: string, data: UpdateProductDto): Promise<Product>
  delete(id: string): Promise<void>
}
```

### 2. Service Layer Pattern
```typescript
class ProductService {
  constructor(
    private productRepo: ProductRepository,
    private inventoryService: InventoryService,
    private cacheService: CacheService
  ) {}
  
  async getRecommendedProducts(userId: string): Promise<Product[]> {
    // Business logic for recommendations
  }
}
```

### 3. Event-Driven Architecture
```typescript
// Domain Events
interface DomainEvent {
  type: string
  payload: unknown
  timestamp: Date
}

// Event Handlers
class OrderCreatedHandler {
  handle(event: OrderCreatedEvent): Promise<void> {
    // Update inventory, send emails, etc.
  }
}
```

## מבנה קבצים מומלץ

```
henig-website/
├── 📁 app/                    # Next.js 14 App Router
│   ├── 📁 (public)/          # Public pages
│   │   ├── page.tsx          # Homepage
│   │   ├── products/         # Product catalog
│   │   ├── courses/          # Course catalog
│   │   └── checkout/         # Checkout flow
│   ├── 📁 (auth)/           # Auth pages
│   │   ├── login/
│   │   └── register/
│   ├── 📁 dashboard/         # User dashboard
│   └── 📁 admin/            # Admin panel
│
├── 📁 components/            # Reusable UI components
│   ├── 📁 ui/               # Basic UI components
│   ├── 📁 forms/            # Form components
│   ├── 📁 layout/           # Layout components
│   └── 📁 features/         # Feature-specific components
│
├── 📁 lib/                  # Utilities & configurations
│   ├── 📁 db/               # Database utilities
│   ├── 📁 auth/             # Authentication
│   ├── 📁 payments/         # Payment processing
│   └── 📁 email/            # Email templates
│
├── 📁 services/             # Business logic services
│   ├── product.service.ts
│   ├── order.service.ts
│   ├── course.service.ts
│   └── recommendation.service.ts
│
├── 📁 types/                # TypeScript type definitions
├── 📁 hooks/                # Custom React hooks
├── 📁 utils/                # Utility functions
└── 📁 public/               # Static assets
```

## דפוסי אבטחה

### 1. Authentication & Authorization
```typescript
// JWT + Session-based hybrid
interface UserSession {
  userId: string
  role: 'customer' | 'admin' | 'super_admin'
  permissions: string[]
  expiresAt: Date
}

// Role-based access control
const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError()
    }
    next()
  }
}
```

### 2. Data Validation
```typescript
// Zod schemas for validation
const CreateProductSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().positive(),
  categoryId: z.string().uuid(),
  ingredients: z.array(z.string()).optional(),
  medicalWarnings: z.string().optional()
})
```

### 3. Rate Limiting
```typescript
// Per-endpoint rate limiting
const rateLimits = {
  '/api/products': { requests: 100, window: '15m' },
  '/api/orders': { requests: 10, window: '1m' },
  '/api/auth/login': { requests: 5, window: '15m' }
}
```

## דפוסי ביצועים

### 1. Caching Strategy
```typescript
// Multi-layer caching
interface CacheStrategy {
  browser: 'public, max-age=3600'      // Static assets
  cdn: 'public, s-maxage=86400'        // Product images
  api: 'private, max-age=300'          // User data
  database: 'redis-cache'              // Query results
}
```

### 2. Database Optimization
```sql
-- Indexes for common queries
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);
CREATE INDEX idx_course_progress ON course_progress(user_id, course_id);

-- Partial indexes for active records
CREATE INDEX idx_active_products ON products(id) WHERE is_active = true;
```

### 3. Image Optimization
```typescript
// Next.js Image optimization + Cloudflare
const ImageOptimization = {
  formats: ['webp', 'avif', 'jpeg'],
  sizes: [320, 640, 960, 1280, 1920],
  quality: 85,
  placeholder: 'blur',
  loading: 'lazy'
}
```

## דפוסי UX/UI

### 1. Loading States
```typescript
// Skeleton loading for better UX
const ProductCard = () => {
  const { data: product, isLoading } = useProduct(id)
  
  if (isLoading) return <ProductCardSkeleton />
  return <ProductCardContent product={product} />
}
```

### 2. Error Handling
```typescript
// Error boundaries for graceful failures
class ProductErrorBoundary extends ErrorBoundary {
  fallback = ({ error, retry }) => (
    <ErrorCard 
      title="שגיאה בטעינת המוצר"
      message="אנא נסה שוב או פנה לתמיכה"
      onRetry={retry}
    />
  )
}
```

### 3. Responsive Design
```css
/* Mobile-first approach */
.product-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## דפוסי אינטגרציה

### 1. Payment Processing
```typescript
// Strategy pattern for multiple payment providers
interface PaymentProvider {
  processPayment(amount: number, token: string): Promise<PaymentResult>
  refund(transactionId: string, amount?: number): Promise<RefundResult>
}

class StripeProvider implements PaymentProvider {
  async processPayment(amount: number, token: string) {
    // Stripe implementation
  }
}
```

### 2. Email Templates
```typescript
// Template pattern for emails
interface EmailTemplate {
  subject: string
  html: string
  text: string
}

class OrderConfirmationTemplate implements EmailTemplate {
  constructor(private order: Order) {}
  
  get subject() { return `אישור הזמנה #${this.order.id}` }
  get html() { return this.renderHtml() }
  get text() { return this.renderText() }
}
```

### 3. File Upload
```typescript
// Supabase Storage integration
class FileUploadService {
  async uploadProductImage(file: File, productId: string): Promise<string> {
    const path = `products/${productId}/${Date.now()}-${file.name}`
    const { data } = await supabase.storage
      .from('product-images')
      .upload(path, file)
    return data?.path || ''
  }
}
```

## דפוסי בדיקות

### 1. Unit Tests
```typescript
// Jest + Testing Library
describe('ProductService', () => {
  it('should return recommended products for user', async () => {
    const mockProducts = [/* mock data */]
    mockProductRepo.findByCategory.mockResolvedValue(mockProducts)
    
    const result = await productService.getRecommendedProducts('user-1')
    expect(result).toHaveLength(3)
  })
})
```

### 2. Integration Tests
```typescript
// API route testing
describe('/api/products', () => {
  it('should create product with valid data', async () => {
    const response = await request(app)
      .post('/api/products')
      .send(validProductData)
      .expect(201)
    
    expect(response.body.id).toBeDefined()
  })
})
```

### 3. E2E Tests
```typescript
// Playwright for end-to-end testing
test('complete purchase flow', async ({ page }) => {
  await page.goto('/products')
  await page.click('[data-testid="add-to-cart"]')
  await page.goto('/checkout')
  await page.fill('[name="email"]', 'test@example.com')
  await page.click('[data-testid="complete-order"]')
  await expect(page.locator('.success-message')).toBeVisible()
})
```

---
*נוצר: ספטמבר 2025 | עודכן לאחרונה: ספטמבר 2025*
