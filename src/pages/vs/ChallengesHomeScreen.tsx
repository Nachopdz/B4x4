import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import Text from '@/ds/components/Text'; 
import { themeB4 } from '@/ds/theme';
import { listOpenChallenges } from '@/features/challenges/challengesRepo';

export default function ChallengesHomeScreen({ navigation }:any){
  const [items,setItems]=useState<any[]>([]);
  
  useEffect(()=>{ 
    (async()=> setItems(await listOpenChallenges()))(); 
  },[]);
  
  return (
    <View style={{flex:1, backgroundColor:themeB4.background, padding:12}}>
      <TouchableOpacity 
        onPress={()=>navigation.navigate('CreateChallenge')} 
        style={{
          backgroundColor:themeB4.accent,
          padding:12,
          borderRadius:12,
          marginBottom:12
        }}
      >
        <Text style={{color:'#000', fontWeight:'800'}}>Crear reto</Text>
      </TouchableOpacity>
      
      <FlatList 
        data={items} 
        keyExtractor={(it)=>it.id}
        renderItem={({item})=>(
          <TouchableOpacity 
            onPress={()=>navigation.navigate('ChallengeDetail',{id:item.id})}
            style={{
              padding:12,
              borderRadius:12,
              backgroundColor:'#0a0a0a', 
              marginBottom:10
            }}
          >
            <Text style={{fontSize:18}}>{item.title}</Text>
            <Text style={{opacity:.6, marginTop:4}}>
              {item.type} · min validators: {item.minValidators}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
