// B4X4 v6.1 START
import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useMyFantasyTeam } from './useFantasy';

export default function MyRosterScreen() {
  const { league, team, players, updateRoster } = useMyFantasyTeam();
  const [selected, setSelected] = useState<string[]>([]);
  const [bench, setBench] = useState<string[]>([]);

  useEffect(() => {
    if (team.data) {
      setSelected(team.data.roster);
      setBench(team.data.bench);
    }
  }, [team.data]);

  const rosterSize = league.data?.rosterSize ?? 5;
  const benchSize  = league.data?.benchSize ?? 3;

  const allPlayerIds = useMemo(() => (players.data ?? []).map(p => p.userId), [players.data]);

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(x => x !== id));
      setBench([...bench, id]);
    } else if (bench.includes(id)) {
      setBench(bench.filter(x => x !== id));
      setSelected([...selected, id]);
    } else {
      setBench([...bench, id]);
    }
  };

  const save = async () => {
    if (selected.length !== rosterSize) {
      Alert.alert('Roster inválido', `Debes tener exactamente ${rosterSize} titulares.`);
      return;
    }
    if (bench.length !== benchSize) {
      Alert.alert('Banquillo inválido', `Debes tener exactamente ${benchSize} en banquillo.`);
      return;
    }
    await updateRoster.mutateAsync({ roster: selected, bench });
    Alert.alert('Guardado', 'Tu roster ha sido actualizado.');
  };

  return (
    <View style={{ flex:1, backgroundColor:'#000', padding:16 }}>
      <Text style={{ color:'#fff', fontSize:18, fontWeight:'800' }}>Mi Roster</Text>
      <Text style={{ color:'#9aa0a6', marginTop:4 }}>Titulares: {selected.length}/{rosterSize} • Banquillo: {bench.length}/{benchSize}</Text>

      <FlatList
        data={players.data ?? []}
        keyExtractor={(p) => p.userId}
        renderItem={({ item }) => {
          const inSel = selected.includes(item.userId);
          const inBench = bench.includes(item.userId);
          return (
            <TouchableOpacity
              onPress={() => toggle(item.userId)}
              style={{
                padding:12, borderRadius:10, marginBottom:8,
                backgroundColor: inSel ? '#102a12' : (inBench ? '#1a1420' : '#111'),
                borderWidth: 1, borderColor: inSel ? '#39ff14' : (inBench ? '#7a3cff' : '#222')
              }}
            >
              <Text style={{ color:'#fff', fontWeight:'700' }}>{item.displayName}</Text>
              <Text style={{ color:'#9aa0a6' }}>FP: {item.fantasyPoints}</Text>
              <Text style={{ color: inSel ? '#39ff14' : (inBench ? '#b388ff' : '#666') }}>
                {inSel ? 'Titular' : (inBench ? 'Banquillo' : 'Disponible')}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        onPress={save}
        disabled={updateRoster.isPending}
        style={{ backgroundColor:'#39ff14', paddingVertical:12, borderRadius:12, alignItems:'center', marginTop:10 }}
      >
        <Text style={{ color:'#000', fontWeight:'800' }}>{updateRoster.isPending ? 'Guardando…' : 'Guardar roster'}</Text>
      </TouchableOpacity>
    </View>
  );
}
// B4X4 v6.1 END