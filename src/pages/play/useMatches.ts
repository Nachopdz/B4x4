// B4X4 v4.4 START
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MatchService } from '@/services/MatchService';
import { syncAttendeeToDetail, syncAttendeeToList } from '@/lib/cacheSync';
// B4X4 v4.5 START
import { setWaitlist, promoteFromWaitlist } from '@/lib/cacheSync';
// B4X4 v4.5 END

const KEY = ['matches', 'nearby'];

export function useMatches() {
  return useInfiniteQuery({
    queryKey: KEY,
    queryFn: ({ pageParam }) => MatchService.list({ cursor: pageParam ?? null }),
    getNextPageParam: (last) => last.nextCursor ?? undefined,
  });
}

export function useMatchDetail(matchId: string, userId: string) {
  const qc = useQueryClient();

  const match = useQuery({
    queryKey: ['match', matchId],
    queryFn: () => MatchService.get({ matchId }),
  });

  const join = useMutation({
    mutationFn: () => MatchService.join({ matchId, userId }),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ['match', matchId] });
      syncAttendeeToDetail(qc, matchId, userId, true);
      syncAttendeeToList(qc, matchId, userId, true);
    },
    onError: () => {
      syncAttendeeToDetail(qc, matchId, userId, false);
      syncAttendeeToList(qc, matchId, userId, false);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['match', matchId] });
      qc.invalidateQueries({ queryKey: ['matches', 'nearby'] });
    },
  });

  const leave = useMutation({
    mutationFn: () => MatchService.leave({ matchId, userId }) as Promise<{ ok: true; promoted?: string }>,
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ['match', matchId] });
      syncAttendeeToDetail(qc, matchId, userId, false);
      syncAttendeeToList(qc, matchId, userId, false);
    },
    onSuccess: (res) => {
      if (res.promoted) promoteFromWaitlist(qc, matchId, res.promoted);
    },
    onError: () => {
      syncAttendeeToDetail(qc, matchId, userId, true);
      syncAttendeeToList(qc, matchId, userId, true);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['match', matchId] });
      qc.invalidateQueries({ queryKey: ['matches', 'nearby'] });
    },
  });

  const joinWaitlist = useMutation({
    mutationFn: () => (MatchService as any).joinWaitlist({ matchId, userId }),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ['match', matchId] });
      setWaitlist(qc, 'detail', matchId, userId, true);
      setWaitlist(qc, 'list', matchId, userId, true);
    },
    onError: () => {
      setWaitlist(qc, 'detail', matchId, userId, false);
      setWaitlist(qc, 'list', matchId, userId, false);
    },
  });

  const leaveWaitlist = useMutation({
    mutationFn: () => (MatchService as any).leaveWaitlist({ matchId, userId }),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ['match', matchId] });
      setWaitlist(qc, 'detail', matchId, userId, false);
      setWaitlist(qc, 'list', matchId, userId, false);
    },
  });

  return { match, join, leave, joinWaitlist, leaveWaitlist };
}
// B4X4 v4.4 END