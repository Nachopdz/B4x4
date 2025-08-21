// B4X4 v4.9 START
import * as DTO from '@/types/dto';
import * as T from '@/types';

export const mapSession = (d: DTO.SessionDTO): T.Session => ({
  accessToken: d.accessToken,
  refreshToken: d.refreshToken,
  user: { id: d.user.id, handle: d.user.handle, name: d.user.name, avatarUrl: d.user.avatarUrl, globalRoles: d.user.roles as any },
});

export const mapPost = (d: DTO.PostDTO): any => ({ ...d });
export const mapComment = (d: DTO.CommentDTO): any => ({ ...d });
export const mapWallet = (d: DTO.WalletDTO): any => ({ ...d });
export const mapTx = (d: DTO.TransactionDTO): any => ({ ...d });
// B4X4 v4.9 END

// B4X4 v5.4 START
import { MatchDTO, Match } from '@/types/dto';

export function mapMatch(d: MatchDTO): Match {
  return {
    id: d.id,
    date: new Date(d.date),
    location: d.location,
    status: d.status ?? 'scheduled',
    teamA: d.teamA,
    teamB: d.teamB,
  };
}
// B4X4 v5.4 END

// B4X4 v5.5 START
import { PlayerCardDTO } from '@/types/dto';

export function mapPlayerCard(d: PlayerCardDTO) {
  return {
    ...d,
    stats: { ...d.stats },
    badges: d.badges ?? [],
  };
}
// B4X4 v5.5 END