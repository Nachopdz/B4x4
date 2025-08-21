// B4X4 v5.1 START
import { ENV } from '@/config/env';
import { ReelsServiceHttp } from './ReelsService.http';
// B4X4 v5.9 START
import { ReelsService as ReelsServiceMock } from './ReelsService.mock';
// B4X4 v5.9 END
// B4X4 v5.8 START
import { USE_SUPABASE_STORAGE } from '@/env';
import { ReelsServiceSupabaseDirect } from './ReelsService.http';
// B4X4 v5.8 END

export const ReelsService = ENV.USE_MOCK_REELS ? (ReelsServiceMock as any) : (ReelsServiceHttp as any);

// B4X4 v5.8 START
// Exponer create vía Supabase directo si flag de storage está activo y estamos en modo HTTP
export const ReelsCreate = USE_SUPABASE_STORAGE ? ReelsServiceSupabaseDirect.create : ReelsService.create;
// B4X4 v5.8 END
// B4X4 v5.1 END