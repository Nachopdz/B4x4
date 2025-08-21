// B4X4 v4.4 START
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MatchService } from '@/services/MatchService';
import type { MatchMessage } from '@/types';

export function useMatchChat(matchId: string) {
  const qc = useQueryClient();

  const list = useInfiniteQuery({
    queryKey: ['matchChat', matchId],
    queryFn: ({ pageParam }) => MatchService.listMessages({ matchId, cursor: pageParam ?? null }),
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    refetchInterval: 7000,
  });

  const send = useMutation({
    mutationFn: ({ userId, text }: { userId: string; text: string }) =>
      MatchService.postMessage({ matchId, userId, text }),
    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: ['matchChat', matchId] });
      const prev = qc.getQueriesData({ queryKey: ['matchChat', matchId] });
      qc.setQueriesData(['matchChat', matchId], (data: any) => {
        if (!data) return data;
        const fake: MatchMessage = {
          id: 'temp_' + Date.now(),
          matchId,
          userId: vars.userId,
          text: vars.text,
          createdAt: new Date().toISOString(),
        };
        const pages = [{ items: [fake, ...(data.pages?.[0]?.items ?? [])] }, ...data.pages.slice(1)];
        return { ...data, pages };
      });
      return { prev };
    },
  });

  return { list, send };
}
// B4X4 v4.4 END