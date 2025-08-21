// B4X4 v3.2 START
import { create } from 'zustand';
import type { GlobalRole } from '@/ds/tokens';

// B4X4 v3.6 START
type LegacySession = { userId: string; phone?: string };
type Profile = { handle?: string; name?: string; ageConfirmed?: boolean; tosAccepted?: boolean };
// B4X4 v3.6 END

// B4X4 v4.6 START
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Session } from '@/types';
// B4X4 v4.6 END

type State = {
  role: GlobalRole;
  setRole: (r: GlobalRole) => void;
  userId?: string;
  // B4X4 v3.6 START
  session?: LegacySession; // legacy minimal session for existing features
  setSession: (s?: LegacySession) => void;
  profile: Profile;
  setProfile: (p: Partial<Profile>) => void;
  // B4X4 v3.6 END
  // B4X4 v4.6 START
  ageOk: boolean | null;
  consentOk: boolean | null;
  setSessionFull: (s: Session | null) => Promise<void>;
  setAgeOk: (v: boolean) => Promise<void>;
  setConsentOk: (v: boolean) => Promise<void>;
  hydrate: () => Promise<void>;
  // B4X4 v4.6 END
  // B4X4 v4.8 START
  declaredAge: number | null;
  setDeclaredAge: (n: number) => Promise<void>;
  // B4X4 v4.8 END
};

export const useAuthStore = create<State>((set) => ({
  role: 'viewer_player', // default de prueba
  setRole: (r) => set({ role: r }),
  userId: 'mock-user',
  // B4X4 v3.6 START
  session: undefined,
  setSession: (s) => set({ session: s }),
  profile: {},
  setProfile: (p) => set((st) => ({ profile: { ...st.profile, ...p } })),
  // B4X4 v3.6 END
  // B4X4 v4.6 START
  ageOk: null,
  consentOk: null,
  setSessionFull: async (s) => {
    if (s) {
      await AsyncStorage.setItem('b4x4_session', JSON.stringify(s));
      set({ session: { userId: s.user.id } });
    } else {
      await AsyncStorage.removeItem('b4x4_session');
      set({ session: undefined });
    }
  },
  setAgeOk: async (v) => {
    set({ ageOk: v });
    await AsyncStorage.setItem('b4x4_age_ok', v ? '1' : '0');
  },
  setConsentOk: async (v) => {
    set({ consentOk: v });
    await AsyncStorage.setItem('b4x4_consent_ok', v ? '1' : '0');
  },
  hydrate: async () => {
    const raw = await AsyncStorage.getItem('b4x4_session');
    const age = await AsyncStorage.getItem('b4x4_age_ok');
    const cons = await AsyncStorage.getItem('b4x4_consent_ok');
    const years = await AsyncStorage.getItem('b4x4_age_years');
    if (raw) {
      try {
        const s: Session = JSON.parse(raw);
        set({ session: { userId: s.user.id } });
      } catch {
        set({ session: undefined });
      }
    }
    set({
      ageOk: age === null ? null : age === '1',
      consentOk: cons === null ? null : cons === '1',
      declaredAge: years ? parseInt(years, 10) : null,
    });
  },
  // B4X4 v4.6 END
  // B4X4 v4.8 START
  declaredAge: null,
  setDeclaredAge: async (n: number) => {
    set({ declaredAge: n });
    await AsyncStorage.setItem('b4x4_age_years', String(n));
  },
  // B4X4 v4.8 END
}));
// B4X4 v3.2 END