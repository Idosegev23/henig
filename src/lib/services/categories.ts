import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/database'

type Category = Database['public']['Tables']['categories']['Row']

export class CategoriesService {
  private supabase = createClient()

  async getCategories() {
    const { data, error } = await this.supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Error fetching categories:', error)
      throw new Error('Failed to fetch categories')
    }

    return data as Category[]
  }

  async getCategoryBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      console.error('Error fetching category:', error)
      throw new Error('Category not found')
    }

    return data as Category
  }

  async getCategoriesWithProductCount() {
    const { data, error } = await this.supabase
      .from('categories')
      .select(`
        *,
        products!inner (
          count
        )
      `)
      .eq('is_active', true)
      .eq('products.is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Error fetching categories with count:', error)
      throw new Error('Failed to fetch categories')
    }

    return data
  }
}
