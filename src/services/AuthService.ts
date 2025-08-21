// B4X4 v4.6 START
import type { Session, User } from '@/types';

const smsStore: Record<string, string> = {}; // phone -> code
let currentUserId = 1000;

export const AuthService = {
  async requestCode(phone: string): Promise<{ sent: true; debugCode: string }> {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    smsStore[phone] = code;
    await new Promise((r) => setTimeout(r, 300));
    return { sent: true, debugCode: code } as const;
  },

  async verifyCode(phone: string, code: string): Promise<{ verified: true; session: Session }> {
    await new Promise((r) => setTimeout(r, 300));
    if (smsStore[phone] !== code) throw new Error('Código incorrecto');
    const userId = 'u' + currentUserId++;
    const user: User = {
      id: userId,
      handle: `user${userId}`,
      name: `Jugador ${userId}`,
      globalRoles: ['viewer_player'],
    };
    const session: Session = {
      accessToken: 'mock_' + userId,
      refreshToken: 'mock_r_' + userId,
      user,
    };
    return { verified: true, session } as const;
  },

  async updateProfile(
    session: Session,
    { handle, name, avatarUrl }: { handle?: string; name?: string; avatarUrl?: string }
  ): Promise<Session> {
    const user = {
      ...session.user,
      handle: handle ?? session.user.handle,
      name: name ?? session.user.name,
      avatarUrl: avatarUrl ?? session.user.avatarUrl,
    };
    return { ...session, user };
  },
};
// B4X4 v4.6 END