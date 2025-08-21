// B4X4 v3.6 START
import { FLAGS_V36 } from '@/app/flags';

export type StartResult = { sessionId: string };
export interface PhoneAuthDriver {
  start(phoneE164: string): Promise<StartResult>;
  verify(sessionId: string, code: string): Promise<{ userId: string }>;
}

class MockDriver implements PhoneAuthDriver {
  async start(phoneE164: string) {
    if (!FLAGS_V36.USE_AUTH_MOCK) throw new Error('Auth mock deshabilitado');
    console.log('[AuthMock] SMS a', phoneE164, 'código 123456');
    return { sessionId: 'mock-session' };
  }
  async verify(sessionId: string, code: string) {
    if (!FLAGS_V36.USE_AUTH_MOCK) throw new Error('Auth mock deshabilitado');
    if (sessionId !== 'mock-session') throw new Error('Sesión inválida');
    if (code !== '123456') throw new Error('Código incorrecto');
    return { userId: 'u_' + Date.now().toString() };
  }
}

export const PhoneAuthService: PhoneAuthDriver = new MockDriver();
// B4X4 v3.6 END