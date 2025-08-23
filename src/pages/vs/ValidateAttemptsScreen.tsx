import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import Text from '@/ds/components/Text'; 
import { themeB4 } from '@/ds/theme';
import { listAttempts, addValidation } from '@/features/challenges/challengesRepo';
import { useAuthStore } from '@/store/useAuthStore';

export default function ValidateAttemptsScreen({ route }:any){
  const { id } = route.params; 
  const uid = useAuthStore().session?.uid!;
  const [items,setItems]=useState<any[]>([]);
  
  useEffect(()=>{ 
    (async()=> setItems(await listAttempts(id)))(); 
  },[id]);
  
  async function vote(targetUid:string, decision:'approve'|'reject'){
    await addValidation(id, uid, targetUid, decision);
  }
  
  return (
    <FlatList 
      style={{flex:1, backgroundColor:themeB4.background, padding:12}}
      data={items} 
      keyExtractor={(it)=>it.id}
      renderItem={({item})=>(
        <View style={{
          backgroundColor:'#0a0a0a', 
          padding:10, 
          borderRadius:12, 
          marginBottom:10
        }}>
          <Text>{item.uid}</Text>
          <Text style={{opacity:.6}}>estado: {item.status}</Text>
          <View style={{flexDirection:'row', gap:8, marginTop:8}}>
            <TouchableOpacity 
              onPress={()=>vote(item.id,'approve')} 
              style={{
                backgroundColor:themeB4.accent, 
                padding:8, 
                borderRadius:8
              }}
            >
              <Text style={{color:'#000'}}>Aprobar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={()=>vote(item.id,'reject')} 
              style={{
                backgroundColor:themeB4.danger, 
                padding:8, 
                borderRadius:8
              }}
            >
              <Text>Rechazar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}
