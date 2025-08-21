// B4X4 v3.6 START
import React, { useState } from 'react';
import { View } from 'react-native';
import Text from '@/ds/components/Text';
import Button from '@/ds/components/Button';
import Card from '@/ds/components/Card';
import Badge from '@/ds/components/Badge';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigation } from '@react-navigation/native';

export default function TermsScreen() {
  const [accepted, setAccepted] = useState(false);
  const setProfile = useAuthStore((s) => s.setProfile);
  const nav = useNavigation<any>();

  const onAccept = () => {
    setProfile({ tosAccepted: true });
    nav.replace('OnboardingBasic');
  };

  return (
    <View style={{ flex:1, backgroundColor:'#000', padding:16 }}>
      <Text variant="title" style={{ marginBottom: 12 }}>Términos y Privacidad</Text>
      <Card>
        <Text variant="body">Acepta los Términos y la Política de Privacidad para continuar.</Text>
        <Badge label="Sin cash-out, sin azar, control menores" variant="muted" style={{ marginTop: 8 }}/>
        <Button title={accepted ? 'Continuar' : 'Acepto'} onPress={() => (accepted ? onAccept() : setAccepted(true))}/>
      </Card>
    </View>
  );
}
// B4X4 v3.6 END