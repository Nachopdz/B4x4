// B4X4 v4.6 START
import React, { useState } from 'react';
import { View } from 'react-native';
import Input from '@/ds/components/Input';
import Button from '@/ds/components/Button';
import { useAuthStore } from '@/store/useAuthStore';
import { AuthService } from '@/services/AuthService';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileSetupScreen() {
  const sessionLegacy = useAuthStore((s) => s.session); // legacy
  const setSessionFull = useAuthStore((s) => s.setSessionFull);
  const [handle, setHandle] = useState(sessionLegacy?.userId ? `user${sessionLegacy.userId}` : '');
  const [name, setName] = useState('');
  const nav = useNavigation<any>();

  const onSave = async () => {
    // Hydrate full session from storage to update profile (mock flow)
    const raw = await AsyncStorage.getItem('b4x4_session');
    if (raw) {
      const sess = JSON.parse(raw);
      const updated = await AuthService.updateProfile(sess, { handle, name });
      await setSessionFull(updated);
    }
    nav.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 16, gap: 12 }}>
      <Input label="Handle" value={handle} onChangeText={setHandle} />
      <Input label="Nombre" value={name} onChangeText={setName} />
      <Button title="Empezar" onPress={onSave} />
    </View>
  );
}
// B4X4 v4.6 END