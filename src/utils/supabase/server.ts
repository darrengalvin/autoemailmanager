import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () => {
  const cookieStore = cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase credentials not found, using development values')
    return createServerClient(
      'http://localhost:54321',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
      {
        cookies: {
          async get(name: string) {
            return (await cookieStore).get(name)?.value
          },
        },
      }
    )
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      async get(name: string) {
        return (await cookieStore).get(name)?.value
      },
    },
  })
}