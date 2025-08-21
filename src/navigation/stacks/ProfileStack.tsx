// B4X4 v3.4 START
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '@/pages/profile/ProfileScreen';
import EditProfileScreen from '@/pages/profile/EditProfileScreen';
import { useThemeB4 } from '@/ds/theme';
// B4X4 v5.6 START
import CardEditorScreen from '@/pages/profile/CardEditorScreen';
// B4X4 v5.6 END
// B4X4 v4.8.9 START
import ReportsScreen from '@/pages/reports/ReportsScreen';
import ParentalSettingsScreen from '@/pages/parental/ParentalSettingsScreen';
// B4X4 v4.8.9 END

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  const theme = useThemeB4();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: theme.text,
        headerShadowVisible: false,
        presentation: 'modal',
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Editar' }} />
      {/* B4X4 v5.6 START */}
      <Stack.Screen name="CardEditor" component={CardEditorScreen} options={{ title: 'Editor de carta' }} />
      {/* B4X4 v5.6 END */}
      <Stack.Screen name="Reports" component={ReportsScreen} options={{ title: 'Mis reportes' }} />
      <Stack.Screen name="ParentalSettings" component={ParentalSettingsScreen} options={{ title: 'Parental' }} />
    </Stack.Navigator>
  );
}
// B4X4 v3.4 END