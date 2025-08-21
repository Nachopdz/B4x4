// B4X4 v3.2 START
export type GlobalRole =
  | 'owner'
  | 'admin'
  | 'org'
  | 'captain'
  | 'player_baxa'
  | 'viewer_player'
  | 'viewer';

export const COLORS = {
  background: '#000000',
  textPrimary: '#FFFFFF',
  textMuted: '#B3B3B3',

  // acentos por rol (neón pastel)
  roleAccent: {
    owner: '#B066FF',        // púrpura pastel neón
    admin: '#B066FF',        // mismo que owner
    org: '#66FFE6',          // turquesa pastel neón
    captain: '#AFFF6C',      // verde lima pastel
    player_baxa: '#FFD966',  // amarillo pastel neón
    viewer_player: '#FF9F66',// naranja pastel neón
    viewer: '#9F9F9F',       // gris-neón neutro
  },

  danger: '#FF7A45',   // naranja láser para alertas
  success: '#AFFF6C',
  card: '#0A0A0A',
  border: '#1F1F1F',
} as const;

export const RADII = {
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const SPACING = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
} as const;

export const SHADOWS = {
  glow(accent: string) {
    return {
      shadowColor: accent,
      shadowOpacity: 0.6,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 0 },
      elevation: 6,
    };
  },
} as const;
// B4X4 v3.2 END