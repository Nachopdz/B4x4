import { create } from 'zustand';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { ensureUserProfile } from '@/features/users/userRepo';

type Session = { uid:string; phone?:string } | null;
type S = { ready:boolean; session: Session; logout:()=>Promise<void>; };

export const useAuthStore = create<S>(()=>({ ready:false, session:null, logout: async()=>{ await signOut(auth); } }));

export function initAuthWatcher(){
  return onAuthStateChanged(auth, async (u)=>{
    if(u){ await ensureUserProfile({ uid:u.uid, phoneNumber:u.phoneNumber ?? undefined }); }
    useAuthStore.setState({ ready:true, session: u ? { uid:u.uid, phone:u.phoneNumber ?? undefined } : null });
  });
}