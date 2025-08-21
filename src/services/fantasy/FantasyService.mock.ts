// B4X4 v6.1 START
import type { FantasyLeague, FantasyTeam, FantasyPlayerStat, FantasyMatchup } from '@/types/dto';

const me = 'u1';

let league: FantasyLeague = {
  id: 'fx1',
  name: 'B4X4 Barrio',
  season: '2025-26',
  scoring: 'classic',
  rosterSize: 5,
  benchSize: 3,
  week: 1,
};

let teams: FantasyTeam[] = [
  { id: 't1', leagueId: 'fx1', name: 'Los Rascacielos', ownerUserId: me, roster: ['u2','u3','u4','u5','u6'], bench: ['u7','u8','u9'], points: 120 },
  { id: 't2', leagueId: 'fx1', name: 'Neón City', ownerUserId: 'u10', roster: ['u11','u12','u13','u14','u15'], bench: ['u16','u17','u18'], points: 115 },
];

let playersWeek: FantasyPlayerStat[] = [
  { userId: 'u2', displayName: 'Alex', fantasyPoints: 26 },
  { userId: 'u3', displayName: 'Nico', fantasyPoints: 22 },
  { userId: 'u4', displayName: 'Lau', fantasyPoints: 18 },
  { userId: 'u5', displayName: 'Mauro', fantasyPoints: 30 },
  { userId: 'u6', displayName: 'Tere', fantasyPoints: 24 },
  { userId: 'u11', displayName: 'Dani', fantasyPoints: 28 },
];

let matchups: FantasyMatchup[] = [
  { id: 'm1', leagueId: 'fx1', week: 1, homeTeamId: 't1', awayTeamId: 't2', homePoints: 120, awayPoints: 115, status: 'live' },
];

export const FantasyServiceMock = {
  async getLeague(): Promise<FantasyLeague> { return league; },
  async listTeams(): Promise<FantasyTeam[]> { return teams; },
  async getMyTeam(userId: string): Promise<FantasyTeam> {
    const t = teams.find(t => t.ownerUserId === userId) ?? teams[0];
    return t;
  },
  async listWeekPlayers(week: number): Promise<FantasyPlayerStat[]> {
    // mock: devuelve siempre playersWeek
    return playersWeek;
  },
  async listMatchups(week: number): Promise<FantasyMatchup[]> {
    return matchups.filter(m => m.week === week);
  },
  async updateRoster(teamId: string, { roster, bench }: { roster: string[]; bench: string[]; }): Promise<FantasyTeam> {
    const idx = teams.findIndex(t => t.id === teamId);
    if (idx < 0) throw new Error('Team not found');
    teams[idx] = { ...teams[idx], roster, bench };
    return teams[idx];
  },
};
// B4X4 v6.1 END