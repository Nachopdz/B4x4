// B4X4 v5.9 START
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useReelsUpload } from './useReels';
import { ENV } from '@/config/env';
// B4X4 v5.8 START
import * as DocumentPicker from 'expo-document-picker';
// B4X4 v5.8 END

export default function UploadReelScreen() {
  const [uri, setUri] = useState('');
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);
  // B4X4 v5.8 START
  const [pickedName, setPickedName] = useState<string | undefined>(undefined);
  // B4X4 v5.8 END
  const nav = useNavigation<any>();
  const { upload } = useReelsUpload();

  const canUpload = uri.trim().length > 0 && !upload.isPending;

  // B4X4 v5.8 START
  const pickFile = async () => {
    try {
      const res: any = await DocumentPicker.getDocumentAsync({ type: 'video/*', multiple: false });
      const asset = res?.assets?.[0] ?? null;
      if (asset?.uri) {
        setUri(asset.uri);
        setPickedName(asset.name);
        return;
      }
      if (res?.type === 'success' && res?.uri) {
        setUri(res.uri);
        setPickedName(res.name);
      }
    } catch (e: any) {
      Alert.alert('No se pudo abrir el selector', e?.message ?? '');
    }
  };
  // B4X4 v5.8 END

  const onSubmit = async () => {
    const looksLikeUrl = /^https?:\/\/|^file:\/\//i.test(uri.trim());
    if (!looksLikeUrl) {
      Alert.alert('URL inválida', 'Introduce una URL válida (http/https o file://).');
      return;
    }

    setProgress(0);
    const timer = setInterval(() => setProgress((p) => Math.min(98, p + 7)), 180);

    try {
      await upload.mutateAsync({ inputUri: uri.trim(), caption: caption.trim() || undefined });
      setProgress(100);
      clearInterval(timer);
      nav.goBack();
    } catch (e: any) {
      clearInterval(timer);
      setProgress(0);
      Alert.alert('Error', e?.message ?? 'Error subiendo el reel');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 16 }}>
      <Text style={{ color: '#fff', fontSize: 20, fontWeight: '800', marginBottom: 12 }}>
        Subir Reel
      </Text>

      <Text style={{ color: '#9aa0a6', marginBottom: 6 }}>
        Pega una URL (http/https o file://). {ENV.USE_SUPABASE_STORAGE ? 'Se subirá a Storage.' : 'Se usará tal cual (mock).'}
      </Text>
      <TextInput
        placeholder="https://… o file://…"
        placeholderTextColor="#666"
        value={uri}
        onChangeText={setUri}
        style={{
          color: '#fff', borderColor: '#333', borderWidth: 1, borderRadius: 10,
          paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12,
        }}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* B4X4 v5.8 START: botón para elegir archivo local */}
      <TouchableOpacity
        onPress={pickFile}
        accessibilityRole="button"
        accessibilityLabel="Elegir video"
        style={{ backgroundColor: '#1f1f1f', paddingVertical: 10, borderRadius: 10, alignItems: 'center', marginBottom: 10 }}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>{pickedName ? 'Cambiar video' : 'Elegir video'}</Text>
      </TouchableOpacity>
      {pickedName && (
        <Text style={{ color: '#9aa0a6', marginBottom: 10 }}>Archivo: {pickedName}</Text>
      )}
      {/* B4X4 v5.8 END */}

      <Text style={{ color: '#9aa0a6', marginBottom: 6 }}>Caption (opcional)</Text>
      <TextInput
        placeholder="Cuéntanos algo del clip…"
        placeholderTextColor="#666"
        value={caption}
        onChangeText={setCaption}
        style={{
          color: '#fff', borderColor: '#333', borderWidth: 1, borderRadius: 10,
          paddingHorizontal: 12, paddingVertical: 10, marginBottom: 16,
        }}
      />

      {upload.isPending && (
        <View style={{ marginBottom: 12 }}>
          <Text style={{ color: '#9aa0a6' }}>Subiendo… {progress}%</Text>
          <View style={{ height: 6, backgroundColor: '#111', borderRadius: 6, overflow: 'hidden', marginTop: 6 }}>
            <View style={{ width: `${progress}%`, height: '100%', backgroundColor: '#39ff14' }} />
          </View>
        </View>
      )}

      <TouchableOpacity
        disabled={!canUpload}
        onPress={onSubmit}
        accessibilityRole="button"
        accessibilityLabel="Subir reel"
        style={{
          backgroundColor: canUpload ? '#39ff14' : '#1f1f1f',
          paddingVertical: 12, borderRadius: 12, alignItems: 'center',
        }}
      >
        {upload.isPending ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={{ color: canUpload ? '#000' : '#666', fontWeight: '800' }}>Subir</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
// B4X4 v5.9 END