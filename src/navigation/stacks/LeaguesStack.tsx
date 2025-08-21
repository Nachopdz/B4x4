// B4X4 v6.1 START
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FantasyHomeScreen from '@/pages/fantasy/FantasyHomeScreen';
import MyRosterScreen from '@/pages/fantasy/MyRosterScreen';
import WeeklyMatchupScreen from '@/pages/fantasy/WeeklyMatchupScreen';
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
      <Stack.Screen name="FantasyHome" component={FantasyHomeScreen} options={{ title: 'Fantasy' }} />
      <Stack.Screen name="MyRoster" component={MyRosterScreen} options={{ title: 'Mi Roster' }} />
      <Stack.Screen name="WeeklyMatchup" component={WeeklyMatchupScreen} options={{ title: 'Matchup' }} />
    </Stack.Navigator>
  );
}
// B4X4 v6.1 END