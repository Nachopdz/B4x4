// B4X4 v5.2 START
// Mock mínimo: genera URLs falsas y resuelve rápido.
export const MediaServiceMock = {
  async uploadImage(fileUri: string): Promise<{ url: string }> {
    return { url: `https://mock.b4x4/cdn/img/${Date.now()}.jpg` };
  },
  async uploadVideo(fileUri: string): Promise<{ url: string }> {
    return { url: `https://mock.b4x4/cdn/vid/${Date.now()}.mp4` };
  },
  async getSignedUrl(path: string, expiresIn = 3600): Promise<{ url: string }> {
    return { url: `https://mock.b4x4/cdn/${path}?e=${expiresIn}` };
  },
};
// B4X4 v5.2 END