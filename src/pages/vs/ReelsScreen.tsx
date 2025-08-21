// B4X4 v3.8 START
import React, { useCallback, useRef, useState } from 'react';
import { View, FlatList, Dimensions, ActivityIndicator, Pressable } from 'react-native';
import { useReels } from './useReels';
import ReelPlayer from '@/components/ReelPlayer';
import Text from '@/ds/components/Text';
import { useThemeB4 } from '@/ds/theme';
import { useNavigation } from '@react-navigation/native';

const ITEM_H = Dimensions.get('window').height - 120;

export default function ReelsScreen() {
  const { list, toggleLike } = useReels();
  const t = useThemeB4();
  const nav = useNavigation<any>();
  const [playingId, setPlayingId] = useState<string | null>(null);

  const data = list.data?.pages.flatMap((p) => p.items) ?? [];

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    const top = viewableItems?.[0]?.item;
    setPlayingId(top?.id ?? null);
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  const renderItem = useCallback(
    ({ item }: any) => (
      <View style={{ height: ITEM_H, justifyContent: 'center' }}>
        <ReelPlayer
          uri={item.videoUrl}
          playing={playingId === item.id}
          onToggle={() => setPlayingId((cur) => (cur === item.id ? null : item.id))}
        />
        <View style={{ position: 'absolute', bottom: 24, right: 16, gap: 10, alignItems: 'flex-end' }}>
          <Pressable
            accessibilityRole="button"
            onPress={() => toggleLike.mutate({ reelId: item.id, liked: !item.likedByMe })}
            style={{ backgroundColor: item.likedByMe ? t.accent : 'transparent', borderColor: t.accent, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16 }}
          >
            <Text style={{ color: item.likedByMe ? '#000' : t.accent }}>{`${item.likes} ❤`}</Text>
          </Pressable>
          <Pressable accessibilityRole="button" style={{ backgroundColor: 'transparent', borderColor: t.accent, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16 }}>
            <Text style={{ color: t.accent }}>{`${item.comments} 💬`}</Text>
          </Pressable>
        </View>
        {!!item.caption && (
          <View style={{ position: 'absolute', bottom: 24, left: 16, right: 120 }}>
            <Text weight="semibold">{item.caption}</Text>
          </View>
        )}
      </View>
    ),
    [playingId, toggleLike, t]
  );

  const keyExtractor = useCallback((it: any) => it.id, []);
  const onEnd = () => {
    if (list.hasNextPage && !list.isFetchingNextPage) list.fetchNextPage();
  };

  if (list.isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <Text variant="muted" style={{ marginTop: 8 }}>
          Cargando reels…
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <FlatList
        data={data}
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

      <Pressable
        accessibilityRole="button"
        onPress={() => nav.navigate('UploadReel')}
        style={{ position: 'absolute', bottom: 24, alignSelf: 'center', backgroundColor: t.accent, paddingHorizontal: 18, paddingVertical: 12, borderRadius: 22 }}
      >
        <Text style={{ color: '#000', fontWeight: '700' }}>+ Subir</Text>
      </Pressable>

      {/* Botón para ir a Retos */}
      <Pressable
        accessibilityRole="button"
        onPress={() => nav.navigate('Challenges')}
        style={{ position: 'absolute', top: 16, left: 16, backgroundColor: t.accent, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 }}
      >
        <Text style={{ color: '#000', fontWeight: '700' }}>Retos</Text>
      </Pressable>
    </View>
  );
}
// B4X4 v3.8 END