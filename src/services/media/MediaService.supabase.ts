// B4X4 v5.2 START
import { getSupabase } from '@/integrations/supabase/client';
import { ENV } from '@/config/env';

async function uploadFile(fileUri: string, folder: 'img' | 'vid') {
  const sb = getSupabase();
  const name = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const res = await fetch(fileUri);
  const blob = await res.blob();
  const { data, error } = await sb.storage
    .from(ENV.SUPABASE_BUCKET_MEDIA)
    .upload(name, blob, {
      cacheControl: '3600',
      upsert: false,
    });
  if (error) throw error;
  return { path: data.path } as { path: string };
}

export const MediaServiceSupabase = {
  async uploadImage(fileUri: string): Promise<{ url: string; path?: string }> {
    const { path } = await uploadFile(fileUri, 'img');
    const sb = getSupabase();
    const { data, error } = await sb.storage
      .from(ENV.SUPABASE_BUCKET_MEDIA)
      .createSignedUrl(path, 3600);
    if (error) throw error;
    return { url: data.signedUrl, path };
  },
  async uploadVideo(fileUri: string): Promise<{ url: string; path?: string }> {
    const { path } = await uploadFile(fileUri, 'vid');
    const sb = getSupabase();
    const { data, error } = await sb.storage
      .from(ENV.SUPABASE_BUCKET_MEDIA)
      .createSignedUrl(path, 3600);
    if (error) throw error;
    return { url: data.signedUrl, path };
  },
  async getSignedUrl(path: string, expiresIn = 3600): Promise<{ url: string }> {
    const sb = getSupabase();
    const { data, error } = await sb.storage
      .from(ENV.SUPABASE_BUCKET_MEDIA)
      .createSignedUrl(path, expiresIn);
    if (error) throw error;
    return { url: data.signedUrl };
  },
};
// B4X4 v5.2 END