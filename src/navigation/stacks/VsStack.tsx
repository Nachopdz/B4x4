import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReelsScreen from '@/pages/vs/ReelsScreen';
import UploadReelScreen from '@/pages/vs/UploadReelScreen';
import ChallengesHomeScreen from '@/pages/vs/ChallengesHomeScreen';
import CreateChallengeScreen from '@/pages/vs/CreateChallengeScreen';
import ChallengeDetailScreen from '@/pages/vs/ChallengeDetailScreen';
import ValidateAttemptsScreen from '@/pages/vs/ValidateAttemptsScreen';
import { useThemeB4 } from '@/ds/theme';

const Stack = createNativeStackNavigator();

export default function VsStack() {
  const theme = useThemeB4();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: theme.text,
        headerShadowVisible: false,
        title: '',
      }}
    >
      <Stack.Screen name="Reels" component={ReelsScreen} options={{ title: '' }} />
      <Stack.Screen name="UploadReel" component={UploadReelScreen} options={{ title: 'Subir' }} />
      
      {/* Challenges routes */}
      <Stack.Screen name="Challenges" component={ChallengesHomeScreen} options={{ title: 'Retos' }} />
      <Stack.Screen name="CreateChallenge" component={CreateChallengeScreen} options={{ title: 'Crear Reto' }} />
      <Stack.Screen name="ChallengeDetail" component={ChallengeDetailScreen} options={{ title: 'Detalle' }} />
      <Stack.Screen name="ValidateAttempts" component={ValidateAttemptsScreen} options={{ title: 'Validar' }} />
    </Stack.Navigator>
  );
}