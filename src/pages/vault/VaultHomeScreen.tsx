// B4X4 v4.7 START
import React from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import Text from '@/ds/components/Text';
import Card from '@/ds/components/Card';
import Button from '@/ds/components/Button';
import TxItem from '@/components/TxItem';
import { useVault, useEntitlements } from './useVault';
import { useAuthStore } from '@/store/useAuthStore';
import { useThemeB4 } from '@/ds/theme';
import { useNavigation } from '@react-navigation/native';
import PaywallSheet from '@/components/PaywallSheet';

export default function VaultHomeScreen() {
  const me = useAuthStore((s) => s.session?.user?.id ?? s.session?.userId ?? 'u1');
  const { wallet, txs, earn } = useVault(me);
  const { ent, activatePro, deactivatePro } = useEntitlements(me);
  const t = useThemeB4();
  const nav = useNavigation<any>();
  const [pw, setPw] = React.useState(false);

  if (wallet.isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <Text variant="muted" style={{ marginTop: 8 }}>
          Cargando wallet…
        </Text>
      </View>
    );
  }

  const items = txs.data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 16 }}>
      <Card>
        <Text variant="subtitle" weight="semibold">
          Saldo
        </Text>
        <Text style={{ fontSize: 28, marginTop: 4 }}>{wallet.data?.balance ?? 0} coins</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
          <Button title="Daily check‑in +20" onPress={() => earn.mutate({ amount: 20, reason: 'daily_checkin' })} />
          <Button title="Skins" variant="outline" onPress={() => nav.navigate('Skins')} />
        </View>
      </Card>

      <Card style={{ marginTop: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text variant="subtitle" weight="semibold">
            B4X4 Pro
          </Text>
          {ent.data?.proActive ? (
            <Button title="Desactivar" variant="outline" onPress={() => deactivatePro.mutate()} />
          ) : (
            <Button title="Activar" onPress={() => setPw(true)} />
          )}
        </View>
        <Text variant="muted" style={{ marginTop: 6 }}>
          Pro desbloquea límites suaves (no afecta a fair play).
        </Text>
      </Card>

      <Card style={{ marginTop: 12 }}>
        <Text variant="subtitle" weight="semibold">
          Historial
        </Text>
        {txs.isLoading ? (
          <ActivityIndicator style={{ marginTop: 8 }} />
        ) : (
          <FlatList
            data={items}
            keyExtractor={(it) => it.id}
            renderItem={({ item }) => <TxItem tx={item} />}
            onEndReached={() => {
              if (txs.hasNextPage && !txs.isFetchingNextPage) txs.fetchNextPage();
            }}
            onEndReachedThreshold={0.3}
            refreshControl={
              <RefreshControl
                refreshing={!!txs.isRefetching}
                onRefresh={() => {
                  wallet.refetch();
                  txs.refetch();
                }}
                tintColor={t.accent}
                colors={[t.accent]}
              />
            }
          />
        )}
      </Card>

      <PaywallSheet visible={pw} onClose={() => setPw(false)} onActivate={() => { setPw(false); activatePro.mutate(); }} />
    </View>
  );
}
// B4X4 v4.7 END