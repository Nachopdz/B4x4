// B4X4 v4.6 START
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Text from '@/ds/components/Text';
import Button from '@/ds/components/Button';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const hydrate = useAuthStore((s) => s.hydrate);
  const nav = useNavigation<any>();
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 16, justifyContent: 'center', gap: 12 }}>
      <Text variant="title">B4X4</Text>
      <Text variant="muted">Inicia con tu teléfono para entrar a la comunidad.</Text>
      <Button title="Continuar" onPress={() => nav.navigate('PhoneScreen')} />
    </View>
  );
}
// B4X4 v4.6 END