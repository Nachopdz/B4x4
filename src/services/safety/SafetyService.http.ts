// B4X4 v5.1 START
import { ApiClient } from '@/services/ApiClient';
import type { SafetySettingsDTO } from '@/types/dto';

export const SafetyServiceHttp = {
  async get(userId: string): Promise<SafetySettingsDTO> {
    return ApiClient.get(`/safety/${userId}`);
  },
  async set(userId: string, partial: Partial<SafetySettingsDTO>): Promise<SafetySettingsDTO> {
    return ApiClient.put(`/safety/${userId}`, partial);
  },
};
// B4X4 v5.1 END