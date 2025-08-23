import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';

export async function createPost(uid:string, mediaUrl?:string, text?:string){
  await addDoc(collection(db,'posts'), { 
    uid, 
    mediaUrl: mediaUrl||null, 
    text: text||'', 
    createdAt: serverTimestamp(), 
    likes:0, 
    comments:0, 
    hidden:false 
  });
}

export async function listPosts(){
  const snap = await getDocs(query(collection(db,'posts'), orderBy('createdAt','desc'), limit(20)));
  return snap.docs.map(d=>({ id:d.id, ...(d.data() as any) }));
}
