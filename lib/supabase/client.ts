import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { Database, TypedSupabaseClient } from './types'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

/**
 * Create a new Supabase client with the provided credentials
 */
export const createClient = (): TypedSupabaseClient => {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
      },
      db: {
        schema: 'public'
      }
    }
  )
}

// Create a single instance of the client to reuse
export const supabase = createClient()

// Example usage
const getBlogs = async () => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')

  if (error) throw error
  return data // This will be properly typed as Blog[]
}

const getProperty = async (id: string) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data // This will be properly typed as Property
}
