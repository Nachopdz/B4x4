// B4X4 v4.6 START
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '@/pages/auth/WelcomeScreen';
import PhoneScreen from '@/pages/auth/PhoneScreen';
import CodeScreen from '@/pages/auth/CodeScreen';
import AgeGateScreen from '@/pages/auth/AgeGateScreen';
import ConsentScreen from '@/pages/auth/ConsentScreen';
import ProfileSetupScreen from '@/pages/auth/ProfileSetupScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: '#000' }, headerTintColor: '#fff', headerShadowVisible: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: '' }} />
      <Stack.Screen name="PhoneScreen" component={PhoneScreen} options={{ title: 'Tu teléfono' }} />
      <Stack.Screen name="CodeScreen" component={CodeScreen} options={{ title: 'Verificar código' }} />
      <Stack.Screen name="AgeGate" component={AgeGateScreen} options={{ title: 'Tu edad' }} />
      <Stack.Screen name="Consent" component={ConsentScreen} options={{ title: 'Consentimiento' }} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} options={{ title: 'Tu perfil' }} />
    </Stack.Navigator>
  );
}
// B4X4 v4.6 END