// B4X4 v3.8 START
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReelsScreen from '@/pages/vs/ReelsScreen';
import UploadReelScreen from '@/pages/vs/UploadReelScreen';
import { useThemeB4 } from '@/ds/theme';
// B4X4 v3.9 START
import ChallengesScreen from '@/pages/vs/ChallengesScreen';
// B4X4 v3.9 END

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
      {/* v3.9 Challenges route */}
      // B4X4 v3.9 START
      <Stack.Screen name="Challenges" component={ChallengesScreen} options={{ title: 'Retos' }} />
      // B4X4 v3.9 END
    </Stack.Navigator>
  );
}
// B4X4 v3.8 END