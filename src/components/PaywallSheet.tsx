// B4X4 v4.7 START
import React from 'react';
import { View, Modal } from 'react-native';
import Text from '@/ds/components/Text';
import Button from '@/ds/components/Button';

export default function PaywallSheet({ visible, onClose, onActivate }: { visible: boolean; onClose: () => void; onActivate: () => void }) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' }}>
        <View style={{ backgroundColor: '#000', padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
          <Text variant="title" style={{ marginBottom: 8 }}>
            B4X4 Pro
          </Text>
          <Text>
            • Más slots en retos/partidos
            {"\n"}
            • Sin anuncios
            {"\n"}
            • Soporte prioritario
          </Text>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
            <Button title="Activar Pro (mock)" onPress={onActivate} />
            <Button title="Cerrar" variant="outline" onPress={onClose} />
          </View>
          <Text variant="muted" style={{ marginTop: 8 }}>
            Sin azar. Sin cash‑out. Cancelable cuando quieras.
          </Text>
        </View>
      </View>
    </Modal>
  );
}
// B4X4 v4.7 END