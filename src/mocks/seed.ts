// B4X4 v3.8 START
import type { Reel } from '@/types';

const vids = [
  // Sample públicos estables
  'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
];

export const mockReelsPage = (page: number, size = 5): Reel[] => {
  const start = page * size;
  return Array.from({ length: size }).map((_, i) => {
    const idn = start + i + 1;
    // simple round-robin de usuarios mock
    const userIds = ['u1', 'u2', 'u3'];
    const userId = userIds[(start + i) % userIds.length];
    return {
      id: 'r' + idn,
      userId,
      videoUrl: vids[(start + i) % vids.length],
      caption: ['Step-back', 'Crossover', 'Windmill', 'No-look', 'Corner 3'][idn % 5],
      createdAt: new Date(Date.now() - idn * 2_700_000).toISOString(),
      likes: (idn * 9) % 500,
      comments: (idn * 5) % 80,
      likedByMe: false,
      status: 'validated',
    };
  });
};

export function pushMockReel(reel: Reel) {
  // No store global: el servicio hará prepend en la primera página simulada.
  return reel;
}
// B4X4 v3.8 END
// B4X4 v3.9 START
import type { Challenge } from '@/types';

export const mockChallengesPage = (page: number, size = 5): Challenge[] => {
  const reels = mockReelsPage(page, size);
  return reels.map((r, idx) => {
    const base = page * size + idx + 1;
    const up = (base * 3) % 9;
    const down = (base * 2) % 7;
    const total = up + down;
    const ratio = total ? up / total : 0;
    const status: Challenge['status'] =
      total >= 5 ? (ratio >= 0.6 ? 'validated' : ratio <= 0.4 ? 'flagged' : 'pending') : 'pending';
    return {
      id: 'c' + r.id,
      userId: r.userId,
      videoUrl: r.videoUrl,
      caption: r.caption,
      createdAt: r.createdAt,
      votesUp: up,
      votesDown: down,
      status,
      votedByMe: null,
    };
  });
};
// B4X4 v3.9 END
// B4X4 v4.4 START
import type { Match, MatchMessage } from '@/types';

export const mockMatchesPage = (page: number, size = 6): Match[] => {
  const start = page * size;
  return Array.from({ length: size }).map((_, i) => {
    const idn = start + i + 1;
    const userIds = ['u1', 'u2', 'u3'];
    const ownerId = userIds[(start + i) % userIds.length];
    const max = 8 + ((idn % 3) * 2); // 8/10/12
    const attendees = [ownerId];
    return {
      id: 'm' + idn,
      courtId: ['cadiz_c1', 'cadiz_c2', 'cadiz_c3'][idn % 3],
      date: new Date(Date.now() + idn * 60 * 60 * 1000).toISOString(),
      maxPlayers: max,
      attendees,
      status: 'open',
      score: undefined,
      // B4X4 v4.5 START
      waitlist: [],
      // B4X4 v4.5 END
    };
  });
};

export const mockMatchChat: Record<string, MatchMessage[]> = {};
// B4X4 v4.4 END
// B4X4 v4.5 START
import type { Court } from '@/types';

export const mockCourts: Court[] = [
  { id: 'cadiz_c1', name: 'Pabellón Centro', city: 'Cádiz', provider: 'sporttia', providerCourtSlug: 'cadiz/pabellon-centro' },
  { id: 'cadiz_c2', name: 'Polideportivo Norte', city: 'Cádiz', provider: 'sporttia', providerCourtSlug: 'cadiz/polideportivo-norte' },
  { id: 'london_c1', name: 'Shoreditch Court', city: 'London', provider: 'playfinder', providerCourtSlug: 'london/shoreditch-court' },
];

export const getCourtById = (id?: string) => mockCourts.find((c) => c.id === id);

export const mockMatchesPageWithWait = (page: number, size = 6): Match[] => {
  return mockMatchesPage(page, size).map((m) => ({ ...m, waitlist: m.waitlist ?? [] }));
};
// B4X4 v4.5 END