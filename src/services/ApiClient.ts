// B4X4 v3.6 START
export const ApiClient = {
  async post<T>(_path: string, _body: unknown): Promise<T> {
    console.log('[ApiClient.stub]', _path, _body);
    throw new Error('ApiClient.post not implemented');
  },
};
// B4X4 v3.6 END

// B4X4 v5.3 START
export const Http = {
  get: <T>(path: string) => ApiClient.get<T>(path),
  post: <T>(path: string, body?: any) => ApiClient.post<T>(path, body),
  put: <T>(path: string, body?: any) => ApiClient.put<T>(path, body),
  del: <T>(path: string) => ApiClient.del<T>(path),
  async health(): Promise<boolean> {
    try { await ApiClient.get('/health'); return true; } catch { return false; }
  },
};
// B4X4 v5.3 END