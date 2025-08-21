// B4X4 v5.5 START
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Text from '@/ds/components/Text';
import Card from '@/ds/components/Card';
import Badge from '@/ds/components/Badge';
import { useThemeB4 } from '@/ds/theme';
// B4X4 v5.8 START
import { SKIN_STYLE, SKIN_META } from '@/pages/profile/skinStyles';
// B4X4 v5.8 END

type Props = {
  card: {
    id: string;
    username: string;
    avatarUrl?: string;
    team?: string;
    city?: string;
    stats: { rating: number; attack: number; defense: number; stamina?: number; skill?: number };
    badges?: string[];
  };
  onCustomize?: () => void;
  // B4X4 v5.8 START
  skinId?: 'default' | 'neon' | 'gold';
  // B4X4 v5.8 END
};

export default function PlayerCard({ card, onCustomize, skinId = 'default' }: Props) {
  const t = useThemeB4();
  // B4X4 v5.8 START
  const skin = SKIN_STYLE[skinId] ?? SKIN_STYLE.default;
  const meta = SKIN_META[skinId] ?? SKIN_META.default;
  // B4X4 v5.8 END
  return (
    // B4X4 v5.8 START: override estilos de Card con skin (bg/border/glow)
    <Card style={[styles.container, { borderColor: skin.borderColor, borderWidth: skin.borderWidth, backgroundColor: skin.bgFrom, shadowColor: skin.accent ?? t.accent }] }>
      {/* overlay simple para simular degradado */}
      <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: skin.bgTo, opacity: 0.5, borderRadius: 12 }} />
    {/* B4X4 v5.8 END */}
      {/* Avatar + meta */}
      <View style={styles.header}>
        <Image
          source={{ uri: card.avatarUrl ?? 'https://placekitten.com/200/200' }}
          style={[styles.avatar, { borderColor: skin.borderColor }]}
        />
        <View style={styles.meta}>
          <Text weight="semibold" style={styles.username}>{card.username}</Text>
          <Text variant="muted">{card.city ?? 'Sin ciudad'} • {card.team ?? 'Agente libre'}</Text>
          {/* B4X4 v5.8 START: etiqueta de rareza */}
          <Text variant="muted" style={{ marginTop: 4, color: skin.accent ?? t.accent, fontSize: 12, fontWeight: '700' }}>{meta.rarity.toUpperCase()}</Text>
          {/* B4X4 v5.8 END */}
        </View>
        <Badge label={`${card.stats.rating}`} style={styles.rating} />
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <Stat label="ATAQUE" value={card.stats.attack} color={skin.accent ?? t.accent} />
        <Stat label="DEFENSA" value={card.stats.defense} color={t.success} />
        {card.stats.skill !== undefined && <Stat label="HABILIDAD" value={card.stats.skill} color={'#9f7aea'} />}
      </View>

      {/* Badges */}
      {!!card.badges?.length && (
        <View style={styles.badgesRow}>
          {card.badges.slice(0, 8).map((b, i) => (
            <Badge key={`${b}-${i}`} label={b} variant="muted" style={{ marginRight: 6, marginBottom: 6, borderColor: skin.borderColor }} />
          ))}
        </View>
      )}

      {/* CTA customize */}
      {onCustomize && (
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Personalizar carta"
          onPress={onCustomize} style={[styles.cta, { borderColor: skin.accent ?? t.accent }]}
        >
          <Text style={{ color: skin.accent ?? t.accent }} weight="semibold">Personalizar carta</Text>
        </TouchableOpacity>
      )}
    </Card>
  );
}

function Stat({ label, value, color }:{ label:string; value:number; color:string }){
  return (
    <View style={styles.statBox}>
      <Text style={[styles.statValue, { color }]} weight="bold">{value}</Text>
      <Text variant="muted" style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16, borderColor: '#181818', borderWidth: 1, backgroundColor: '#0b0b0b' },
  header: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#111', borderWidth: 2, borderColor: '#1f1f1f' },
  meta: { flex: 1, marginLeft: 12 },
  username: { fontSize: 18 },
  rating: { alignSelf: 'flex-start' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  statBox: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 20 },
  statLabel: { fontSize: 12, marginTop: 2 },
  badgesRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 },
  cta: { marginTop: 14, alignSelf: 'flex-end', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1 },
});
// B4X4 v5.5 END