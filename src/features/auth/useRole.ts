import { useEffect, useState } from 'react';
import { getUser } from '@/features/users/userService';
import { useAuthStore } from '@/store/useAuthStore';

export function useRole(){
  const uid = useAuthStore().session?.uid!;
  const [role,setRole]=useState<string|undefined>();
  
  useEffect(()=>{ 
    (async()=>{ 
      if(uid){ 
        const u=await getUser(uid); 
        setRole(u?.role); 
      } 
    })(); 
  },[uid]);
  
  return role;
}
