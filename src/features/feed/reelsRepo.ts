import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';

export type Reel = { 
  id:string; 
  uid:string; 
  videoUrl:string; 
  createdAt:any; 
  likes:number; 
  comments:number; 
  hidden?:boolean; 
};

export async function createReel(uid:string, videoUrl:string){
  await addDoc(collection(db,'reels'), { 
    uid, 
    videoUrl, 
    createdAt: serverTimestamp(), 
    likes:0, 
    comments:0 
  });
}

export async function listReelsPage(cursor?:any){
  const q = cursor ? 
    query(collection(db,'reels'), orderBy('createdAt','desc'), startAfter(cursor), limit(12)) :
    query(collection(db,'reels'), orderBy('createdAt','desc'), limit(12));
  
  const snap = await getDocs(q);
  const items = snap.docs.map(d=>({ id:d.id, ...(d.data() as any) }));
  const nextCursor = snap.docs.at(-1);
  return { items, nextCursor };
}
