// B4X4 v5.1 START
import { ApiClient } from '@/services/ApiClient';
import type { ChallengeDTO } from '@/types/dto';

export const ChallengeServiceHttp = {
  async list({ cursor, limit = 10 }: { cursor?: string | null; limit?: number }): Promise<{ items: ChallengeDTO[]; nextCursor?: string | null }> {
    return ApiClient.get(`/challenges?cursor=${cursor ?? ''}&limit=${limit}`);
  },
  async vote({ id, kind }: { id: string; kind: 'up' | 'down' }): Promise<{ ok: true; id: string }> {
    return ApiClient.post(`/challenges/${id}/vote`, { kind });
  },
  async report({ id, reason }: { id: string; reason: 'spam' | 'abuse' | 'other' }): Promise<{ ok: true; id: string }> {
    return ApiClient.post(`/challenges/${id}/report`, { reason });
  },
};
// B4X4 v5.1 END