// B4X4 v4.8 START
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SafetySettings } from '@/types';

const key = (userId: string) => `b4x4_safety_${userId}`;

export function defaultsForAge(age?: number | null): SafetySettings {
  const a = age ?? 18;
  return {
    contentBlur: true,
    allowChat: a >= 16,
    allowUploads: a >= 16,
    allowPro: a >= 18,
    privacyPublic: a >= 16,
    sessionLimitMinutes: 0,
    guardianPIN: undefined,
  };
}

export const SafetyService = {
  async get(userId: string, age?: number | null): Promise<SafetySettings> {
    const raw = await AsyncStorage.getItem(key(userId));
    if (raw) return JSON.parse(raw);
    const d = defaultsForAge(age);
    await AsyncStorage.setItem(key(userId), JSON.stringify(d));
    return d;
  },
  async set(userId: string, partial: Partial<SafetySettings>): Promise<SafetySettings> {
    const prev = await this.get(userId, null);
    const next = { ...prev, ...partial } as SafetySettings;
    await AsyncStorage.setItem(key(userId), JSON.stringify(next));
    return next;
  },
};
// B4X4 v4.8 END