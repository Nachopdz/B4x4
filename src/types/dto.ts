// B4X4 v5.1 START
export interface SafetySettingsDTO {
  safeMode: boolean;
  maxDailyTime: number | null;
}

export type ModerationKindDTO = 'post' | 'reel' | 'challenge' | 'comment' | 'match_msg';
export type ModerationStatusDTO = 'ok' | 'pending' | 'hidden' | 'removed' | 'escalated';
export interface ModerationItemDTO {
  id: string;
  kind: ModerationKindDTO;
  reports: number;
  status: ModerationStatusDTO;
  updatedAt: string;
  lastReason?: 'spam' | 'abuse' | 'other' | 'sensitive';
}

export interface ReelDTO {
  id: string;
  videoUrl: string;
  caption?: string;
  createdAt: string;
  likes: number;
}

export interface ChallengeDTO {
  id: string;
  videoUrl: string;
  createdAt: string;
  up: number;
  down: number;
  status: 'pending' | 'validated' | 'flagged';
}
// B4X4 v5.1 END

// B4X4 v5.4 START
export interface MatchDTO {
  id: string;
  date: string;       // ISO string
  location?: string;
  status?: 'scheduled' | 'in_progress' | 'finished';
  teamA?: string;
  teamB?: string;
}

export interface Match {
  id: string;
  date: Date;
  location?: string;
  status: string;
  teamA?: string;
  teamB?: string;
}
// B4X4 v5.4 END

// B4X4 v5.3 START
export interface MatchDTO { id: string; date: string; location?: string; status?: string; }
// B4X4 v5.3 END

// B4X4 v5.5 START
export interface PlayerStats {
  rating: number;        // 0-100
  attack: number;
  defense: number;
  stamina: number;
  skill: number;
}

export interface PlayerCardDTO {
  id: string;
  username: string;
  avatarUrl?: string;
  team?: string;
  city?: string;
  role?: 'player' | 'viewer' | 'creator' | 'organizer';
  stats: PlayerStats;
  badges: string[];       // Insignias/skins desbloqueadas
}
// B4X4 v5.5 END

// B4X4 v5.6 START
export interface CardSkin {
  id: string;
  name: string;
  previewUrl: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  premium?: boolean; // si requiere pago/coins
}

export interface PlayerCustomization {
  equippedSkin: string;  // id de la skin activa
  ownedSkins: string[];  // ids desbloqueadas
}
// B4X4 v5.6 END

// B4X4 v6.1 START
export interface FantasyLeague {
  id: string;
  name: string;
  season: string;   // ej. '2025-26'
  scoring: 'classic' | 'head2head';
  rosterSize: number;
  benchSize: number;
  week: number;     // semana actual
}

export interface FantasyTeam {
  id: string;
  leagueId: string;
  name: string;
  ownerUserId: string;
  roster: string[];   // userIds (jugadores locales)
  bench: string[];    // userIds
  points: number;     // puntos totales temporada
  wins?: number; losses?: number; ties?: number; // para head2head
}

export interface FantasyPlayerStat {
  userId: string;        // jugador B4X4
  displayName: string;
  lastGameAt?: string;
  fantasyPoints: number; // pts semana actual (mock)
}

export interface FantasyMatchup {
  id: string;
  leagueId: string;
  week: number;
  homeTeamId: string;
  awayTeamId: string;
  homePoints: number;
  awayPoints: number;
  status: 'scheduled'|'live'|'final';
}
// B4X4 v6.1 END