// B4X4 v5.4 START
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Text from '@/ds/components/Text';
import { MatchesService } from '@/services/matches';
import type { Match } from '@/types/dto';
import { useRoute } from '@react-navigation/native';

export default function MatchDetailScreen() {
  const { params } = useRoute<any>();
  const [match, setMatch] = useState<Match | null>(null);

  useEffect(() => {
    MatchesService.get(params.id).then(setMatch);
  }, [params.id]);

  if (!match) return <View style={{ flex:1, backgroundColor:'#000', alignItems:'center', justifyContent:'center' }}><Text>Cargando…</Text></View>;

  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 16 }}>
      <Text variant="title">{match.teamA ?? 'Equipo A'} vs {match.teamB ?? 'Equipo B'}</Text>
      <Text variant="muted" style={{ marginTop: 6 }}>{match.location ?? 'Por definir'}</Text>
      <Text variant="muted">{match.date.toLocaleString()}</Text>
      <Text style={{ marginTop: 10 }}>Estado: {match.status}</Text>
    </View>
  );
}
// B4X4 v5.4 END