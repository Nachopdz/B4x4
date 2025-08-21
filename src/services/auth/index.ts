// B4X4 v5.2 START
import { ENV } from '@/config/env';
import { AuthService as AuthServiceMock } from '../AuthService';
import { AuthServiceHttp } from './AuthService.http';
import { AuthServiceSupabase } from './AuthService.supabase';

export const AuthService = ENV.USE_SUPABASE_AUTH
  ? (AuthServiceSupabase as any)
  : (!ENV.USE_MOCK_AUTH ? (AuthServiceHttp as any) : AuthServiceMock);
// B4X4 v5.2 END