export type Environment = {
  production: boolean
  supabase: SupabaseCredentials,
}

type SupabaseCredentials = {
  url: string
  key: string
}
