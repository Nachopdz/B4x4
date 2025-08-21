// B4X4 v3.9 START
import React, { useRef, useState, useCallback } from 'react';
import { View, FlatList, Dimensions, ActivityIndicator, Pressable } from 'react-native';
import ReelPlayer from '@/components/ReelPlayer';
import Text from '@/ds/components/Text';
import Button from '@/ds/components/Button';
import Badge from '@/ds/components/Badge';
import { useThemeB4 } from '@/ds/theme';
import { useAuthStore } from '@/store/useAuthStore';
import { useChallenges } from './useChallenges';
import { useNavigation } from '@react-navigation/native';

// B4X4 v4.8 START
import { useParental } from '@/hooks/useParental';
import { useAuthStore } from '@/store/useAuthStore';
// B4X4 v4.8 END

const ITEM_H = Dimensions.get('window').height - 120;

function ProgressBar({ up, down }: { up: number; down: number }) {
  const total = Math.max(1, up + down);
  const pct = Math.round((up / total) * 100);
  return (
    <View style={{ height: 8, backgroundColor: '#111', borderRadius: 8, overflow: 'hidden' }}>
      <View style={{ width: `${pct}%`, height: '100%', backgroundColor: '#16a34a' }} />
    </View>
  );
}

export default function ChallengesScreen() {
  const t = useThemeB4();
  const session = useAuthStore((s) => s.session);
  const userId = session?.userId ?? 'u1';
  const { list, vote, report } = useChallenges(userId);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [reportSent, setReportSent] = useState<string | null>(null);
  const nav = useNavigation<any>();
  // B4X4 v4.8 START
  const parental = useParental(userId);
  const safeMode = parental.settings.data?.safeMode === true;
  // B4X4 v4.8 END

  const data = list.data?.pages.flatMap((p) => p.items) ?? [];
  // B4X4 v4.8 START
  const filtered = safeMode ? data.filter((it: any) => it.status !== 'flagged' && it.flagged !== true) : data;
  // B4X4 v4.8 END

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    const top = viewableItems?.[0]?.item;
    setPlayingId(top?.id ?? null);
  }).current;
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  const renderItem = useCallback(({ item }: any) => {
    const total = item.votesUp + item.votesDown;
    return (
      <View style={{ height: ITEM_H, justifyContent: 'center' }}>
        <ReelPlayer uri={item.videoUrl} playing={playingId === item.id} onToggle={() => setPlayingId((cur) => (cur === item.id ? null : item.id))} />

        {/* Overlay derecha: votos + report */}
        <View style={{ position: 'absolute', bottom: 24, right: 16, gap: 10, alignItems: 'flex-end' }}>
          <Button title={`👍 ${item.votesUp}`} size="sm" variant={item.votedByMe === 'up' ? 'primary' : 'outline'} onPress={() => vote.mutate({ challengeId: item.id, kind: 'up' })} />
          <Button title={`👎 ${item.votesDown}`} size="sm" variant={item.votedByMe === 'down' ? 'primary' : 'outline'} onPress={() => vote.mutate({ challengeId: item.id, kind: 'down' })} />
          <Button title="Reportar" size="sm" variant="ghost" onPress={async () => { await report.mutateAsync({ challengeId: item.id, reason: 'spam' }); setReportSent(item.id); setTimeout(() => setReportSent(null), 1500); }} />
        </View>

        {/* Overlay izquierda: caption + estado + progreso */}
        <View style={{ position: 'absolute', bottom: 24, left: 16, right: 120, gap: 8 }}>
          {!!item.caption && <Text weight="semibold">{item.caption}</Text>}
          <ProgressBar up={item.votesUp} down={item.votesDown} />
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <Badge label={item.status === 'validated' ? 'Validado' : item.status === 'flagged' ? 'Revisar' : `Pendiente (${total}/5)`} variant={item.status === 'validated' ? 'success' : item.status === 'flagged' ? 'danger' : 'muted'} />
            {reportSent === item.id && <Badge label="Reporte enviado" variant="muted" />}
          </View>
        </View>
      </View>
    );
  }, [playingId, vote, report, reportSent]);

  const keyExtractor = useCallback((it: any) => it.id, []);
  const onEnd = () => { if (list.hasNextPage && !list.isFetchingNextPage) list.fetchNextPage(); };

  if (list.isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <Text variant="muted" style={{ marginTop: 8 }}>Cargando retos…</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <FlatList
        data={
          // B4X4 v4.8 START
          filtered
          // B4X4 v4.8 END
        }
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        pagingEnabled
        snapToAlignment="start"
        decelerationRate="fast"
        onEndReached={onEnd}
        onEndReachedThreshold={0.4}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
      />

      {/* Volver a Reels */}
      <Pressable
        accessibilityRole="button"
        onPress={() => nav.navigate('Reels')}
        style={{ position: 'absolute', top: 16, left: 16, backgroundColor: t.accent, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 }}
      >
        <Text style={{ color: '#000', fontWeight: '700' }}>Reels</Text>
      </Pressable>
    </View>
  );
}
// B4X4 v3.9 END