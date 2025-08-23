import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '@/ds/components/Text'; 
import { themeB4 } from '@/ds/theme';
import { pickMedia } from '@/features/media/picker';
import { uploadMedia } from '@/features/media/uploader';
import { createReel } from '@/features/feed/reelsRepo';
import { useAuthStore } from '@/store/useAuthStore';

export default function UploadReelScreen({ navigation }: any){
  const uid = useAuthStore().session?.uid!;
  const [busy,setBusy]=useState(false);
  
  async function onPick(){
    const m = await pickMedia(); 
    if(!m) return;
    setBusy(true);
    try{
      const ext = m.type==='video' ? 'mp4':'jpg';
      const { url } = await uploadMedia(uid,'reels',m.uri,ext);
      await createReel(uid, url);
      navigation.goBack();
    } finally { 
      setBusy(false); 
    }
  }
  
  return (
    <View style={{flex:1, backgroundColor:themeB4.background, alignItems:'center', justifyContent:'center', padding:24}}>
      <Text style={{fontSize:22, marginBottom:12}}>Sube tu clip</Text>
      <TouchableOpacity onPress={onPick} disabled={busy}
        style={{backgroundColor: themeB4.accent, padding:16, borderRadius:16}}>
        <Text style={{color:'#000', fontWeight:'800'}}>
          {busy?'Subiendo…':'Elegir y subir'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}