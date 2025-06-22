let supabase: any = null;

try {
  // Only import and initialize Supabase if environment variables are present
  if (process.env.REACT_APP_SUPABASE_URL && process.env.REACT_APP_SUPABASE_ANON_KEY) {
    const { createClient } = require('@supabase/supabase-js');
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (error) {
  console.warn('Supabase package not available, running in demo mode');
}

export { supabase };

export const isSupabaseConfigured = !!supabase;

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          preferences: UserPreferences;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          preferences?: UserPreferences;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          preferences?: UserPreferences;
          created_at?: string;
          updated_at?: string;
        };
      };
      documents: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          original_title: string | null;
          original_content: string;
          simplified_content: string | null;
          file_type: string;
          file_size: number;
          page_count: number | null;
          summary: string | null;
          complexity: 'low' | 'medium' | 'high' | null;
          simplification_level: number | null;
          tags: string[] | null;
          status: 'processing' | 'completed' | 'error';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          original_title?: string | null;
          original_content: string;
          simplified_content?: string | null;
          file_type: string;
          file_size: number;
          page_count?: number | null;
          summary?: string | null;
          complexity?: 'low' | 'medium' | 'high' | null;
          simplification_level?: number | null;
          tags?: string[] | null;
          status?: 'processing' | 'completed' | 'error';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          original_title?: string | null;
          original_content?: string;
          simplified_content?: string | null;
          file_type?: string;
          file_size?: number;
          page_count?: number | null;
          summary?: string | null;
          complexity?: 'low' | 'medium' | 'high' | null;
          simplification_level?: number | null;
          tags?: string[] | null;
          status?: 'processing' | 'completed' | 'error';
          created_at?: string;
          updated_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          document_id: string;
          user_id: string;
          content: string;
          sender: 'user' | 'ai';
          references: DocumentReference[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          document_id: string;
          user_id: string;
          content: string;
          sender: 'user' | 'ai';
          references?: DocumentReference[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          document_id?: string;
          user_id?: string;
          content?: string;
          sender?: 'user' | 'ai';
          references?: DocumentReference[] | null;
          created_at?: string;
        };
      };
    };
  };
}

export interface UserPreferences {
  language: string;
  simplificationLevel: 'basic' | 'intermediate' | 'advanced';
  theme: 'light' | 'dark';
  notifications: boolean;
}

export interface DocumentReference {
  id: string;
  title: string;
  relevantSection: string;
  confidence: number;
} 