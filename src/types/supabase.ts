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
      emails: {
        Row: {
          id: string
          subject: string
          from_address: string
          to_addresses: string[]
          body: string
          status: 'draft' | 'ai_pending' | 'human_pending' | 'approved' | 'sent'
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          subject: string
          from_address: string
          to_addresses: string[]
          body: string
          status?: 'draft' | 'ai_pending' | 'human_pending' | 'approved' | 'sent'
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          subject?: string
          from_address?: string
          to_addresses?: string[]
          body?: string
          status?: 'draft' | 'ai_pending' | 'human_pending' | 'approved' | 'sent'
          created_at?: string
          user_id?: string
        }
      }
      email_connections: {
        Row: {
          id: string
          user_id: string
          provider: string
          email: string
          access_token: string
          refresh_token?: string
          expires_at?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          provider: string
          email: string
          access_token: string
          refresh_token?: string
          expires_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          provider?: string
          email?: string
          access_token?: string
          refresh_token?: string
          expires_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_settings: {
        Row: {
          user_id: string
          email_settings: Json
          notification_settings: Json
          ui_preferences: Json
          updated_at: string
        }
        Insert: {
          user_id: string
          email_settings?: Json
          notification_settings?: Json
          ui_preferences?: Json
          updated_at?: string
        }
        Update: {
          user_id?: string
          email_settings?: Json
          notification_settings?: Json
          ui_preferences?: Json
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
      [_ in never]: never
    }
  }
}