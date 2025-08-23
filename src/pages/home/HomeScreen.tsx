import React, { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';
import Text from '@/ds/components/Text'; 
import { themeB4 } from '@/ds/theme';
import { listPosts } from '@/features/feed/postsRepo';

export default function HomeScreen(){
  const [items,setItems]=useState<any[]>([]); 
  const [loading,setLoading]=useState(true);
  
  useEffect(()=>{ 
    (async()=>{ 
      setItems(await listPosts()); 
      setLoading(false); 
    })(); 
  },[]);
  
  if(loading) return (
    <View style={{flex:1,backgroundColor:'#000',alignItems:'center',justifyContent:'center'}}>
      <Text>Cargando…</Text>
    </View>
  );
  
  return (
    <FlatList 
      style={{flex:1, backgroundColor:themeB4.background, padding:12}}
      data={items}
      keyExtractor={(it)=>it.id}
      ListEmptyComponent={
        <Text style={{opacity:.6, textAlign:'center', marginTop:40}}>
          Sin publicaciones aún
        </Text>
      }
      renderItem={({item})=>(
        <View style={{
          borderWidth:1, 
          borderColor:'#111', 
          borderRadius:16, 
          padding:12, 
          marginBottom:12, 
          backgroundColor:'#0a0a0a'
        }}>
          {item.mediaUrl ? (
            <Image 
              source={{uri:item.mediaUrl}} 
              style={{width:'100%', height:220, borderRadius:12}}
            />
          ) : null}
          <Text style={{marginTop:8}}>{item.text||'—'}</Text>
        </View>
      )}
    />
  );
}