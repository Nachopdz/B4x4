// B4X4 v4.4 START
import React from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import Text from '@/ds/components/Text';
import Card from '@/ds/components/Card';
import Button from '@/ds/components/Button';
import ChatInput from '@/components/ChatInput';
import ChatMessageItem from '@/components/ChatMessageItem';
import { useMatchDetail } from './useMatches';
import { useMatchChat } from './useMatchChat';
import { useAuthStore } from '@/store/useAuthStore';
import { useThemeB4 } from '@/ds/theme';
import { useRoute } from '@react-navigation/native';
// B4X4 v4.4 END
// B4X4 v4.5 START
import { BookingService } from '@/services/BookingService';
import { getCourtById } from '@/mocks/seed';
import { Share, Linking, Alert } from 'react-native';
// B4X4 v4.5 END

export default function MatchDetailScreen() {
  const route = useRoute<any>();
  const { matchId } = route.params;
  const me = useAuthStore((s) => s.session?.userId ?? 'u1');
  const t = useThemeB4();
  // B4X4 v4.5 START
  const { match, join, leave, joinWaitlist, leaveWaitlist } = useMatchDetail(matchId, me);
  // B4X4 v4.5 END
  const chat = useMatchChat(matchId);

  if (match.isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <Text variant="muted" style={{ marginTop: 8 }}>
          Cargando partido…
        </Text>
      </View>
    );
  }
  if (match.isError || !match.data) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
        <Text>Error cargando el partido</Text>
      </View>
    );
  }

  const m = match.data;
  const iAmIn = m.attendees.includes(me);
  const taken = m.attendees.length;
  // B4X4 v4.5 START
  const isFull = taken >= m.maxPlayers;
  const inWait = (m.waitlist ?? []).includes(me);
  const court = getCourtById(m.courtId);

  const onReserve = () => {
    if (!court) return Alert.alert('Reserva', 'Este partido no tiene cancha asignada.');
    const url = BookingService.getDeeplink(court, m);
    if (!url) return Alert.alert('Reserva', 'Proveedor no disponible.');
    Linking.openURL(url).catch(() => Alert.alert('Error', 'No se pudo abrir el enlace.'));
  };

  const onShareICS = async () => {
    const ics = BookingService.buildICS(m, court);
    await Share.share({ message: ics, title: 'Añadir a calendario (.ics)' });
  };
  // B4X4 v4.5 END

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <FlatList
        ListHeaderComponent={
          <View style={{ padding: 16, gap: 12 }}>
            <Card>
              <Text weight="semibold">Partido #{m.id}</Text>
              <Text variant="muted" style={{ marginTop: 4 }}>
                {new Date(m.date).toLocaleString()}
              </Text>
              <Text style={{ marginTop: 6 }}>Plazas: {taken}/{m.maxPlayers}</Text>
              <Button
                title={iAmIn ? 'Salir' : taken < m.maxPlayers ? 'Unirme' : 'Completo'}
                variant={iAmIn ? 'outline' : taken < m.maxPlayers ? 'primary' : 'ghost'}
                disabled={!iAmIn && taken >= m.maxPlayers}
                onPress={() => (iAmIn ? leave.mutate() : join.mutate())}
                style={{ marginTop: 10 }}
              />
              {/* B4X4 v4.5 START */}
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                <Button title="Reservar cancha" variant="outline" onPress={onReserve} />
                <Button title="Añadir a calendario" variant="ghost" onPress={onShareICS} />
              </View>
              {isFull && !iAmIn && (
                <View style={{ marginTop: 8 }}>
                  {inWait ? (
                    <Button title="Salir de lista de espera" variant="outline" onPress={() => leaveWaitlist.mutate()} />
                  ) : (
                    <Button title="Apuntarme a lista de espera" variant="primary" onPress={() => joinWaitlist.mutate()} />
                  )}
                  {!!m.waitlist?.length && (
                    <Text variant="muted" style={{ marginTop: 6 }}>
                      En espera: {m.waitlist.length} {inWait ? `(tu posición ~${(m.waitlist.indexOf(me) + 1)})` : ''}
                    </Text>
                  )}
                </View>
              )}
              {/* B4X4 v4.5 END */}
            </Card>
            <Text variant="subtitle" weight="semibold">
              Chat del partido
            </Text>
          </View>
        }
        data={chat.list.data?.pages.flatMap((p) => p.items) ?? []}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => <ChatMessageItem m={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
        onEndReached={() => {
          if (chat.list.hasNextPage && !chat.list.isFetchingNextPage) chat.list.fetchNextPage();
        }}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl
            refreshing={(match.isRefetching as boolean) || (chat.list.isRefetching as boolean)}
            onRefresh={() => {
              match.refetch();
              chat.list.refetch();
            }}
            tintColor={t.accent}
            colors={[t.accent]}
          />
        }
        ListFooterComponent={chat.list.isFetchingNextPage ? <ActivityIndicator style={{ marginVertical: 8 }} /> : null}
      />
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: 16,
          borderTopColor: t.border,
          borderTopWidth: 1,
          backgroundColor: '#000',
        }}
      >
        <ChatInput onSend={(text) => chat.send.mutate({ userId: me, text })} />
      </View>
    </View>
  );
}