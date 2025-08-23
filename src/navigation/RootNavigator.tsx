import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import ProfileStack from '@/navigation/stacks/ProfileStack';
import AuthStack from '@/navigation/stacks/AuthStack';
import { useAuthStore } from '@/store/useAuthStore';

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
  const { ready, session } = useAuthStore();
  
  if(!ready){ 
    return (
      <View style={{flex:1, backgroundColor:'#000', alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator size="large" color="#39FF14" />
      </View>
    ); 
  }
  
  return (
    <NavigationContainer theme={navTheme} linking={linking}>
      <Root.Navigator screenOptions={{ headerShown: false }}>
        {session ? (
          <>
            <Root.Screen name="Main" component={BottomTabs} />
            <Root.Screen name="ProfileStack" component={ProfileStack} />
          </>
        ) : (
          <Root.Screen name="Auth" component={AuthStack} />
        )}
      </Root.Navigator>
    </NavigationContainer>
  );
}