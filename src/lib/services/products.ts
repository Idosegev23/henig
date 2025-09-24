import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/database'

type Product = Database['public']['Tables']['products']['Row']
type Category = Database['public']['Tables']['categories']['Row']

export interface ProductWithCategory extends Product {
  categories?: Category
}

export interface ProductFilters {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  featured?: boolean
  sortBy?: 'name' | 'price' | 'rating' | 'created_at'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export class ProductsService {
  private supabase = createClient()

  async getProducts(filters: ProductFilters = {}) {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      inStock,
      featured,
      sortBy = 'created_at',
      sortOrder = 'desc',
      page = 1,
      limit = 12
    } = filters

    let query = this.supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `)
      .eq('is_active', true)

    // Apply filters
    if (category) {
      query = query.eq('categories.slug', category)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    if (minPrice !== undefined) {
      query = query.gte('price', minPrice)
    }

    if (maxPrice !== undefined) {
      query = query.lte('price', maxPrice)
    }

    if (inStock) {
      query = query.gt('stock_quantity', 0)
    }

    if (featured) {
      query = query.eq('is_featured', true)
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' })

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching products:', error)
      throw new Error('Failed to fetch products')
    }

    return {
      data: data as ProductWithCategory[],
      count: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit)
    }
  }

  async getProductBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      console.error('Error fetching product:', error)
      throw new Error('Product not found')
    }

    return data as ProductWithCategory
  }

  async getFeaturedProducts(limit: number = 8) {
    const { data, error } = await this.supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `)
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('rating', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching featured products:', error)
      throw new Error('Failed to fetch featured products')
    }

    return data as ProductWithCategory[]
  }

  async getRelatedProducts(productId: string, categoryId: string, limit: number = 4) {
    const { data, error } = await this.supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `)
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .neq('id', productId)
      .order('rating', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching related products:', error)
      return []
    }

    return data as ProductWithCategory[]
  }

  async updateStock(productId: string, quantity: number) {
    const { error } = await this.supabase
      .from('products')
      .update({ 
        stock_quantity: quantity,
        updated_at: new Date().toISOString()
      })
      .eq('id', productId)

    if (error) {
      console.error('Error updating stock:', error)
      throw new Error('Failed to update stock')
    }
  }
}
