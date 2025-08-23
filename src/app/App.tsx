import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from '../navigation/RootNavigator';
import { ThemeProvider } from '@/ds/theme';
import { initAuthWatcher } from '@/store/useAuthStore';

const qc = new QueryClient();

export default function App() {
  useEffect(()=>{ const off=initAuthWatcher(); return ()=>off&&off(); },[]);
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000' }}>
      <SafeAreaProvider>
        <QueryClientProvider client={qc}>
          <ThemeProvider role="player">
            <RootNavigator />
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}