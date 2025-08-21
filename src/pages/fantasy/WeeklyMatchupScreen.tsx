// B4X4 v6.1 START
import React from 'react';
import { View, Text } from 'react-native';
import { useFantasyHome } from './useFantasy';
import { useRoute } from '@react-navigation/native';

export default function WeeklyMatchupScreen() {
  const { params } = useRoute<any>();
  const { league, matchups } = useFantasyHome();
  const m = (matchups.data ?? []).find(x => x.id === params?.matchupId);

  if (!m) {
    return <View style={{ flex:1, backgroundColor:'#000', alignItems:'center', justifyContent:'center' }}><Text style={{ color:'#fff' }}>Enfrentamiento no encontrado</Text></View>;
  }

  return (
    <View style={{ flex:1, backgroundColor:'#000', padding:16 }}>
      <Text style={{ color:'#fff', fontSize:18, fontWeight:'800' }}>Semana {league.data?.week}</Text>
      <Text style={{ color:'#9aa0a6', marginTop:6 }}>{m.homeTeamId} vs {m.awayTeamId}</Text>
      <Text style={{ color:'#fff', fontSize:32, fontWeight:'900', marginTop:8 }}>{m.homePoints} - {m.awayPoints}</Text>
      <Text style={{ color:'#9aa0a6', marginTop:6 }}>Estado: {m.status}</Text>
    </View>
  );
}
// B4X4 v6.1 END