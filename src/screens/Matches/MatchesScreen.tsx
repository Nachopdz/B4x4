// B4X4 v5.4 START
import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Text from '@/ds/components/Text';
import { MatchesService } from '@/services/matches';
import type { Match } from '@/types/dto';
import { useNavigation } from '@react-navigation/native';

export default function MatchesScreen() {
  const [matches, setMatches] = useState<Match[]>([]);
  const nav = useNavigation<any>();

  useEffect(() => {
    let mounted = true;
    MatchesService.list().then((res) => {
      if (mounted) setMatches(res);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <FlatList
        data={matches}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => nav.navigate('MatchDetail', { id: item.id })} accessibilityRole="button" accessibilityLabel={`Abrir partido ${item.teamA} vs ${item.teamB}`}>
            <View style={{ padding: 12, borderRadius: 12, backgroundColor: '#0B0B0B', borderColor: '#111', borderWidth: 1 }}>
              <Text weight="semibold">{item.teamA ?? 'Equipo A'} vs {item.teamB ?? 'Equipo B'}</Text>
              <Text variant="muted" style={{ marginTop: 4 }}>
                {(item.location ?? 'Por definir')} • {item.date.toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
// B4X4 v5.4 END