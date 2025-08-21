// B4X4 v5.7 START
import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { mockSkins } from '@/mocks/skins';
import PaywallSheet from '@/components/PaywallSheet';
import { useCardCustomization } from './useCardCustomization';
import { useNavigation } from '@react-navigation/native';

export default function CardEditorScreen() {
  const navigation = useNavigation<any>();
  const { inventory, wallet, ents, buySkin, equipSkin, catalog } = useCardCustomization();
  const [showPaywall, setShowPaywall] = React.useState(false);

  const owned = (inventory.data as any)?.skins ?? [];
  const equipped = (inventory.data as any)?.equippedSkin ?? 'default';

  const priceOf = (id: string) => {
    const list = catalog?.data ?? [];
    const fromCatalog = list.find((s: any) => s.id === id);
    const fallback = mockSkins.find((s) => s.id === id) as any;
    const p = (fromCatalog?.price ?? fallback?.price ?? (id === 'neon' ? 200 : id === 'gold' ? 500 : 0));
    return p;
  };

  const onSelect = (skin: any) => {
    const isOwned = owned.includes(skin.id);
    const balance = wallet.wallet?.data?.balance ?? 0;
    const isPro = ents.ent?.data?.proActive === true;
    const price = priceOf(skin.id);

    if (skin.premium && !isOwned) {
      if (!isPro && balance < price) {
        setShowPaywall(true);
        return;
      }
      buySkin.mutate(
        { skinId: skin.id },
        { onError: (e: any) => Alert.alert('Error', e?.message ?? 'No se pudo comprar') }
      );
    } else {
      equipSkin.mutate(
        { skinId: skin.id },
        { onError: (e: any) => Alert.alert('Error', e?.message ?? 'No se pudo equipar') }
      );
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000', padding: 16 }}>
      <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Editor de Carta</Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {mockSkins.map((skin) => {
          const isOwned = owned.includes(skin.id);
          const isEquipped = equipped === skin.id;
          const price = priceOf(skin.id);
          return (
            <TouchableOpacity
              key={skin.id}
              onPress={() => onSelect(skin)}
              style={{ margin: 8, padding: 8, borderRadius: 12, backgroundColor: isEquipped ? '#39ff14' : '#1f1f1f', width: 144 }}
              accessibilityRole="button"
              accessibilityLabel={`Seleccionar skin ${skin.name}`}
            >
              <Image source={{ uri: skin.previewUrl }} style={{ width: 128, height: 176, borderRadius: 10, alignSelf: 'center' }} />
              <Text style={{ color: '#fff', textAlign: 'center', marginTop: 6 }}>{skin.name}</Text>
              <Text style={{ color: '#9ca3af', fontSize: 12, textAlign: 'center' }}>{skin.rarity.toUpperCase()}</Text>
              {skin.premium && !isOwned && (
                <Text style={{ color: '#f87171', fontSize: 12, textAlign: 'center', marginTop: 4 }}>
                  Premium • {price} coins
                </Text>
              )}
              {isOwned && !isEquipped && (
                <Text style={{ color: '#9ca3af', fontSize: 12, textAlign: 'center', marginTop: 4 }}>En inventario</Text>
              )}
              {isEquipped && (
                <Text style={{ color: '#000', fontWeight: '700', fontSize: 12, textAlign: 'center', marginTop: 4 }}>Equipada</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginTop: 20, backgroundColor: '#39ff14', padding: 12, borderRadius: 12 }}
        accessibilityRole="button"
        accessibilityLabel="Guardar y volver"
      >
        <Text style={{ color: '#000', fontWeight: '700', textAlign: 'center' }}>Guardar y Volver</Text>
      </TouchableOpacity>

      <PaywallSheet
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        onActivate={() => {
          ents.activatePro.mutate();
          setShowPaywall(false);
        }}
      />
    </ScrollView>
  );
}
// B4X4 v5.7 END