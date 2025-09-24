export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          phone: string | null
          role: 'customer' | 'admin' | 'super_admin'
          is_active: boolean
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          phone?: string | null
          role?: 'customer' | 'admin' | 'super_admin'
          is_active?: boolean
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          phone?: string | null
          role?: 'customer' | 'admin' | 'super_admin'
          is_active?: boolean
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          parent_id: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          short_description: string | null
          price: number
          sale_price: number | null
          sku: string | null
          stock_quantity: number
          manage_stock: boolean
          category_id: string
          images: Json
          ingredients: string[] | null
          medical_warnings: string | null
          usage_instructions: string | null
          is_featured: boolean
          is_active: boolean
          rating: number
          reviews_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          short_description?: string | null
          price: number
          sale_price?: number | null
          sku?: string | null
          stock_quantity?: number
          manage_stock?: boolean
          category_id: string
          images?: Json
          ingredients?: string[] | null
          medical_warnings?: string | null
          usage_instructions?: string | null
          is_featured?: boolean
          is_active?: boolean
          rating?: number
          reviews_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          short_description?: string | null
          price?: number
          sale_price?: number | null
          sku?: string | null
          stock_quantity?: number
          manage_stock?: boolean
          category_id?: string
          images?: Json
          ingredients?: string[] | null
          medical_warnings?: string | null
          usage_instructions?: string | null
          is_featured?: boolean
          is_active?: boolean
          rating?: number
          reviews_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          tax_amount: number
          shipping_amount: number
          discount_amount: number
          payment_method: string | null
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
          shipping_address: Json
          billing_address: Json
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          tax_amount?: number
          shipping_amount?: number
          discount_amount?: number
          payment_method?: string | null
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          shipping_address: Json
          billing_address: Json
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount?: number
          tax_amount?: number
          shipping_amount?: number
          discount_amount?: number
          payment_method?: string | null
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          shipping_address?: Json
          billing_address?: Json
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          total_price: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          total_price: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          total_price?: number
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          short_description: string | null
          price: number
          duration_hours: number | null
          level: 'beginner' | 'intermediate' | 'advanced'
          thumbnail_url: string | null
          trailer_url: string | null
          is_featured: boolean
          is_active: boolean
          rating: number
          reviews_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          short_description?: string | null
          price: number
          duration_hours?: number | null
          level?: 'beginner' | 'intermediate' | 'advanced'
          thumbnail_url?: string | null
          trailer_url?: string | null
          is_featured?: boolean
          is_active?: boolean
          rating?: number
          reviews_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          short_description?: string | null
          price?: number
          duration_hours?: number | null
          level?: 'beginner' | 'intermediate' | 'advanced'
          thumbnail_url?: string | null
          trailer_url?: string | null
          is_featured?: boolean
          is_active?: boolean
          rating?: number
          reviews_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      course_lessons: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          video_url: string | null
          duration_minutes: number | null
          sort_order: number
          is_free: boolean
          resources: Json
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          video_url?: string | null
          duration_minutes?: number | null
          sort_order?: number
          is_free?: boolean
          resources?: Json
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string | null
          video_url?: string | null
          duration_minutes?: number | null
          sort_order?: number
          is_free?: boolean
          resources?: Json
        }
      }
      course_enrollments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          progress: number
          completed_at: string | null
          enrolled_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          progress?: number
          completed_at?: string | null
          enrolled_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          progress?: number
          completed_at?: string | null
          enrolled_at?: string
        }
      }
      lesson_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          completed: boolean
          watched_duration: number
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          completed?: boolean
          watched_duration?: number
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          completed?: boolean
          watched_duration?: number
          completed_at?: string | null
        }
      }
      diagnostic_questions: {
        Row: {
          id: string
          question: string
          question_type: 'multiple_choice' | 'single_choice' | 'scale' | 'text'
          options: Json | null
          category: string
          weight: number
          sort_order: number
          is_active: boolean
        }
        Insert: {
          id?: string
          question: string
          question_type?: 'multiple_choice' | 'single_choice' | 'scale' | 'text'
          options?: Json | null
          category: string
          weight?: number
          sort_order?: number
          is_active?: boolean
        }
        Update: {
          id?: string
          question?: string
          question_type?: 'multiple_choice' | 'single_choice' | 'scale' | 'text'
          options?: Json | null
          category?: string
          weight?: number
          sort_order?: number
          is_active?: boolean
        }
      }
      user_diagnostics: {
        Row: {
          id: string
          user_id: string
          answers: Json
          recommendations: Json
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          answers: Json
          recommendations: Json
          completed_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          answers?: Json
          recommendations?: Json
          completed_at?: string
        }
      }
      product_reviews: {
        Row: {
          id: string
          product_id: string
          user_id: string
          rating: number
          title: string
          content: string
          verified_purchase: boolean
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          user_id: string
          rating: number
          title: string
          content: string
          verified_purchase?: boolean
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          user_id?: string
          rating?: number
          title?: string
          content?: string
          verified_purchase?: boolean
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'customer' | 'admin' | 'super_admin'
      order_status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
      payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
      course_level: 'beginner' | 'intermediate' | 'advanced'
      question_type: 'multiple_choice' | 'single_choice' | 'scale' | 'text'
    }
  }
}
