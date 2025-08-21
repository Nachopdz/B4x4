// B4X4 v4.6 START
import React, { useState } from 'react';
import { View } from 'react-native';
import Input from '@/ds/components/Input';
import Button from '@/ds/components/Button';
import Text from '@/ds/components/Text';
import { AuthService } from '@/services/AuthService';
import { useNavigation } from '@react-navigation/native';

export default function PhoneScreen() {
  const [phone, setPhone] = useState('');
  const [dbg, setDbg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigation<any>();
  const onSend = async () => {
    setLoading(true);
    try {
      const res = await AuthService.requestCode(phone);
      setDbg(res.debugCode);
      nav.navigate('Code', { phone });
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 16, gap: 12 }}>
      <Input label="Teléfono" placeholder="+34 6XX..." value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Button title="Enviar código" onPress={onSend} loading={loading} />
      {dbg && <Text variant="muted">Código (dev): {dbg}</Text>}
    </View>
  );
}
// B4X4 v4.6 END