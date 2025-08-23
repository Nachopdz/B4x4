import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

async function uriToBlob(uri:string): Promise<Blob>{
  const r = await fetch(uri); 
  return await r.blob();
}

export async function uploadMedia(uid:string, folder:'reels'|'posts', uri:string, ext='mp4'){
  const blob = await uriToBlob(uri);
  const fileId = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const r = ref(storage, `${folder}/${uid}/${fileId}`);
  await uploadBytes(r, blob);
  const url = await getDownloadURL(r);
  return { url, fileId };
}
