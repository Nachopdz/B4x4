// B4X4 v4.4 START
import type { Match, MatchMessage } from '@/types';
import { mockMatchesPage, mockMatchChat } from '@/mocks/seed';

type ListParams = { cursor?: string | null; limit?: number; near?: { lat: number; lng: number } };
type ListResult = { items: Match[]; nextCursor?: string | null };

export const MatchService = {
  async list({ cursor, limit = 6 }: ListParams): Promise<ListResult> {
    const page = cursor ? parseInt(cursor, 10) : 0;
    const items = mockMatchesPage(page, limit);
    const nextCursor = page >= 4 ? null : String(page + 1);
    await new Promise((r) => setTimeout(r, 250));
    return { items, nextCursor };
  },

  async create({ dateISO, maxPlayers, ownerId }: { dateISO: string; maxPlayers: number; ownerId: string }): Promise<Match> {
    await new Promise((r) => setTimeout(r, 200));
    return {
      id: 'm_new_' + Date.now(),
      courtId: undefined,
      date: dateISO,
      maxPlayers,
      attendees: [ownerId],
      status: 'open',
    };
  },

  async join({ matchId, userId }: { matchId: string; userId: string }): Promise<{ ok: true }> {
    await new Promise((r) => setTimeout(r, 150));
    return { ok: true } as const;
  },

  async leave({ matchId, userId }: { matchId: string; userId: string }): Promise<{ ok: true }> {
    await new Promise((r) => setTimeout(r, 150));
    return { ok: true } as const;
  },

  async get({ matchId }: { matchId: string }): Promise<Match> {
    const all = [...mockMatchesPage(0, 12), ...mockMatchesPage(1, 12)];
    const found = all.find((m) => m.id === matchId);
    await new Promise((r) => setTimeout(r, 150));
    if (!found) throw new Error('Partido no encontrado');
    return found;
  },

  async listMessages({ matchId, cursor, limit = 20 }: { matchId: string; cursor?: string | null; limit?: number }): Promise<{ items: MatchMessage[]; nextCursor?: string | null }> {
    const arr = (mockMatchChat[matchId] ||= []);
    const page = cursor ? parseInt(cursor, 10) : 0;
    const start = page * limit;
    const items = arr.slice(start, start + limit);
    const nextCursor = start + limit >= arr.length ? null : String(page + 1);
    await new Promise((r) => setTimeout(r, 100));
    return { items, nextCursor };
  },

  async postMessage({ matchId, userId, text }: { matchId: string; userId: string; text: string }): Promise<MatchMessage> {
    const msg: MatchMessage = {
      id: 'mm_' + Date.now(),
      matchId,
      userId,
      text,
      createdAt: new Date().toISOString(),
    };
    mockMatchChat[matchId] = [msg, ...(mockMatchChat[matchId] || [])];
    await new Promise((r) => setTimeout(r, 120));
    return msg;
  },
};
// B4X4 v4.4 END
// B4X4 v4.5 START
import { mockMatchesPageWithWait } from '@/mocks/seed';

// enhance list to include waitlist
const _origList = MatchService.list;
MatchService.list = async function ({ cursor, limit = 6 }: ListParams): Promise<ListResult> {
  const page = cursor ? parseInt(cursor, 10) : 0;
  const items = mockMatchesPageWithWait(page, limit);
  const nextCursor = page >= 4 ? null : String(page + 1);
  await new Promise((r) => setTimeout(r, 250));
  return { items, nextCursor };
};

(MatchService as any).joinWaitlist = async function ({ matchId, userId }: { matchId: string; userId: string }) {
  await new Promise((r) => setTimeout(r, 120));
  return { ok: true } as const;
};

(MatchService as any).leaveWaitlist = async function ({ matchId, userId }: { matchId: string; userId: string }) {
  await new Promise((r) => setTimeout(r, 120));
  return { ok: true } as const;
};

// override leave to return promoted user optionally
const _origLeave = MatchService.leave;
MatchService.leave = async function ({ matchId, userId }: { matchId: string; userId: string }): Promise<{ ok: true; promoted?: string }> {
  await new Promise((r) => setTimeout(r, 150));
  const promoted = Math.random() > 0.5 ? 'u_wait_promoted' : undefined;
  return { ok: true, promoted } as const;
};
// B4X4 v4.5 END