export type Environment = {
  env: 'local' | 'dev' | 'prod'
  supabase: SupabaseCredentials,
}

type SupabaseCredentials = {
  url: string
  key: string
}
