// B4X4 v5.4 START
import { Match } from '@/types/dto';

const MOCK_MATCHES: Match[] = [
  { id: '1', date: new Date(), location: 'Cádiz Arena', status: 'scheduled', teamA: 'Bulls', teamB: 'Lakers' },
  { id: '2', date: new Date(Date.now() + 86400000), location: 'Sevilla Court', status: 'scheduled', teamA: 'Heat', teamB: 'Spurs' },
];

export const MatchesServiceMock = {
  async list(): Promise<Match[]> {
    await new Promise((r) => setTimeout(r, 120));
    return MOCK_MATCHES.map((m) => ({ ...m }));
  },
  async get(id: string): Promise<Match | null> {
    await new Promise((r) => setTimeout(r, 120));
    return MOCK_MATCHES.find((m) => m.id === id) ?? null;
  },
};
// B4X4 v5.4 END