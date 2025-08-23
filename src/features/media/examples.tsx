import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '@/ds/components/Text';
import { pickMedia } from './picker';
import { uploadMedia } from './uploader';
import { createPost } from '@/features/feed/postsRepo';
import { createReel } from '@/features/feed/reelsRepo';

// Ejemplo: Componente para crear posts
export function CreatePostButton({ uid }: { uid: string }) {
  const [uploading, setUploading] = useState(false);

  const handleCreatePost = async () => {
    const media = await pickMedia();
    if (!media) return;

    setUploading(true);
    try {
      const ext = media.type === 'video' ? 'mp4' : 'jpg';
      const { url } = await uploadMedia(uid, 'posts', media.uri, ext);
      await createPost(uid, url, 'Mi nuevo post');
    } finally {
      setUploading(false);
    }
  };

  return (
    <TouchableOpacity onPress={handleCreatePost} disabled={uploading}>
      <Text>{uploading ? 'Subiendo...' : 'Crear Post'}</Text>
    </TouchableOpacity>
  );
}

// Ejemplo: Componente para crear reels
export function CreateReelButton({ uid }: { uid: string }) {
  const [uploading, setUploading] = useState(false);

  const handleCreateReel = async () => {
    const media = await pickMedia();
    if (!media) return;

    setUploading(true);
    try {
      const ext = media.type === 'video' ? 'mp4' : 'jpg';
      const { url } = await uploadMedia(uid, 'reels', media.uri, ext);
      await createReel(uid, url);
    } finally {
      setUploading(false);
    }
  };

  return (
    <TouchableOpacity onPress={handleCreateReel} disabled={uploading}>
      <Text>{uploading ? 'Subiendo...' : 'Crear Reel'}</Text>
    </TouchableOpacity>
  );
}

// Ejemplo: Hook personalizado para media
export function useMediaUpload(uid: string) {
  const [uploading, setUploading] = useState(false);

  const uploadPost = async (text?: string) => {
    const media = await pickMedia();
    if (!media) return null;

    setUploading(true);
    try {
      const ext = media.type === 'video' ? 'mp4' : 'jpg';
      const { url } = await uploadMedia(uid, 'posts', media.uri, ext);
      await createPost(uid, url, text);
      return url;
    } finally {
      setUploading(false);
    }
  };

  const uploadReel = async () => {
    const media = await pickMedia();
    if (!media) return null;

    setUploading(true);
    try {
      const ext = media.type === 'video' ? 'mp4' : 'jpg';
      const { url } = await uploadMedia(uid, 'reels', media.uri, ext);
      await createReel(uid, url);
      return url;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    uploadPost,
    uploadReel,
  };
}
