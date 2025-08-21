// B4X4 v5.2 START
export const ENV = {
  // existentes...
  API_BASE_URL: __DEV__ ? 'http://localhost:3000' : 'https://api.b4x4.app',

  // toggles de servicios existentes...
  USE_MOCK_AUTH: true,
  USE_MOCK_FEED: true,
  USE_MOCK_REELS: true,
  USE_MOCK_CHALLENGES: true,
  USE_MOCK_MATCHES: true,
  USE_MOCK_VAULT: true,
  USE_MOCK_SAFETY: true,
  USE_MOCK_MODERATION: true,
  // B4X4 v6.1 START
  USE_MOCK_FANTASY: true, // Fantasy: mock por defecto
  // B4X4 v6.1 END

  // NUEVOS: Supabase (desactivados por defecto)
  USE_SUPABASE_AUTH: false,
  USE_SUPABASE_STORAGE: false,

  // Config Supabase (placeholder; no se usan si los flags = false)
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  SUPABASE_BUCKET_MEDIA: 'media', // nombre de bucket sugerido
};
// B4X4 v5.2 END