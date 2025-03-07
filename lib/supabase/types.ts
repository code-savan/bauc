import { SupabaseClient } from '@supabase/supabase-js'

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
      properties: {
        Row: Property
        Insert: Omit<Property, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Property>
      }
      events: {
        Row: Event
        Insert: Omit<Event, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Event>
      }
      developers: {
        Row: Developer
        Insert: Omit<Developer, 'id' | 'created_at'>
        Update: Partial<Developer>
      }
      blogs: {
        Row: Blog
        Insert: Omit<Blog, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Blog>
      }
      import_jobs: {
        Row: ImportJob
        Insert: Omit<ImportJob, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<ImportJob>
      }
      expression_of_interests: {
        Row: ExpressionOfInterest
        Insert: Omit<ExpressionOfInterest, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<ExpressionOfInterest>
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

export type Property = {
    id: string;
    title: string;
    slug?: string;
    description?: string | { content: string; [key: string]: any };
    status?: string;
    location: string | string[];
    type: string;
    property_type?: string;
    area?: number;
    mortgage_option?: boolean;
    initial_deposit?: string;
    land_mark?: string | null;
    discount?: string;
    land_status?: string | null;
    amenities?: string[];
    completion_date?: string;
    gallery?: string[];
    thumbnail?: string | null;
    full_image?: string | null;
    price_range?: string;
    payment_term?: string;
    website?: string;
    created_by?: string;
    created_at?: string;
    updated_at?: string;
    developer_id?: string;
}

export type Event = {
    id: string;
    title: string;
    slug?: string;
    location?: string;
    description?: Record<string, any> | null;
    gallery?: string[];
    banner_image?: string | null;
    event_video?: string | null;
    hosted_by?: string;
    created_at?: string;
    updated_at?: string;
  };


export type Developer = {
  id: string
  title: string
  content: Record<string, any>
  image: string
  created_at: string
  properties?: any[]
}

export type Blog = {
  id: string
  title: string
  author: string
  slug?: string
  image: string
  body: string | Record<string, any>
  created_at?: string
  updated_at?: string
}

export type ImportJob = {
  id: string
  filename: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  total_rows: number
  processed_rows: number
  failed_rows: Array<{
    row: number
    error: string
  }>
  created_by: string
  created_at: string
  updated_at: string
}

export type ExpressionOfInterest = {
  id: string
  first_name: string
  last_name: string
  phone: string
  email: string
  residential_address: string
  country: string
  state: string
  city: string
  address_landmark?: string
  occupation: string
  investment_country: string
  specific_city: 'Yes' | 'No'
  specific_city_details?: string | null
  services_interested: string[]
  services_other?: string | null
  property_type: string
  property_type_other?: string | null
  budget_range: string
  additional_features?: string
  timeline: string
  how_did_you_hear: string
  how_did_you_hear_other?: string | null
  additional_information?: string
  consent: boolean
  created_at: string
  updated_at: string
}

export type TypedSupabaseClient = SupabaseClient<Database>
