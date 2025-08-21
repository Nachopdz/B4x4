// B4X4 v5.2 START
import { getSupabase } from '@/integrations/supabase/client';

export const AuthServiceSupabase = {
  async requestCode(phone: string) {
    const sb = getSupabase();
    const { error } = await sb.auth.signInWithOtp({ phone });
    if (error) throw error;
    return { sent: true } as const;
  },
  async verifyCode(phone: string, code: string) {
    const sb = getSupabase();
    const { data, error } = await sb.auth.verifyOtp({ phone, token: code, type: 'sms' });
    if (error || !data?.session) throw error || new Error('OTP inválido');
    const session = {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token ?? '',
      user: {
        id: data.user?.id || 'me',
        handle: data.user?.phone || 'user',
        name: data.user?.phone || 'Jugador',
        avatarUrl: undefined,
        globalRoles: ['viewer_player'] as any,
      },
    };
    return { verified: true, session } as const;
  },
  async updateProfile(_session: any, _body: { handle?: string; name?: string; avatarUrl?: string }) {
    return _session;
  },
};
// B4X4 v5.2 END