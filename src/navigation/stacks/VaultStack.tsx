// B4X4 v4.7 START
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useThemeB4 } from '@/ds/theme';
import VaultHomeScreen from '@/pages/vault/VaultHomeScreen';
import SkinsScreen from '@/pages/vault/SkinsScreen';

const Stack = createNativeStackNavigator();

export default function VaultStack() {
  const theme = useThemeB4();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: theme.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="VaultHome" component={VaultHomeScreen} options={{ title: 'Vault' }} />
      <Stack.Screen name="Skins" component={SkinsScreen} options={{ title: 'Skins' }} />
    </Stack.Navigator>
  );
}
// B4X4 v4.7 END