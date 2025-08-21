// B4X4 v4.8 START
import React, { useState } from 'react';
import { View } from 'react-native';
import Text from '@/ds/components/Text';
import Card from '@/ds/components/Card';
import Input from '@/ds/components/Input';
import Button from '@/ds/components/Button';
import { useAuthStore } from '@/store/useAuthStore';
import { useParental } from '@/hooks/useParental';

export default function ParentalSettingsScreen() {
  const me = useAuthStore(s => s.session?.user?.id ?? s.session?.userId ?? 'u1');
  const { settings, update } = useParental(me);

  if (settings.isLoading) {
    return <View style={{ flex:1, backgroundColor:'#000', alignItems:'center', justifyContent:'center' }}><Text>Loading…</Text></View>;
  }
  const s = settings.data!;

  return (
    <View style={{ flex:1, backgroundColor:'#000', padding:16, gap:12 }}>
      <Text variant="title">Controles parentales</Text>

      <Card>
        <Text weight="semibold">Safe Mode</Text>
        <Button title={`Safe Mode: ${s.safeMode ? 'ON' : 'OFF'}`} onPress={() => update.mutate({ safeMode: !s.safeMode })} />
      </Card>

      <Card>
        <Text weight="semibold">Tiempo máximo diario (min)</Text>
        <Input
          label="Minutos (vacío = ilimitado)"
          value={s.maxDailyTime == null ? '' : String(s.maxDailyTime)}
          onChangeText={(v) => update.mutate({ maxDailyTime: v === '' ? null : Math.max(0, parseInt(v, 10) || 0) })}
          keyboardType="number-pad"
        />
      </Card>

      <Text variant="muted">Estos ajustes son locales (mock) y se guardan por usuario.</Text>
    </View>
  );
}
// B4X4 v4.8 END