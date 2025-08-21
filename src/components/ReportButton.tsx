// B4X4 v4.8 START
import React from 'react';
import { Alert, Pressable } from 'react-native';
import Text from '@/ds/components/Text';
import { ModerationService } from '@/services/ModerationService';
import { useAuthStore } from '@/store/useAuthStore';

export default function ReportButton({ targetId, targetType }:{ targetId: string; targetType: 'post'|'comment'|'challenge' }) {
  const me = useAuthStore(s => s.session?.user?.id ?? s.session?.userId ?? 'u1');

  const onPress = () => {
    Alert.alert('Reportar', '¿Quieres reportar este contenido?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Reportar', style: 'destructive', onPress: async () => {
        await ModerationService.report(me, targetId, targetType, 'abuse');
        Alert.alert('Gracias', 'Reporte enviado (mock).');
      } },
    ]);
  };

  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Reportar" onPress={onPress}>
      <Text variant="muted">Reportar</Text>
    </Pressable>
  );
}
// B4X4 v4.8 END