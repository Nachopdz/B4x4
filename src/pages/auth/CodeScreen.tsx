// B4X4 v4.6 START
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import Input from '@/ds/components/Input';
import Button from '@/ds/components/Button';
import { AuthService } from '@/services/AuthService';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuthStore } from '@/store/useAuthStore';

export default function CodeScreen() {
  const route = useRoute<any>();
  const phone = route.params?.phone;
  const nav = useNavigation<any>();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const setSessionFull = useAuthStore((s) => s.setSessionFull);
  const onVerify = async () => {
    setLoading(true);
    try {
      const { session } = await AuthService.verifyCode(phone, code);
      await setSessionFull(session);
      nav.replace('AgeGate');
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Código incorrecto');
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 16, gap: 12 }}>
      <Input label="Código" value={code} onChangeText={setCode} keyboardType="number-pad" />
      <Button title="Verificar" onPress={onVerify} loading={loading} />
    </View>
  );
}
// B4X4 v4.6 END