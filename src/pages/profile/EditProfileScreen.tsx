// B4X4 v3.4 START
import React from 'react';
import { View, Text } from 'react-native';
import { useThemeB4 } from '@/ds/theme';

export default function EditProfileScreen() {
  const theme = useThemeB4();
  return (
    <View style={{ flex:1, backgroundColor:'#000', padding:16 }}>
      <Text style={{ color: theme.text, fontSize: 22 }}>Editar Perfil</Text>
    </View>
  );
}
// B4X4 v3.4 END