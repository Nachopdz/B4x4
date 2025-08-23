import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export type Role = 'player'|'creator'|'viewer'|'organizer'|'mod'|'admin';

export async function ensureUserProfile(u:{uid:string, phoneNumber?:string}){
  const ref = doc(db,'users',u.uid);
  const snap = await getDoc(ref);
  if(!snap.exists()){
    await setDoc(ref,{
      uid: u.uid, phone: u.phoneNumber ?? null,
      handle: `user_${u.uid.slice(0,6)}`,
      role: 'player',
      createdAt: serverTimestamp()
    },{ merge:true });
  }
}
