import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export async function getUser(uid:string){ 
  return (await getDoc(doc(db,'users',uid))).data(); 
}

export async function updateUser(uid:string, patch:any){ 
  await updateDoc(doc(db,'users',uid), patch); 
}
