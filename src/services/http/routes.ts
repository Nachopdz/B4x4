// B4X4 v5.3 START
export const routes = {
  health: '/health',
  auth: {
    requestOtp: '/auth/otp/request',
    verifyOtp: '/auth/otp/verify',
    me: '/me',
  },
  feed: {
    list: '/feed',
    post: (id: string) => `/posts/${id}`,
    comments: (id: string) => `/posts/${id}/comments`,
  },
  reels: {
    list: '/reels',
    like: (id: string) => `/reels/${id}/like`,
  },
  challenges: {
    list: '/challenges',
    vote: (id: string) => `/challenges/${id}/vote`,
    report: (id: string) => `/challenges/${id}/report`,
  },
  matches: {
    list: '/matches',
    item: (id: string) => `/matches/${id}`,
  },
  wallet: {
    me: (userId: string) => `/wallet/${userId}`,
    txs: (userId: string) => `/wallet/${userId}/transactions`,
    earn: (userId: string) => `/wallet/${userId}/earn`,
    spend: (userId: string) => `/wallet/${userId}/spend`,
  },
  safety: {
    me: (userId: string) => `/safety/${userId}`,
  },
  moderation: {
    report: '/moderation/report',
    status: '/moderation/status',
  },
} as const;
// B4X4 v5.3 END