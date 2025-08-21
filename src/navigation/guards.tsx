// B4X4 v4.6 START
import React from 'react';
import { View } from 'react-native';
import Text from '@/ds/components/Text';
import { useAuthStore } from '@/store/useAuthStore';

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const session = useAuthStore((s) => s.session);
  if (!session) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
        <Text>Inicia sesión para continuar</Text>
      </View>
    );
  }
  return <>{children}</>;
}
// B4X4 v4.6 END