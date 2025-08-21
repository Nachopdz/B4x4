// B4X4 v4.4 START
import React, { useState } from 'react';
import { View } from 'react-native';
import Text from '@/ds/components/Text';
import Card from '@/ds/components/Card';
import Input from '@/ds/components/Input';
import Button from '@/ds/components/Button';
import { MatchService } from '@/services/MatchService';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigation } from '@react-navigation/native';

export default function CreateMatchScreen() {
  const [date, setDate] = useState(new Date(Date.now() + 2 * 3600_000).toISOString().slice(0, 16)); // yyyy-MM-ddTHH:mm
  const [max, setMax] = useState('10');
  const nav = useNavigation<any>();
  const me = useAuthStore((s) => s.session?.userId ?? 'u1');

  const onCreate = async () => {
    const dateISO = new Date(date).toISOString();
    const m = await MatchService.create({ dateISO, maxPlayers: Math.max(4, parseInt(max, 10) || 10), ownerId: me });
    nav.replace('MatchDetail', { matchId: m.id });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 16 }}>
      <Text variant="title" style={{ marginBottom: 12 }}>
        Crear partido
      </Text>
      <Card>
        <Input label="Fecha/hora (ISO-local)" value={date} onChangeText={setDate} helper="Formato: yyyy-MM-ddTHH:mm" />
        <Input label="Plazas máximas" value={max} onChangeText={setMax} keyboardType="number-pad" />
        <Button title="Crear" onPress={onCreate} />
      </Card>
    </View>
  );
}
// B4X4 v4.4 END