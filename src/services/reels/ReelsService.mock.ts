// B4X4 v5.9 START
// Nota: si ya tienes estado mock de reels, reusa el existente. Este es un fallback simple.
import { mockReelsPage } from '@/mocks/seed';
let _reels: any[] = (global as any).__REELS__ ?? [];
if (_reels.length === 0) {
  try {
    // B4X4 v5.8 START
    _reels = mockReelsPage(0, 20);
    // B4X4 v5.8 END
  } catch {
    _reels = [];
  }
}

export const ReelsService = {
  async list({ cursor, limit = 10 }: { cursor?: string | null; limit?: number }) {
    const page = cursor ? parseInt(cursor, 10) : 0;
    const start = page * limit;
    const slice = _reels.slice(start, start + limit);
    const nextCursor = start + limit >= _reels.length ? null : String(page + 1);
    return { items: slice, nextCursor };
  },

  async toggleLike(_id: string, _liked: boolean) {
    return { ok: true } as const;
  },

  async create({ videoUrl, caption }: { videoUrl: string; caption?: string }) {
    const item = {
      id: `r_${Date.now()}`,
      videoUrl,
      caption: caption ?? '',
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      likedByMe: false,
      status: 'pending',
    };
    _reels = [item, ..._reels];
    (global as any).__REELS__ = _reels;
    return item;
  },
};
// B4X4 v5.9 END