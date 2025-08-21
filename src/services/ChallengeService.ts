// B4X4 v3.9 START
import type { Challenge, VoteKind } from '@/types';
import { mockChallengesPage } from '@/mocks/seed';

const VALIDATION_MIN_VOTES = 5;
const VALIDATED_RATIO = 0.6;
const FLAGGED_RATIO = 0.4;
const COOLDOWN_MS = 5000;

// memoria local simulada por sesión
const state: Record<string, { up: number; down: number; status: Challenge['status'] }> = {};
const lastVote: Record<string, number> = {}; // key = userId:challengeId

function computeStatus(up: number, down: number): Challenge['status'] {
  const total = up + down;
  if (total < VALIDATION_MIN_VOTES) return 'pending';
  const ratio = up / total;
  if (ratio >= VALIDATED_RATIO) return 'validated';
  if (ratio <= FLAGGED_RATIO) return 'flagged';
  return 'pending';
}

type ListParams = { cursor?: string | null; limit?: number };
type ListResult = { items: Challenge[]; nextCursor?: string | null };

export const ChallengeService = {
  async list({ cursor, limit = 5 }: ListParams): Promise<ListResult> {
    const page = cursor ? parseInt(cursor, 10) : 0;
    const items = mockChallengesPage(page, limit).map((c) => {
      const s = state[c.id];
      return s ? { ...c, votesUp: s.up, votesDown: s.down, status: s.status } : c;
    });
    const nextCursor = page >= 4 ? null : String(page + 1);
    await new Promise((r) => setTimeout(r, 250));
    return { items, nextCursor };
  },

  async vote({ challengeId, kind, userId }: { challengeId: string; kind: VoteKind; userId: string }) {
    const key = `${userId}:${challengeId}`;
    const now = Date.now();
    if (lastVote[key] && now - lastVote[key] < COOLDOWN_MS) {
      const left = Math.ceil((COOLDOWN_MS - (now - lastVote[key])) / 1000);
      throw new Error(`Espera ${left}s antes de volver a votar`);
    }
    lastVote[key] = now;

    const cur = state[challengeId] ?? { up: 0, down: 0, status: 'pending' as const };
    const next = { ...cur };
    if (kind === 'up') next.up += 1;
    else next.down += 1;
    next.status = computeStatus(next.up, next.down);
    state[challengeId] = next;

    await new Promise((r) => setTimeout(r, 150));
    return { up: next.up, down: next.down, status: next.status };
  },

  async report({ challengeId, reason, userId }: { challengeId: string; reason: 'spam' | 'ineligible' | 'violence' | 'other'; userId: string }) {
    console.log('[report]', { challengeId, reason, userId });
    await new Promise((r) => setTimeout(r, 120));
    return { ok: true as const };
  },
};
// B4X4 v3.9 END