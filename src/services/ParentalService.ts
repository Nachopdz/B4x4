// B4X4 v4.8 START
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ParentalSettings } from '@/types';

const key = (userId: string) => `b4x4_parental_${userId}`;

const defaults: ParentalSettings = {
  safeMode: true,
  maxDailyTime: null,
};

export const ParentalService = {
  async getSettings(userId: string): Promise<ParentalSettings> {
    const raw = await AsyncStorage.getItem(key(userId));
    if (raw) return JSON.parse(raw);
    await AsyncStorage.setItem(key(userId), JSON.stringify(defaults));
    return defaults;
  },
  async updateSettings(userId: string, partial: Partial<ParentalSettings>): Promise<ParentalSettings> {
    const prev = await this.getSettings(userId);
    const next = { ...prev, ...partial };
    await AsyncStorage.setItem(key(userId), JSON.stringify(next));
    return next;
  },
};
// B4X4 v4.8 END