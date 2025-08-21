// B4X4 v5.2 START
import { ApiClient } from '@/services/ApiClient';

export const AuthServiceHttp = {
  async requestCode(phone: string) {
    return ApiClient.post<{ sent: true }>('/auth/otp/request', { phone });
  },
  async verifyCode(phone: string, code: string) {
    const dto: any = await ApiClient.post('/auth/otp/verify', { phone, code });
    return { verified: true, session: dto } as const;
  },
  async updateProfile(session: any, body: { handle?: string; name?: string; avatarUrl?: string }) {
    const dto: any = await ApiClient.put('/me', body);
    return { ...session, user: { ...session.user, ...dto?.user } };
  },
};
// B4X4 v5.2 END