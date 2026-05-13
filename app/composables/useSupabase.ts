import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  const config = useRuntimeConfig()
  
  const client = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  const getProducts = async () => {
    const { data, error } = await client
      .from('products')
      .select('*')
    if (error) throw error
    return data
  }

  const getProductById = async (id: string) => {
    const { data, error } = await client
      .from('products')
      .select('*, reviews(*)')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  }

  const user = useState('supabase-user', () => null)

  const signUp = async (email, password, fullName) => {
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    })
    if (error) throw error
    return data
  }

  const signIn = async (email, password) => {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    user.value = data.user
    return data
  }

  const signOut = async () => {
    const { error } = await client.auth.signOut()
    if (error) throw error
    user.value = null
  }

  const initUser = async () => {
    const { data: { session } } = await client.auth.getSession()
    user.value = session?.user ?? null
  }

  return {
    client,
    user,
    signUp,
    signIn,
    signOut,
    initUser,
    getProducts,
    getProductById
  }
}
