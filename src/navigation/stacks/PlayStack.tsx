// B4X4 v4.4 START
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayListScreen from '@/pages/play/PlayListScreen';
import CreateMatchScreen from '@/pages/play/CreateMatchScreen';
import MatchDetailScreen from '@/pages/play/MatchDetailScreen';

const Stack = createNativeStackNavigator();

export default function PlayStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="PlayList" component={PlayListScreen} options={{ title: 'Jugar' }} />
      <Stack.Screen name="CreateMatch" component={CreateMatchScreen} options={{ title: 'Crear partido' }} />
      <Stack.Screen name="MatchDetail" component={MatchDetailScreen} options={{ title: 'Partido' }} />
    </Stack.Navigator>
  );
}
// B4X4 v4.4 END