// B4X4 v3.6 START
import React, { useState } from 'react';
import { View } from 'react-native';
import Text from '@/ds/components/Text';
import Input from '@/ds/components/Input';
import Button from '@/ds/components/Button';
import Card from '@/ds/components/Card';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingBasicScreen() {
  const [handle, setHandle] = useState('');
  const [name, setName] = useState('');
  const setProfile = useAuthStore((s) => s.setProfile);
  const nav = useNavigation<any>();

  const onNext = () => {
    if (!handle) return;
    setProfile({ handle, name });
    nav.replace('Suggestions');
  };

  return (
    <View style={{ flex:1, backgroundColor:'#000', padding:16 }}>
      <Text variant="title" style={{ marginBottom: 12 }}>Tu perfil</Text>
      <Card>
        <Input label="Handle" placeholder="@nacho" value={handle} onChangeText={setHandle} helper="Tu nombre público"/>
        <Input label="Nombre" placeholder="Nacho" value={name} onChangeText={setName}/>
        <Button title="Continuar" onPress={onNext}/>
      </Card>
    </View>
  );
}
// B4X4 v3.6 END