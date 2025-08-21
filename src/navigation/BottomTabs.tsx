// B4X4 v3.4 START
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useThemeB4 } from '@/ds/theme';
import { HomeIcon, BallIcon, VaultIcon, VsIcon } from '@/ds/icons';
import HomeStack from '@/navigation/stacks/HomeStack';
import PlayStack from '@/navigation/stacks/PlayStack';
import VsStack from '@/navigation/stacks/VsStack';
import VaultStack from '@/navigation/stacks/VaultStack';
// B4X4 v6.1 START
import LeaguesStack from '@/navigation/stacks/LeaguesStack';
import { TrophyIcon } from '@/ds/icons';
// B4X4 v6.1 END

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const theme = useThemeB4();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: '#000', borderTopColor: '#111', height: 62 },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ tabBarIcon: ({ focused }) => <HomeIcon color={focused ? theme.accent : theme.muted} /> }}
      />
      <Tab.Screen
        name="PlayTab"
        component={PlayStack}
        options={{ tabBarIcon: ({ focused }) => <BallIcon color={focused ? theme.accent : theme.muted} /> }}
      />
      <Tab.Screen
        name="VsTab"
        component={VsStack}
        options={{ tabBarIcon: ({ focused }) => <VsIcon color={focused ? theme.accent : theme.muted} /> }}
      />
      <Tab.Screen
        name="VaultTab"
        component={VaultStack}
        options={{ tabBarIcon: ({ focused }) => <VaultIcon color={focused ? theme.accent : theme.muted} /> }}
      />
      {/* B4X4 v6.1 START */}
      <Tab.Screen
        name="LeaguesTab"
        component={LeaguesStack}
        options={{ tabBarIcon: ({ focused }) => <TrophyIcon color={focused ? theme.accent : theme.muted} /> }}
      />
      {/* B4X4 v6.1 END */}
    </Tab.Navigator>
  );
}
// B4X4 v3.4 END