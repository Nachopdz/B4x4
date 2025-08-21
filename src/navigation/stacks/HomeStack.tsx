// B4X4 v3.5 START
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/pages/home/HomeScreen';
import { Pressable, Image } from 'react-native';
import { useThemeB4 } from '@/ds/theme';
import { useNavigation } from '@react-navigation/native';
import DSPlaygroundScreen from '@/pages/ds/DSPlaygroundScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const theme = useThemeB4();
  const nav = useNavigation<any>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: theme.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          title: '',
          headerRight: () => (
            <Pressable onPress={() => nav.navigate('ProfileStack' as never)}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/100?img=3' }}
                style={{ width: 28, height: 28, borderRadius: 14, marginRight: 12, borderWidth: 2, borderColor: theme.accent }}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="DSPlayground"
        component={DSPlaygroundScreen}
        options={{ title: 'DS', headerShown: true }}
      />
      {/* Ejemplo de detalle opcional futuro:
      <Stack.Screen name="PostDetail" component={PostDetailScreen} /> */}
    </Stack.Navigator>
  );
}
// B4X4 v3.5 END