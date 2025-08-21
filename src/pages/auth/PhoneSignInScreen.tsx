// B4X4 v3.6 START
import React, { useState } from 'react';
import { View } from 'react-native';
import Text from '@/ds/components/Text';
import Input from '@/ds/components/Input';
import Button from '@/ds/components/Button';
import Card from '@/ds/components/Card';
import { PhoneAuthService } from '@/services/PhoneAuthService';
import { useNavigation } from '@react-navigation/native';

export default function PhoneSignInScreen() {
  const nav = useNavigation<any>();
  const [phone, setPhone] = useState('+34');
  const [err, setErr] = useState<string>();

  const onSend = async () => {
    try {
      setErr(undefined);
      const e164 = phone.replace(/\s+/g, '');
      const r = await PhoneAuthService.start(e164);
      nav.navigate('OtpVerify', { sessionId: r.sessionId, phone: e164 });
    } catch (e: any) {
      setErr(e.message ?? 'Error enviando SMS');
    }
  };

  return (
    <View style={{ flex:1, backgroundColor:'#000', padding:16 }}>
      <Text variant="title" style={{ marginBottom: 12 }}>Entrar con teléfono</Text>
      <Card>
        <Input label="Teléfono" placeholder="+34 600 000 000" keyboardType="phone-pad" value={phone} onChangeText={setPhone} helper="Recibirás un código por SMS" error={err}/>
        <Button title="Enviar código" onPress={onSend}/>
        <Text variant="caption" style={{ marginTop: 8 }}>Modo mock: el código es 123456</Text>
      </Card>
    </View>
  );
}
// B4X4 v3.6 END