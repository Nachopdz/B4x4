// B4X4 v5.8 START
export type SkinKey = 'default' | 'neon' | 'gold';

export const SKIN_META: Record<SkinKey, { label: string; rarity: 'common'|'rare'|'legendary' }> = {
  default: { label: 'Clásica', rarity: 'common' },
  neon:    { label: 'Neón Glow', rarity: 'rare' },
  gold:    { label: 'Oro Radiante', rarity: 'legendary' },
};

export const SKIN_STYLE: Record<SkinKey, {
  bgFrom: string; bgTo: string;
  borderColor: string; borderWidth: number;
  glow: string;
  accent?: string;
}> = {
  default: {
    bgFrom: '#111111', bgTo: '#1a1a1a',
    borderColor: '#2a2a2a', borderWidth: 2,
    glow: 'rgba(255,255,255,0.06)',
    accent: '#39ff14',
  },
  neon: {
    bgFrom: '#0b0f1a', bgTo: '#071b2b',
    borderColor: '#00e5ff', borderWidth: 3,
    glow: 'rgba(0,229,255,0.25)',
    accent: '#00e5ff',
  },
  gold: {
    bgFrom: '#3a2b0a', bgTo: '#110b00',
    borderColor: '#f6c453', borderWidth: 4,
    glow: 'rgba(246,196,83,0.35)',
    accent: '#f6c453',
  },
};
// B4X4 v5.8 END