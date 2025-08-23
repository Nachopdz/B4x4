import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Text from '@/ds/components/Text'; 
import { useThemeB4 } from '@/ds/theme';

export default function CodeScreen({ route, navigation }: any){
  const { handle } = route.params;
  const [code, setCode] = useState(''); 
  const [loading, setLoading] = useState(false);
  const theme = useThemeB4();

  async function onConfirm(){
    setLoading(true);
    try{
      await handle.verify(code);
      navigation.replace('ProfileSetupScreen');
    } finally { setLoading(false); }
  }

  return (
    <View style={{flex:1, backgroundColor:theme.background, padding:24, justifyContent:'center'}}>
      <Text style={{fontSize:22, marginBottom:12}}>Código SMS</Text>
      <TextInput value={code} onChangeText={setCode} keyboardType="number-pad" maxLength={6}
        placeholder="123456" placeholderTextColor={theme.muted}
        style={{borderWidth:1,borderColor:'#333',borderRadius:12,padding:12,color:'#fff',letterSpacing:4}} />
      <TouchableOpacity onPress={onConfirm} disabled={loading || code.length<6}
        style={{marginTop:16, backgroundColor:theme.accent, padding:14, borderRadius:12, alignItems:'center'}}>
        <Text style={{color:'#000', fontWeight:'800'}}>{loading?'Verificando...':'Confirmar'}</Text>
      </TouchableOpacity>
    </View>
  );
}