// B4X4 v5.1 START
import { ApiClient } from '@/services/ApiClient';
import type { ModerationItemDTO, ModerationKindDTO } from '@/types/dto';

export const ModerationServiceHttp = {
  async report(kind: ModerationKindDTO, id: string, reason: 'spam'|'abuse'|'other'|'sensitive' = 'other'): Promise<ModerationItemDTO> {
    return ApiClient.post(`/moderation/report`, { kind, id, reason });
  },
  async status(kind: ModerationKindDTO, id: string): Promise<Pick<ModerationItemDTO, 'status'>> {
    return ApiClient.get(`/moderation/status?kind=${kind}&id=${id}`);
  },
  async listQueue(): Promise<ModerationItemDTO[]> {
    return ApiClient.get(`/moderation/queue`);
  },
  async act(kind: ModerationKindDTO, id: string, action: 'hide'|'restore'|'remove'): Promise<ModerationItemDTO> {
    return ApiClient.post(`/moderation/act`, { kind, id, action });
  },
};
// B4X4 v5.1 END