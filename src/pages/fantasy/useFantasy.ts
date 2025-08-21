// B4X4 v6.1 START
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FantasyService } from '@/services/fantasy';
import { useAuthStore } from '@/store/useAuthStore';

export function useFantasyHome() {
  const league = useQuery({ queryKey: ['fantasy','league'], queryFn: () => FantasyService.getLeague() });
  const teams  = useQuery({ queryKey: ['fantasy','teams'], queryFn: () => FantasyService.listTeams() });
  const matchups = useQuery({
    queryKey: ['fantasy','matchups', league.data?.week ?? 1],
    queryFn: () => FantasyService.listMatchups(league.data?.week ?? 1),
    enabled: !!league.data,
  });
  return { league, teams, matchups };
}

export function useMyFantasyTeam() {
  const qc = useQueryClient();
  const userId = useAuthStore(s => s.session?.user?.id ?? (s as any).session?.userId ?? 'u1');
  const league = useQuery({ queryKey: ['fantasy','league'], queryFn: () => FantasyService.getLeague() });
  const team   = useQuery({ queryKey: ['fantasy','myTeam', userId], queryFn: () => FantasyService.getMyTeam(userId) });
  const players = useQuery({
    queryKey: ['fantasy','players', league.data?.week ?? 1],
    queryFn: () => FantasyService.listWeekPlayers(league.data?.week ?? 1),
    enabled: !!league.data,
  });

  const updateRoster = useMutation({
    mutationFn: ({ roster, bench }: { roster: string[]; bench: string[] }) => FantasyService.updateRoster(team.data!.id, { roster, bench }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['fantasy','myTeam', userId] });
      qc.invalidateQueries({ queryKey: ['fantasy','teams'] });
    }
  });

  return { league, team, players, updateRoster };
}
// B4X4 v6.1 END