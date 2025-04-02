export type Environment = {
  production: boolean
  supabase: SupabaseCredentials,
  redirectTo?: string
}

type SupabaseCredentials = {
  url: string
  key: string
}
