import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Text from '@/ds/components/Text'; 
import { themeB4 } from '@/ds/theme';
import { useAuthStore } from '@/store/useAuthStore';
import { createChallenge } from '@/features/challenges/challengesRepo';

export default function CreateChallengeScreen({ navigation }:any){
  const uid = useAuthStore().session?.uid!;
  const [title,setTitle]=useState('Reto de triples'); 
  const [rules,setRules]=useState('10 intentos'); 
  const [type,setType]=useState<'skill'|'time'|'trick'>('skill');
  const [minValidators,setMin]=useState(2);
  
  async function onCreate(){
    const deadlineAt = Date.now()+1000*60*60*24*3; // 3 días
    const id = await createChallenge({ 
      title, 
      type, 
      rules, 
      minValidators, 
      deadlineAt, 
      creatorUid: uid 
    });
    navigation.replace('ChallengeDetail',{ id });
  }
  
  return (
    <View style={{flex:1, backgroundColor:themeB4.background, padding:16}}>
      <Text>Título</Text>
      <TextInput 
        value={title} 
        onChangeText={setTitle} 
        style={{
          borderWidth:1,
          borderColor:'#333',
          borderRadius:12,
          padding:10,
          color:'#fff'
        }}
      />
      
      <Text style={{marginTop:8}}>Reglas</Text>
      <TextInput 
        value={rules} 
        onChangeText={setRules} 
        style={{
          borderWidth:1,
          borderColor:'#333',
          borderRadius:12,
          padding:10,
          color:'#fff'
        }}
      />
      
      <Text style={{marginTop:8}}>Tipo: {type}</Text>
      <View style={{flexDirection:'row', gap:8, marginTop:6}}>
        {(['skill','time','trick'] as const).map(t=>
          <TouchableOpacity 
            key={t} 
            onPress={()=>setType(t)} 
            style={{
              padding:8, 
              borderRadius:10, 
              backgroundColor: type===t?themeB4.accent:'#111'
            }}
          >
            <Text style={{color:type===t?'#000':'#fff'}}>{t}</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <TouchableOpacity 
        onPress={onCreate} 
        style={{
          marginTop:16, 
          backgroundColor:themeB4.accent, 
          padding:12, 
          borderRadius:12, 
          alignItems:'center'
        }}
      >
        <Text style={{color:'#000', fontWeight:'800'}}>Crear</Text>
      </TouchableOpacity>
    </View>
  );
}
