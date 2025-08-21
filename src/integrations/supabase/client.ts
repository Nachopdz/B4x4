// B4X4 v5.2 START
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ENV } from '@/config/env';

let supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabase) {
    if (!ENV.SUPABASE_URL || !ENV.SUPABASE_ANON_KEY) {
      throw new Error('[Supabase] Falta configuración (URL/ANON_KEY).');
    }
    supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY, {
      auth: { persistSession: false },
    });
  }
  return supabase!;
}
// B4X4 v5.2 END