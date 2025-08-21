// B4X4 v3.5 START
import React from 'react';
import { View } from 'react-native';
import Text from '@/ds/components/Text';
import Card from '@/ds/components/Card';
import Badge from '@/ds/components/Badge';
import Button from '@/ds/components/Button';

export default function PlayScreen() {
  return (
    <View style={{ flex:1, backgroundColor:'#000', padding:16 }}>
      <Text variant="title" style={{ marginBottom: 12 }}>Jugar (Pickup)</Text>
      <Card>
        <Text variant="body" style={{ marginBottom: 8 }}>Partidos cerca</Text>
        <Badge label="Cádiz" />
        <Button title="Crear partido" style={{ marginTop: 10 }} />
      </Card>
    </View>
  );
}
// B4X4 v3.5 END