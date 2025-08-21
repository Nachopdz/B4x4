// B4X4 v4.4 START
import React, { useState } from 'react';
import { View } from 'react-native';
import Input from '@/ds/components/Input';
import Button from '@/ds/components/Button';

export default function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState('');
  return (
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <Input placeholder="Escribe un mensaje…" value={text} onChangeText={setText} />
      </View>
      <Button
        title="Enviar"
        onPress={() => {
          if (text.trim()) {
            onSend(text.trim());
            setText('');
          }
        }}
      />
    </View>
  );
}
// B4X4 v4.4 END