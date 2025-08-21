// B4X4 v5.1 START
import { ApiClient } from '@/services/ApiClient';

export const ReelsServiceHttp = {
  async list({ cursor, limit = 10 }: { cursor?: string | null; limit?: number }) {
    return ApiClient.get(`/reels?cursor=${cursor ?? ''}&limit=${limit}`);
  },
  async toggleLike(id: string, liked: boolean) {
    return ApiClient.post(`/reels/${id}/like`, { liked });
  },
  // B4X4 v5.9 START
  async create({ videoUrl, caption }: { videoUrl: string; caption?: string }) {
    return ApiClient.post('/reels', { videoUrl, caption });
  },
  // B4X4 v5.9 END
};
// B4X4 v5.1 END

// B4X4 v5.8 START
// Alternativa directa a Supabase para entornos sin backend REST aún.
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/env';

const supabase = (() => {
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error('Missing Supabase');
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } });
  } catch {
    return null as any;
  }
})();

export const ReelsServiceSupabaseDirect = {
  async create({ file, caption }: { file: any; caption: string }) {
    if (!supabase) throw new Error('Falta configuración de Supabase en env.ts');
    const fileName = `${Date.now()}-${(file as any).name ?? 'reel.mp4'}`;
    const { error: uploadError } = await supabase.storage.from('reels').upload(fileName, file);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('reels').getPublicUrl(fileName);
    const videoUrl = data?.publicUrl ?? '';
    return {
      id: fileName,
      videoUrl,
      caption,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
  },
};
// B4X4 v5.8 END