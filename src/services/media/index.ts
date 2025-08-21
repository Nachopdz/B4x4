// B4X4 v5.2 START
import { ENV } from '@/config/env';
import { MediaServiceMock } from './MediaService.mock';
import { MediaServiceSupabase } from './MediaService.supabase';

/** Selector por flag: aún desactivado por defecto */
export const MediaService = ENV.USE_SUPABASE_STORAGE ? MediaServiceSupabase : MediaServiceMock;
// B4X4 v5.2 END