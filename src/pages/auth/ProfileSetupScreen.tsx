import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Text from '@/ds/components/Text'; 
import { useThemeB4 } from '@/ds/theme';
import { useAuthStore } from '@/store/useAuthStore';
import { getUser, updateUser } from '@/features/users/userService';

const ROLES = ['player','creator','viewer','organizer','mod','admin'] as const;
type Role = typeof ROLES[number];

export default function ProfileSetupScreen({ navigation }:any){
  const s = useAuthStore(); 
  const uid = s.session?.uid!;
  const [displayName,setDisplayName]=useState(''); 
  const [city,setCity]=useState('');
  const [role,setRole]=useState<Role>('player'); 
  const [saving,setSaving]=useState(false);
  const theme = useThemeB4();

  useEffect(()=>{ 
    (async()=>{ 
      const me=await getUser(uid); 
      if(me){ 
        setDisplayName(me.displayName??''); 
        setCity(me.city??''); 
        setRole((me.role??'player') as Role);
      } 
    })(); 
  },[uid]);

  async function onSave(){
    setSaving(true); 
    await updateUser(uid,{ displayName, city, role }); 
    setSaving(false);
    navigation.replace('Main'); // entra a la app
  }

  return (
    <View style={{flex:1, backgroundColor:theme.background, padding:24}}>
      <Text style={{fontSize:22, marginBottom:12}}>Tu perfil</Text>
      <Text style={{marginTop:8}}>Nombre visible</Text>
      <TextInput value={displayName} onChangeText={setDisplayName} placeholder="Tu nombre"
        placeholderTextColor={theme.muted} style={{borderWidth:1,borderColor:'#333',borderRadius:12,padding:12,color:'#fff'}}/>
      <Text style={{marginTop:12}}>Ciudad</Text>
      <TextInput value={city} onChangeText={setCity} placeholder="Ciudad"
        placeholderTextColor={theme.muted} style={{borderWidth:1,borderColor:'#333',borderRadius:12,padding:12,color:'#fff'}}/>
      <Text style={{marginTop:12, marginBottom:6}}>Rol</Text>
      <View style={{flexDirection:'row', flexWrap:'wrap', gap:8}}>
        {ROLES.map(r=>(
          <TouchableOpacity key={r} onPress={()=>setRole(r)}
            style={{paddingVertical:8,paddingHorizontal:12,borderRadius:12,
              backgroundColor: role===r?theme.accent:'#111'}}>
            <Text style={{color: role===r? '#000':'#fff'}}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={onSave} disabled={saving || !displayName}
        style={{marginTop:20, backgroundColor:theme.accent, padding:14, borderRadius:12, alignItems:'center'}}>
        <Text style={{color:'#000', fontWeight:'800'}}>{saving?'Guardando...':'Entrar'}</Text>
      </TouchableOpacity>
    </View>
  );
}