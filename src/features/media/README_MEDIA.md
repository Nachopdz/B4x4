# Sistema de Media - B4X4

## Descripción
Sistema completo para manejo de media (imágenes y videos) con upload a Firebase Storage y sincronización con Firestore.

## Componentes

### 1. Media Picker (`src/features/media/picker.ts`)
- **Función**: `pickMedia()`
- **Permisos**: Solicita acceso a la galería de fotos
- **Tipos soportados**: Imágenes y videos
- **Calidad**: 0.8 (optimizada para web/móvil)

### 2. Media Uploader (`src/features/media/uploader.ts`)
- **Función**: `uploadMedia(uid, folder, uri, ext)`
- **Destino**: Firebase Storage
- **Carpetas**: `reels/` y `posts/`
- **Estructura**: `{folder}/{uid}/{timestamp}-{random}.{ext}`

### 3. Feed Repository (`src/features/feed/`)
- **Reels**: `createReel()`, `listReelsPage()` (paginado)
- **Posts**: `createPost()`, `listPosts()`

## Uso

### Subir un Reel
```tsx
import { pickMedia } from '@/features/media/picker';
import { uploadMedia } from '@/features/media/uploader';
import { createReel } from '@/features/feed/reelsRepo';

const media = await pickMedia();
if (media) {
  const { url } = await uploadMedia(uid, 'reels', media.uri, 'mp4');
  await createReel(uid, url);
}
```

### Subir un Post
```tsx
import { createPost } from '@/features/feed/postsRepo';

await createPost(uid, mediaUrl, 'Texto del post');
```

### Listar Feed
```tsx
import { listPosts } from '@/features/feed/postsRepo';

const posts = await listPosts();
```

## Estructura de Datos

### Reel
```typescript
{
  id: string;
  uid: string;
  videoUrl: string;
  createdAt: Timestamp;
  likes: number;
  comments: number;
  hidden?: boolean;
}
```

### Post
```typescript
{
  id: string;
  uid: string;
  mediaUrl?: string;
  text: string;
  createdAt: Timestamp;
  likes: number;
  comments: number;
  hidden: boolean;
}
```

## Seguridad

### Firestore Rules
- **Lectura**: Pública para reels y posts
- **Creación**: Solo usuarios autenticados (uid debe coincidir)
- **Edición/Eliminación**: Propietario o moderadores/admin

### Storage Rules
- **Lectura**: Pública
- **Escritura**: Solo propietario del archivo

## Características

- ✅ **Paginación**: Feed con cursor para reels
- ✅ **Optimización**: Calidad reducida para mejor rendimiento
- ✅ **Seguridad**: Verificación de permisos en cliente y servidor
- ✅ **UI**: Pantallas futuristas y minimalistas
- ✅ **Tipos**: Soporte completo para TypeScript
- ✅ **Error Handling**: Manejo robusto de errores

## Pantallas

1. **UploadReelScreen**: Subida de clips con UI futurista
2. **HomeScreen**: Feed de posts con diseño moderno
3. **ReelsScreen**: Lista de reels (implementar según necesidad)
