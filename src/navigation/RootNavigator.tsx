// B4X4 v3.4 START
import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import ProfileStack from '@/navigation/stacks/ProfileStack';
// B4X4 v4.6 START
import AuthStack from '@/navigation/stacks/AuthStack';
import { useAuthStore } from '@/store/useAuthStore';
// B4X4 v4.6 END

const Root = createNativeStackNavigator();

const navTheme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#000000' } };

const linking = {
  prefixes: ['b4x4://'],
  config: {
    screens: {
      Main: {
        screens: {
          HomeTab: { screens: { HomeMain: 'home' } },
          PlayTab: { screens: { PlayMain: 'play' } },
          VsTab: { screens: { VsMain: 'vs' } },
          VaultTab: { screens: { VaultMain: 'vault' } },
        },
      },
      ProfileStack: {
        screens: {
          Profile: 'user/:handle',
          EditProfile: 'user/:handle/edit',
        },
      },
      Match: 'match/:id',
      Challenge: 'challenge/:id',
      League: 'league/:id',
    },
  },
};

export default function RootNavigator() {
  useEffect(() => {
    console.log('[Linking] configured', linking);
  }, []);
  // B4X4 v4.6 START
  const session = useAuthStore((s) => s.session);
  // B4X4 v4.6 END

  return (
    <NavigationContainer theme={navTheme} linking={linking}>
      <Root.Navigator screenOptions={{ headerShown: false }}>
        {
          // B4X4 v4.6 START
          session ? (
            <>
              <Root.Screen name="Main" component={BottomTabs} />
              <Root.Screen name="ProfileStack" component={ProfileStack} />
            </>
          ) : (
            <Root.Screen name="Auth" component={AuthStack} />
          )
          // B4X4 v4.6 END
        }
      </Root.Navigator>
    </NavigationContainer>
  );
}
// B4X4 v3.4 END