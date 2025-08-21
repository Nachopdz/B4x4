// B4X4 v4.4 START
import React from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import Text from '@/ds/components/Text';
import Button from '@/ds/components/Button';
import MatchCard from '@/components/MatchCard';
import { useMatches } from './useMatches';
import { useThemeB4 } from '@/ds/theme';
import { useNavigation } from '@react-navigation/native';

export default function PlayListScreen() {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, refetch, isRefetching } = useMatches();
  const t = useThemeB4();
  const nav = useNavigation<any>();
  const items = data?.pages.flatMap((p) => p.items) ?? [];

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <Text variant="muted" style={{ marginTop: 8 }}>
          Cargando partidos…
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 16 }}>
      <Button title="Crear partido" onPress={() => nav.navigate('CreateMatch')} />
      <FlatList
        style={{ marginTop: 12 }}
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <MatchCard match={item} onOpen={(id) => nav.navigate('MatchDetail', { matchId: id })} />
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator style={{ marginTop: 10 }} /> : null}
        refreshControl={
          <RefreshControl refreshing={isRefetching as boolean} onRefresh={refetch} tintColor={t.accent} colors={[t.accent]} />
        }
      />
    </View>
  );
}
// B4X4 v4.4 END