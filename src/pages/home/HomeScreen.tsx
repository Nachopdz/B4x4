// B4X4 v3.5 START
import React from 'react';
import { View } from 'react-native';
import Text from '@/ds/components/Text';
import Card from '@/ds/components/Card';
import Button from '@/ds/components/Button';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const nav = useNavigation<any>();
  return (
    <View style={{ flex:1, backgroundColor:'#000', padding:16 }}>
      <Text variant="title" style={{ marginBottom: 12 }}>Home</Text>
      <Card style={{ marginBottom: 12 }}>
        <Text variant="body" style={{ marginBottom: 8 }}>Bienvenido a B4X4</Text>
        <Button title="Abrir DS Playground" onPress={() => nav.navigate('DSPlayground')} />
      </Card>
    </View>
  );
}
// B4X4 v3.5 END