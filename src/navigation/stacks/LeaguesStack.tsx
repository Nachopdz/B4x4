// B4X4 v6.1 START
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LeaguesHomeScreen from '@/pages/leagues/LeaguesHomeScreen';
import CreateLeagueScreen from '@/pages/leagues/CreateLeagueScreen';
import LeagueDetailScreen from '@/pages/leagues/LeagueDetailScreen';
import CreateMatchScreen from '@/pages/leagues/CreateMatchScreen';
import MatchDetailScreen from '@/pages/leagues/MatchDetailScreen';
import { useThemeB4 } from '@/ds/theme';

const Stack = createNativeStackNavigator();

export default function LeaguesStack() {
  const theme = useThemeB4();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: theme.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="LeaguesHome" component={LeaguesHomeScreen} options={{ title: 'Ligas' }} />
      <Stack.Screen name="CreateLeague" component={CreateLeagueScreen} options={{ title: 'Crear Liga' }} />
      <Stack.Screen name="LeagueDetail" component={LeagueDetailScreen} options={{ title: 'Detalle Liga' }} />
      <Stack.Screen name="CreateMatch" component={CreateMatchScreen} options={{ title: 'Crear Partido' }} />
      <Stack.Screen name="MatchDetail" component={MatchDetailScreen} options={{ title: 'Detalle Partido' }} />
    </Stack.Navigator>
  );
}
// B4X4 v6.1 END