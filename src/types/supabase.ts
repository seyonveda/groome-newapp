
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
      artists: {
        Row: {
          bio: string | null
          brands_used: string[] | null
          id: string
          image_url: string | null
          location: string | null
          name: string
          packages: Json | null
          services: Json | null
          specialty: string | null
        }
        Insert: {
          bio?: string | null
          brands_used?: string[] | null
          id?: string
          image_url?: string | null
          location?: string | null
          name: string
          packages?: Json | null
          services?: Json | null
          specialty?: string | null
        }
        Update: {
          bio?: string | null
          brands_used?: string[] | null
          id?: string
          image_url?: string | null
          location?: string | null
          name?: string
          packages?: Json | null
          services?: Json | null
          specialty?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          artist_id: string
          booking_date: string
          created_at: string | null
          id: string
          price: number
          special_request: string | null
          status: string | null
          time_slot: string
          user_id: string
        }
        Insert: {
          artist_id: string
          booking_date: string
          created_at?: string | null
          id?: string
          price: number
          special_request?: string | null
          status?: string | null
          time_slot: string
          user_id: string
        }
        Update: {
          artist_id?: string
          booking_date?: string
          created_at?: string | null
          id?: string
          price?: number
          special_request?: string | null
          status?: string | null
          time_slot?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_artist_id_fkey"
            columns: ["artist_id"]
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
