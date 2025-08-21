// B4X4 v3.9 START
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChallengeService } from '@/services/ChallengeService';
import type { Challenge, VoteKind } from '@/types';

const KEY = ['challenges', 'vs'];

export function useChallenges(userId: string) {
  const qc = useQueryClient();

  const list = useInfiniteQuery({
    queryKey: KEY,
    queryFn: ({ pageParam }) => ChallengeService.list({ cursor: pageParam ?? null }),
    getNextPageParam: (last) => last.nextCursor ?? undefined,
  });

  const vote = useMutation({
    mutationFn: ({ challengeId, kind }: { challengeId: string; kind: VoteKind }) =>
      ChallengeService.vote({ challengeId, kind, userId }),
    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: KEY });
      const prev = qc.getQueriesData({ queryKey: KEY });
      qc.setQueriesData(KEY, (data: any) => {
        if (!data) return data;
        const pages = data.pages.map((p: any) => ({
          ...p,
          items: p.items.map((it: Challenge) => {
            if (it.id !== vars.challengeId) return it;
            const already = it.votedByMe;
            let up = it.votesUp,
              down = it.votesDown;
            if (vars.kind === 'up') {
              up += 1;
              if (already === 'down') down = Math.max(0, down - 1);
            } else {
              down += 1;
              if (already === 'up') up = Math.max(0, up - 1);
            }
            const total = up + down;
            const ratio = total ? up / total : 0;
            const status = total >= 5 ? (ratio >= 0.6 ? 'validated' : ratio <= 0.4 ? 'flagged' : 'pending') : 'pending';
            return { ...it, votesUp: up, votesDown: down, votedByMe: vars.kind, status };
          }),
        }));
        return { ...data, pages };
      });
      return { prev };
    },
    onError: (_e, _vars, ctx) => {
      if (!ctx?.prev) return;
      for (const [key, val] of ctx.prev) qc.setQueryData(key as any, val);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  });

  const report = useMutation({
    mutationFn: ({ challengeId, reason }: { challengeId: string; reason: 'spam' | 'ineligible' | 'violence' | 'other' }) =>
      ChallengeService.report({ challengeId, reason, userId }),
  });

  return { list, vote, report };
}
// B4X4 v3.9 END