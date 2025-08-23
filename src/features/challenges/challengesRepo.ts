import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp, doc, setDoc, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore';

export async function createChallenge(p:{
  title:string;
  type:'skill'|'time'|'trick';
  rules:string;
  creatorUid:string;
  deadlineAt:number;
  minValidators:number;
}){
  const ref = await addDoc(collection(db,'challenges'), { 
    ...p, 
    status:'open', 
    createdAt: serverTimestamp() 
  });
  return ref.id;
}

export async function getChallenge(id:string){ 
  return (await getDoc(doc(db,'challenges',id))).data(); 
}

export async function listOpenChallenges(){
  const snap = await getDocs(query(
    collection(db,'challenges'), 
    where('status','==','open'), 
    orderBy('createdAt','desc')
  ));
  return snap.docs.map(d=>({ id:d.id, ...(d.data() as any) }));
}

export async function addAttempt(chId:string, uid:string, mediaUrl:string, note=''){
  await setDoc(doc(db,'challenges',chId,'attempts',uid), { 
    uid, 
    mediaUrl, 
    note, 
    status:'pending', 
    createdAt: serverTimestamp() 
  });
}

export async function listAttempts(chId:string){
  const snap = await getDocs(query(
    collection(db,'challenges',chId,'attempts'), 
    orderBy('createdAt','desc')
  ));
  return snap.docs.map(d=>({ id:d.id, ...(d.data() as any) }));
}

export async function addValidation(chId:string, validatorUid:string, targetUid:string, decision:'approve'|'reject'){
  await addDoc(collection(db,'challenges',chId,'validations'), { 
    validatorUid, 
    targetUid, 
    decision, 
    createdAt: serverTimestamp() 
  });
}
