// B4X4 v3.6 START
import React, { useState } from 'react';
import { View } from 'react-native';
import Text from '@/ds/components/Text';
import Input from '@/ds/components/Input';
import Button from '@/ds/components/Button';
import Card from '@/ds/components/Card';
import { PhoneAuthService } from '@/services/PhoneAuthService';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuthStore } from '@/store/useAuthStore';

export default function OtpVerifyScreen() {
  const route = useRoute<any>();
  const nav = useNavigation<any>();
  const setSession = useAuthStore((s) => s.setSession);
  const [code, setCode] = useState('');
  const [err, setErr] = useState<string>();

  const onVerify = async () => {
    try {
      setErr(undefined);
      const { sessionId, phone } = route.params;
      const r = await PhoneAuthService.verify(sessionId, code);
      setSession({ userId: r.userId, phone });
      nav.replace('AgeGate');
    } catch (e: any) {
      setErr(e.message ?? 'Código incorrecto');
    }
  };

  return (
    <View style={{ flex:1, backgroundColor:'#000', padding:16 }}>
      <Text variant="title" style={{ marginBottom: 12 }}>Código de verificación</Text>
      <Card>
        <Input label="Código" placeholder="123456" keyboardType="number-pad" maxLength={6} value={code} onChangeText={setCode} error={err}/>
        <Button title="Verificar" onPress={onVerify}/>
      </Card>
    </View>
  );
}
// B4X4 v3.6 END