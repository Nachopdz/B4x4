import React, { useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import Constants from 'expo-constants';
import Text from '@/ds/components/Text';
import { useThemeB4 } from '@/ds/theme';
import { startPhoneLogin } from '@/features/auth/phoneAuth';

export default function PhoneScreen({ navigation }: any){
  const recaptchaRef = useRef<any>(null);
  const [phone, setPhone] = useState('+34');
  const [loading, setLoading] = useState(false);
  const theme = useThemeB4();

  async function onSend(){
    if(!recaptchaRef.current) return;
    setLoading(true);
    try{
      const handle = await startPhoneLogin(phone, recaptchaRef.current);
      navigation.replace('CodeScreen', { handle });
    } finally { setLoading(false); }
  }

  return (
    <View style={{flex:1, backgroundColor:theme.background, padding:24, justifyContent:'center'}}>
      <FirebaseRecaptchaVerifierModal ref={recaptchaRef} firebaseConfig={Constants.expoConfig?.extra?.firebase ?? {}} />
      <Text style={{fontSize:22, marginBottom:12}}>Tu teléfono</Text>
      <TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad"
        placeholder="+34XXXXXXXXX" placeholderTextColor={theme.muted}
        style={{borderWidth:1,borderColor:'#333',borderRadius:12,padding:12,color:'#fff'}} />
      <TouchableOpacity onPress={onSend} disabled={loading}
        style={{marginTop:16, backgroundColor:theme.accent, padding:14, borderRadius:12, alignItems:'center'}}>
        <Text style={{color:'#000', fontWeight:'800'}}>{loading?'Enviando...':'Enviar código'}</Text>
      </TouchableOpacity>
    </View>
  );
}