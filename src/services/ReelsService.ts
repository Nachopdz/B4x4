// B4X4 v3.8 START
import type { Reel } from '@/types';
import { mockReelsPage } from '@/mocks/seed';

type ListParams = { cursor?: string | null; limit?: number };
type ListResult = { items: Reel[]; nextCursor?: string | null };

export const ReelsService = {
  async list({ cursor, limit = 5 }: ListParams): Promise<ListResult> {
    const page = cursor ? parseInt(cursor, 10) : 0;
    const items = mockReelsPage(page, limit);
    const nextCursor = page >= 4 ? null : String(page + 1);
    await new Promise((r) => setTimeout(r, 250));
    return { items, nextCursor };
  },

  async toggleLike(_reelId: string, _liked: boolean): Promise<{ ok: true }> {
    await new Promise((r) => setTimeout(r, 150));
    return { ok: true } as const;
  },

  async create({ videoUrl, caption, userId }: { videoUrl: string; caption?: string; userId: string }): Promise<Reel> {
    await new Promise((r) => setTimeout(r, 300));
    const now = Date.now();
    return {
      id: 'r_new_' + now,
      userId,
      videoUrl,
      caption,
      createdAt: new Date(now).toISOString(),
      likes: 0,
      comments: 0,
      likedByMe: false,
      status: 'pending',
    };
  },
};
// B4X4 v3.8 END