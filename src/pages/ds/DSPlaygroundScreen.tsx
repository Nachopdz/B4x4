// B4X4 v3.5 START
import React from 'react';
import { ScrollView, View } from 'react-native';
import Text from '@/ds/components/Text';
import Button from '@/ds/components/Button';
import Input from '@/ds/components/Input';
import Card from '@/ds/components/Card';
import Badge from '@/ds/components/Badge';
import { useAuthStore } from '@/store/useAuthStore';
import { GlobalRole } from '@/ds/tokens';

const roles: GlobalRole[] = ['owner','admin','org','captain','player_baxa','viewer_player','viewer'];

export default function DSPlaygroundScreen() {
  const role = useAuthStore((s) => s.role);
  const setRole = useAuthStore((s) => s.setRole);

  return (
    <ScrollView style={{ flex:1, backgroundColor:'#000' }} contentContainerStyle={{ padding:16 }}>
      <Text variant="title" style={{ marginBottom: 12 }}>Design System v1</Text>
      <Text variant="muted" style={{ marginBottom: 8 }}>Rol actual: {role}</Text>
      <View style={{ flexDirection:'row', flexWrap:'wrap', gap:8, marginBottom: 16 }}>
        {roles.map(r => (
          <Button key={r} title={r} variant={r===role?'primary':'outline'} size="sm" onPress={() => setRole(r)} />
        ))}
      </View>

      <Card style={{ marginBottom: 16 }}>
        <Text variant="subtitle" weight="semibold" style={{ marginBottom: 10 }}>Buttons</Text>
        <View style={{ flexDirection:'row', gap:10, flexWrap:'wrap' }}>
          <Button title="Primary" />
          <Button title="Outline" variant="outline" />
          <Button title="Ghost" variant="ghost" />
          <Button title="Loading" loading />
          <Button title="Disabled" disabled />
        </View>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Text variant="subtitle" weight="semibold" style={{ marginBottom: 10 }}>Inputs</Text>
        <Input label="Usuario" placeholder="@handle" helper="Tu nombre público" />
        <Input label="Teléfono" placeholder="+34 600 000 000" keyboardType="phone-pad" />
        <Input label="Código" placeholder="123456" error="Código inválido" keyboardType="number-pad" />
      </Card>

      <Card>
        <Text variant="subtitle" weight="semibold" style={{ marginBottom: 10 }}>Badges</Text>
        <View style={{ flexDirection:'row', gap:8, flexWrap:'wrap' }}>
          <Badge label="Accent" />
          <Badge label="Success" variant="success" />
          <Badge label="Danger" variant="danger" />
          <Badge label="Muted" variant="muted" />
        </View>
      </Card>
    </ScrollView>
  );
}
// B4X4 v3.5 END