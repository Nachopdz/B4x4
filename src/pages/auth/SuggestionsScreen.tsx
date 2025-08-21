// B4X4 v3.6 START
import React, { useState } from 'react';
import { View } from 'react-native';
import Text from '@/ds/components/Text';
import Button from '@/ds/components/Button';
import Card from '@/ds/components/Card';
import Badge from '@/ds/components/Badge';
import { useNavigation } from '@react-navigation/native';
import { mockSuggestions } from '@/mocks/seed';

export default function SuggestionsScreen() {
  const nav = useNavigation<any>();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const onFinish = () => {
    nav.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <View style={{ flex:1, backgroundColor:'#000', padding:16 }}>
      <Text variant="title" style={{ marginBottom: 12 }}>Sugerencias para seguir</Text>
      {mockSuggestions.map((u) => (
        <Card key={u.id} style={{ marginBottom: 10 }}>
          <Text variant="subtitle">{u.name} <Text variant="muted">@{u.handle}</Text></Text>
          <Badge label={u.city ?? '—'} variant="muted" style={{ marginVertical: 6 }}/>
          <Button
            title={selected.includes(u.id) ? 'Siguiendo' : 'Seguir'}
            variant={selected.includes(u.id) ? 'outline' : 'primary'}
            onPress={() => toggle(u.id)}
          />
        </Card>
      ))}
      <Button title="Empezar" onPress={onFinish} style={{ marginTop: 12 }}/>
      <Button title="Omitir" variant="ghost" onPress={onFinish} />
    </View>
  );
}
// B4X4 v3.6 END