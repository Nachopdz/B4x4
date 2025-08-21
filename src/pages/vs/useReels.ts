// B4X4 v3.8 START
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ReelsService } from '@/services/reels';
import type { Reel } from '@/types';
// B4X4 v5.9 START
import { MediaService } from '@/services/media';
import { ENV } from '@/config/env';
// B4X4 v5.9 END
// B4X4 v5.8 START
// removed ReelsCreate usage to avoid double upload; keep flag import if needed elsewhere
import { USE_SUPABASE_STORAGE } from '@/env';
// B4X4 v5.8 END

const KEY = ['reels', 'vs'] as const;

export function useReels() {
  const qc = useQueryClient();

  const list = useInfiniteQuery({
    queryKey: KEY,
    queryFn: ({ pageParam }) => ReelsService.list({ cursor: pageParam ?? null }),
    getNextPageParam: (last) => last.nextCursor ?? undefined,
  });

  const toggleLike = useMutation({
    mutationFn: ({ reelId, liked }: { reelId: string; liked: boolean }) =>
      ReelsService.toggleLike(reelId, liked),
    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: KEY });
      const prev = qc.getQueriesData({ queryKey: KEY });
      qc.setQueriesData(KEY, (data: any) => {
        if (!data) return data;
        const newPages = data.pages.map((p: any) => ({
          ...p,
          items: p.items.map((it: Reel) =>
            it.id === vars.reelId
              ? { ...it, likedByMe: vars.liked, likes: it.likes + (vars.liked ? 1 : -1) }
              : it
          ),
        }));
        return { ...data, pages: newPages };
      });
      return { prev };
    },
    onError: (_e, _vars, ctx) => {
      if (!ctx?.prev) return;
      for (const [key, val] of ctx.prev) qc.setQueryData(key as any, val);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  });

  const create = useMutation({
    mutationFn: ReelsService.create,
    onSuccess: (newReel) => {
      qc.setQueriesData(KEY, (data: any) => {
        if (!data) return data;
        const first = data.pages?.[0];
        if (!first) return data;
        const updatedFirst = { ...first, items: [newReel, ...first.items] };
        const pages = [updatedFirst, ...data.pages.slice(1)];
        return { ...data, pages };
      });
    },
  });

  return { list, toggleLike, create };
}
// B4X4 v3.8 END

// B4X4 v5.9 START
export function useReelsUpload() {
  const qc = useQueryClient();

  const upload = useMutation({
    mutationFn: async ({ inputUri, caption }: { inputUri: string; caption?: string }) => {
      let finalUrl = inputUri;

      if (ENV.USE_SUPABASE_STORAGE || USE_SUPABASE_STORAGE) {
        const { url } = await MediaService.uploadVideo(inputUri);
        finalUrl = url;
      }

      const created = await ReelsService.create({ videoUrl: finalUrl, caption });
      return created;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEY });
      qc.invalidateQueries({ queryKey: ['reels'] });
    },
  });

  return { upload };
}
// B4X4 v5.9 END