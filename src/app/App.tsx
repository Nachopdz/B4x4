// B4X4 v3.2 START
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from '../navigation/RootNavigator';
import { ThemeProvider } from '@/ds/theme';
import { useAuthStore } from '@/store/useAuthStore';

const qc = new QueryClient();

export default function App() {
  const role = useAuthStore((s) => s.role);
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000' }}>
      <SafeAreaProvider>
        <QueryClientProvider client={qc}>
          <ThemeProvider role={role}>
            <RootNavigator />
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
// B4X4 v3.2 END