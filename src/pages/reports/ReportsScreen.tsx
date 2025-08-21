// B4X4 v4.8 START
import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import Text from '@/ds/components/Text';
import ReportListItem from '@/components/ReportListItem';
import { useReports } from '@/hooks/useReports';
import { useAuthStore } from '@/store/useAuthStore';

export default function ReportsScreen() {
  const me = useAuthStore(s => s.session?.user?.id ?? s.session?.userId ?? 'u1');
  const { list } = useReports(me);

  if (list.isLoading) {
    return <View style={{ flex:1, backgroundColor:'#000', alignItems:'center', justifyContent:'center' }}><ActivityIndicator /><Text variant="muted" style={{ marginTop:8 }}>Cargando reportes…</Text></View>;
  }

  const data = list.data ?? [];

  return (
    <View style={{ flex:1, backgroundColor:'#000', padding:16 }}>
      <Text variant="title" style={{ marginBottom: 8 }}>Mis reportes</Text>
      <FlatList
        data={data}
        keyExtractor={(it) => it.reportId}
        renderItem={({ item }) => <ReportListItem r={item} />}
        ListEmptyComponent={<Text variant="muted">Aún no has reportado contenido.</Text>}
      />
    </View>
  );
}
// B4X4 v4.8 END