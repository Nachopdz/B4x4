import * as ImagePicker from 'expo-image-picker';

export async function pickMedia(): Promise<{ uri:string; type:'image'|'video' }|null>{
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if(status !== 'granted') return null;
  const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All, quality: 0.8 });
  if(res.canceled || !res.assets?.[0]) return null;
  const a = res.assets[0];
  const type = a.type === 'video' ? 'video' : 'image';
  return { uri: a.uri!, type };
}
