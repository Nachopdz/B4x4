// B4X4 v4.6 START
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import Input from '@/ds/components/Input';
import Button from '@/ds/components/Button';
import Text from '@/ds/components/Text';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigation } from '@react-navigation/native';

export default function AgeGateScreen() {
  const [age, setAge] = useState('');
  const nav = useNavigation<any>();
  const setAgeOk = useAuthStore((s) => s.setAgeOk);
  const setDeclaredAge = useAuthStore((s) => s.setDeclaredAge);
  const onNext = async () => {
    const a = parseInt(age, 10);
    if (isNaN(a) || a < 1) return Alert.alert('Edad', 'Introduce una edad válida');
    if (a < 13) return Alert.alert('Edad', 'Debes tener 13 años o más');
    await setAgeOk(true);
    await setDeclaredAge(a);
    nav.replace('Consent');
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 16, gap: 12 }}>
      <Text variant="title">Tu edad</Text>
      <Input label="Edad" value={age} onChangeText={setAge} keyboardType="number-pad" />
      <Button title="Continuar" onPress={onNext} />
    </View>
  );
}
// B4X4 v4.6 END