// B4X4 v4.4 START
import React from 'react';
import { View } from 'react-native';
import Card from '@/ds/components/Card';
import Text from '@/ds/components/Text';
import Badge from '@/ds/components/Badge';
import Button from '@/ds/components/Button';

export default function MatchCard({
  match,
  onOpen,
}: {
  match: import('@/types').Match;
  onOpen: (id: string) => void;
}) {
  const taken = match.attendees.length;
  return (
    <Card style={{ marginBottom: 12 }}>
      <Text weight="semibold">Partido #{match.id}</Text>
      <Text variant="muted" style={{ marginTop: 4 }}>
        {new Date(match.date).toLocaleString()}
      </Text>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 8, alignItems: 'center' }}>
        <Badge label={`${taken}/${match.maxPlayers} plazas`} variant={taken >= match.maxPlayers ? 'danger' : 'accent'} />
        <Badge label={match.status === 'open' ? 'Abierto' : match.status} variant="muted" />
      </View>
      <Button title="Ver detalle" style={{ marginTop: 10 }} onPress={() => onOpen(match.id)} />
    </Card>
  );
}
// B4X4 v4.4 END