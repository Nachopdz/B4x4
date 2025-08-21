// B4X4 v4.7 START
import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import Text from '@/ds/components/Text';
import SkinCard from '@/components/SkinCard';
import { useSkins } from './useVault';
import { useAuthStore } from '@/store/useAuthStore';

export default function SkinsScreen() {
  const me = useAuthStore((s) => s.session?.user?.id ?? s.session?.userId ?? 'u1');
  const { catalog, inv, buy, equip } = useSkins(me);

  if (catalog.isLoading || inv.isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <Text variant="muted" style={{ marginTop: 8 }}>
          Cargando skins…
        </Text>
      </View>
    );
  }

  const data = catalog.data ?? [];

  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 16 }}>
      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <SkinCard
            skin={item}
            owned={!!inv.data?.skins.includes(item.id)}
            equipped={inv.data?.equippedSkin === item.id}
            onBuy={() => buy.mutate(item.id)}
            onEquip={() => equip.mutate(item.id)}
          />
        )}
      />
    </View>
  );
}
// B4X4 v4.7 END