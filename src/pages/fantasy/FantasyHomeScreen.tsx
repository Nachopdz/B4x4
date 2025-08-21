// B4X4 v6.1 START
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFantasyHome } from './useFantasy';
import { useNavigation } from '@react-navigation/native';

export default function FantasyHomeScreen() {
  const { league, teams, matchups } = useFantasyHome();
  const nav = useNavigation<any>();

  if (league.isLoading || teams.isLoading) {
    return <View style={{ flex:1, backgroundColor: '#000', alignItems:'center', justifyContent:'center' }}><Text style={{ color:'#fff' }}>Cargando liga…</Text></View>;
  }

  const sorted = [...(teams.data ?? [])].sort((a,b) => (b.points ?? 0) - (a.points ?? 0));

  return (
    <View style={{ flex:1, backgroundColor:'#000', padding:16 }}>
      <Text style={{ color:'#fff', fontSize:18, fontWeight:'800' }}>
        {league.data?.name} • Semana {league.data?.week}
      </Text>

      <Text style={{ color:'#9aa0a6', marginTop:10, marginBottom:6 }}>Clasificación</Text>
      <FlatList
        data={sorted}
        keyExtractor={(t) => t.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{ padding:12, backgroundColor:'#111', borderRadius:10, marginBottom:8 }}
            onPress={() => nav.navigate('MyRoster' as never)}
          >
            <Text style={{ color:'#fff', fontWeight:'700' }}>{index+1}. {item.name}</Text>
            <Text style={{ color:'#9aa0a6' }}>Puntos: {item.points ?? 0}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={{ color:'#9aa0a6', marginTop:12, marginBottom:6 }}>Enfrentamientos</Text>
      <FlatList
        data={matchups.data ?? []}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => nav.navigate('WeeklyMatchup' as never, { matchupId: item.id } as never)}
            style={{ padding:12, backgroundColor:'#111', borderRadius:10, marginBottom:8 }}
          >
            <Text style={{ color:'#fff' }}>{item.homeTeamId} vs {item.awayTeamId}</Text>
            <Text style={{ color:'#9aa0a6' }}>{item.homePoints} - {item.awayPoints} • {item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
// B4X4 v6.1 END