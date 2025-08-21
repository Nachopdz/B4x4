// B4X4 v4.7 START
import React from 'react';
import { View, Image } from 'react-native';
import Card from '@/ds/components/Card';
import Text from '@/ds/components/Text';
import Button from '@/ds/components/Button';
import type { Skin } from '@/types';

export default function SkinCard({
  skin,
  owned,
  equipped,
  onBuy,
  onEquip,
}: {
  skin: Skin;
  owned: boolean;
  equipped: boolean;
  onBuy: () => void;
  onEquip: () => void;
}) {
  return (
    <Card style={{ width: '48%', marginBottom: 12 }}>
      {skin.previewUrl && (
        <Image
          source={{ uri: skin.previewUrl }}
          style={{ width: '100%', aspectRatio: 1, borderRadius: 10, backgroundColor: '#0B0B0B' }}
        />
      )}
      <Text weight="semibold" style={{ marginTop: 6 }}>
        {skin.name}
      </Text>
      <Text variant="muted">
        {skin.rarity.toUpperCase()} · {skin.price} coins
      </Text>
      {owned ? (
        <Button
          title={equipped ? 'Equipada' : 'Equipar'}
          variant={equipped ? 'ghost' : 'primary'}
          onPress={onEquip}
          style={{ marginTop: 8 }}
        />
      ) : (
        <Button title="Comprar" onPress={onBuy} style={{ marginTop: 8 }} />
      )}
    </Card>
  );
}
// B4X4 v4.7 END