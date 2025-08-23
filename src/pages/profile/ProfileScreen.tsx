import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native'; 
import Text from '@/ds/components/Text';
import { useThemeB4 } from '@/ds/theme'; 
import { useAuthStore } from '@/store/useAuthStore';
import { getUser } from '@/features/users/userService';
import { useRole } from '@/features/auth/useRole';
import { can } from '@/features/auth/roles';

export default function ProfileScreen(){
  const uid = useAuthStore().session?.uid!; 
  const [me,setMe]=useState<any>(null);
  const theme = useThemeB4();
  const role = useRole();
  
  useEffect(()=>{ 
    (async()=>setMe(await getUser(uid)))(); 
  },[uid]);
  
  if(!me) return null;
  
  return (
    <View style={{flex:1,backgroundColor:theme.background, padding:24}}>
      <Text style={{fontSize:22}}>{me.displayName ?? 'Sin nombre'}</Text>
      <Text style={{color:theme.muted, marginTop:6}}>@{me.handle}</Text>
      <Text style={{marginTop:12}}>Ciudad: {me.city ?? '—'}</Text>
      <Text style={{marginTop:4}}>Rol: {me.role ?? 'player'}</Text>
      
      {/* Botones condicionales basados en rol */}
      {can.createLeague(role) && (
        <TouchableOpacity 
          style={{
            marginTop: 20, 
            backgroundColor: theme.accent, 
            padding: 14, 
            borderRadius: 12, 
            alignItems: 'center'
          }}
        >
          <Text style={{color: '#000', fontWeight: '800'}}>Crear Liga</Text>
        </TouchableOpacity>
      )}
      
      {can.createChallenge(role) && (
        <TouchableOpacity 
          style={{
            marginTop: 12, 
            backgroundColor: theme.accent, 
            padding: 14, 
            borderRadius: 12, 
            alignItems: 'center'
          }}
        >
          <Text style={{color: '#000', fontWeight: '800'}}>Crear Desafío</Text>
        </TouchableOpacity>
      )}
      
      {can.moderate(role) && (
        <TouchableOpacity 
          style={{
            marginTop: 12, 
            backgroundColor: theme.danger, 
            padding: 14, 
            borderRadius: 12, 
            alignItems: 'center'
          }}
        >
          <Text style={{color: '#fff', fontWeight: '800'}}>Panel de Moderación</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}