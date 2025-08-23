import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import Text from '@/ds/components/Text'; 
import { themeB4 } from '@/ds/theme';
import { getChallenge, addAttempt, listAttempts } from '@/features/challenges/challengesRepo';
import { useAuthStore } from '@/store/useAuthStore';
import { pickMedia } from '@/features/media/picker';
import { uploadMedia } from '@/features/media/uploader';

export default function ChallengeDetailScreen({ route, navigation }:any){
  const { id } = route.params; 
  const uid = useAuthStore().session?.uid!;
  const [ch,setCh]=useState<any>(null); 
  const [attempts,setAttempts]=useState<any[]>([]);
  
  useEffect(()=>{ 
    (async()=>{ 
      setCh(await getChallenge(id)); 
      setAttempts(await listAttempts(id)); 
    })(); 
  },[id]);
  
  async function onUpload(){
    const m = await pickMedia(); 
    if(!m) return;
    const { url } = await uploadMedia(uid,'reels', m.uri, m.type==='video'?'mp4':'jpg');
    await addAttempt(id, uid, url, '');
    setAttempts(await listAttempts(id));
  }
  
  if(!ch) return null;
  
  return (
    <View style={{flex:1, backgroundColor:themeB4.background, padding:12}}>
      <Text style={{fontSize:20}}>{ch.title}</Text>
      <Text style={{opacity:.7, marginBottom:8}}>{ch.rules}</Text>
      
      <TouchableOpacity 
        onPress={onUpload} 
        style={{
          backgroundColor:themeB4.accent,
          padding:10,
          borderRadius:12, 
          alignItems:'center', 
          marginBottom:12
        }}
      >
        <Text style={{color:'#000', fontWeight:'800'}}>Subir intento</Text>
      </TouchableOpacity>
      
      <Text style={{marginBottom:6, opacity:.7}}>Intentos</Text>
      <FlatList 
        data={attempts} 
        keyExtractor={(it)=>it.id}
        renderItem={({item})=>(
          <View style={{
            backgroundColor:'#0a0a0a', 
            padding:8, 
            borderRadius:12, 
            marginBottom:8
          }}>
            <Text>{item.uid}</Text>
            <Text style={{opacity:.6}}>estado: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}
