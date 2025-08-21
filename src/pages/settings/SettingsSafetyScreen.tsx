// B4X4 v4.8 START
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import Text from '@/ds/components/Text';
import Card from '@/ds/components/Card';
import Input from '@/ds/components/Input';
import Button from '@/ds/components/Button';
import { useAuthStore } from '@/store/useAuthStore';
import { useSafety } from '@/safety/useSafety';

export default function SettingsSafetyScreen() {
  const me = useAuthStore((s) => s.session?.user?.id ?? s.session?.userId ?? 'u1');
  const age = useAuthStore((s) => s.declaredAge ?? 18);
  const { safety, update } = useSafety(me, age);
  const [pin, setPin] = useState('');

  if (safety.isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading…</Text>
      </View>
    );
  }
  const s = safety.data!;

  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 16, gap: 12 }}>
      <Text variant="title">Seguridad & parental</Text>

      <Card>
        <Text weight="semibold">Privacidad</Text>
        <Button title={`Descubrimiento: ${s.privacyPublic ? 'Público' : 'Privado'}`} onPress={() => update.mutate({ privacyPublic: !s.privacyPublic })} />
        <Button title={`Blur contenido sensible: ${s.contentBlur ? 'ON' : 'OFF'}`} onPress={() => update.mutate({ contentBlur: !s.contentBlur })} style={{ marginTop: 8 }} />
      </Card>

      <Card>
        <Text weight="semibold">Permisos</Text>
        <Button title={`Chat: ${s.allowChat ? 'Permitido' : 'Bloqueado'}`} onPress={() => update.mutate({ allowChat: !s.allowChat })} />
        <Button title={`Subidas: ${s.allowUploads ? 'Permitidas' : 'Bloqueadas'}`} onPress={() => update.mutate({ allowUploads: !s.allowUploads })} style={{ marginTop: 8 }} />
        <Button title={`Pro: ${s.allowPro ? 'Permitido' : 'Bloqueado'}`} onPress={() => update.mutate({ allowPro: !s.allowPro })} style={{ marginTop: 8 }} />
      </Card>

      <Card>
        <Text weight="semibold">Tiempo de uso</Text>
        <Input
          label="Límite diario (min, 0=sin límite)"
          keyboardType="number-pad"
          value={String(s.sessionLimitMinutes ?? 0)}
          onChangeText={(v) => update.mutate({ sessionLimitMinutes: Math.max(0, parseInt(v || '0', 10) || 0) })}
        />
      </Card>

      <Card>
        <Text weight="semibold">PIN de tutor</Text>
        <Input placeholder="PIN (opcional)" value={pin} onChangeText={setPin} keyboardType="number-pad" />
        <Button
          title="Guardar PIN"
          onPress={() => {
            update.mutate({ guardianPIN: pin });
            Alert.alert('Listo', 'PIN guardado (mock).');
          }}
        />
      </Card>

      <Text variant="muted">Nota: Coins sin cash‑out y sin azar. Pro requiere permiso del tutor.</Text>
    </View>
  );
}
// B4X4 v4.8 END