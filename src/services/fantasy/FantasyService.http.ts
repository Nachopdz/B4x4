// B4X4 v6.1 START
import { ApiClient } from '@/services/ApiClient';
import type { FantasyLeague, FantasyTeam, FantasyPlayerStat, FantasyMatchup } from '@/types/dto';

export const FantasyServiceHttp = {
  async getLeague(): Promise<FantasyLeague> { return ApiClient.get('/fantasy/league'); },
  async listTeams(): Promise<FantasyTeam[]> { return ApiClient.get('/fantasy/teams'); },
  async getMyTeam(userId: string): Promise<FantasyTeam> { return ApiClient.get(`/fantasy/teams/owner/${userId}`); },
  async listWeekPlayers(week: number): Promise<FantasyPlayerStat[]> { return ApiClient.get(`/fantasy/players?week=${week}`); },
  async listMatchups(week: number): Promise<FantasyMatchup[]> { return ApiClient.get(`/fantasy/matchups?week=${week}`); },
  async updateRoster(teamId: string, body: { roster: string[]; bench: string[]; }): Promise<FantasyTeam> {
    return ApiClient.put(`/fantasy/teams/${teamId}/roster`, body);
  },
};
// B4X4 v6.1 END