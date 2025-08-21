// B4X4 v3.8 START
export interface Reel {
  id: string;
  userId: string;
  videoUrl: string;
  caption?: string;
  createdAt: string;
  likes: number;
  comments: number;
  likedByMe?: boolean;
  status?: 'pending' | 'validated' | 'flagged';
}
// B4X4 v3.8 END
// B4X4 v3.9 START
export type VoteKind = 'up' | 'down';
export type ChallengeStatus = 'pending' | 'validated' | 'flagged';

export interface Challenge {
  id: string;
  userId: string;
  videoUrl: string;
  caption?: string;
  createdAt: string;
  votesUp: number;
  votesDown: number;
  status: ChallengeStatus;
  votedByMe?: VoteKind | null;
}
// B4X4 v3.9 END
// B4X4 v4.4 START
export interface Match {
  id: string;
  courtId?: string;
  date: string; // ISO string
  maxPlayers: number;
  attendees: string[]; // userIds
  status: 'open' | 'closed' | 'finished';
  score?: { home: number; away: number };
  // B4X4 v4.5 START
  waitlist?: string[];
  // B4X4 v4.5 END
}

export interface MatchMessage {
  id: string;
  matchId: string;
  userId: string;
  text: string;
  createdAt: string;
}
// B4X4 v4.4 END
// B4X4 v4.5 START
export interface Court {
  id: string;
  name: string;
  city?: string;
  provider?: 'sporttia' | 'playfinder';
  providerCourtSlug?: string;
  lat?: number;
  lng?: number;
}
// B4X4 v4.5 END
// B4X4 v4.6 START
export type GlobalRole = 'owner' | 'admin' | 'moderator' | 'viewer' | 'viewer_player';
export interface User {
  id: string;
  handle: string;
  name: string;
  avatarUrl?: string;
  globalRoles: GlobalRole[];
}
export interface Session {
  accessToken: string;
  refreshToken: string;
  user: User;
}
// B4X4 v4.6 END
// B4X4 v4.7 START
export interface Wallet {
  userId: string;
  balance: number;
  updatedAt: string;
}

export type TxType = 'earn' | 'spend';
export type TxReason = 'challenge_validated' | 'daily_checkin' | 'skin_purchase' | 'admin_grant';

export interface Transaction {
  id: string;
  userId: string;
  amount: number; // positivo earn, negativo spend
  type: TxType;
  reason: TxReason;
  createdAt: string;
  meta?: Record<string, any>;
}

export interface Skin {
  id: string;
  name: string;
  description?: string;
  price: number; // coins
  rarity: 'common' | 'rare' | 'epic';
  previewUrl?: string;
}

export interface Inventory {
  userId: string;
  skins: string[];
  equippedSkin?: string;
}

export interface Entitlements {
  proActive: boolean;
  grantedAt?: string;
}
// B4X4 v4.7 END
// B4X4 v4.8 START
export interface Report {
  reportId: string;
  targetId: string;
  targetType: 'post'|'comment'|'challenge';
  reason: 'spam'|'abuse'|'other'|'sensitive';
  status: 'pending'|'resolved';
  createdAt: string;
  resolvedBy?: string;
}

export interface ModerationAction {
  actionId: string;
  reportId: string;
  type: 'warn'|'delete'|'ignore';
  resolvedAt: string;
}

export interface ParentalSettings {
  safeMode: boolean;
  maxDailyTime: number | null; // minutos; null = ilimitado
}
// B4X4 v4.8 END