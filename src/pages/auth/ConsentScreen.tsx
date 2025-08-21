// B4X4 v4.6 START
import React from 'react';
import { View } from 'react-native';
import Text from '@/ds/components/Text';
import Button from '@/ds/components/Button';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigation } from '@react-navigation/native';

export default function ConsentScreen() {
  const setConsentOk = useAuthStore((s) => s.setConsentOk);
  const nav = useNavigation<any>();
  const onAccept = async () => {
    await setConsentOk(true);
    nav.replace('ProfileSetup');
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 16, gap: 12 }}>
      <Text variant="title">Consentimiento</Text>
      <Text variant="muted">Acepta Términos y Privacidad (mock) para continuar.</Text>
      <Button title="Acepto" onPress={onAccept} />
    </View>
  );
}
// B4X4 v4.6 END