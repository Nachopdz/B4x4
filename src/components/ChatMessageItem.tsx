// B4X4 v4.4 START
import React from 'react';
import { View, Image } from 'react-native';
import Text from '@/ds/components/Text';
import { mockUsers } from '@/mocks/seed';
import type { MatchMessage } from '@/types';

export default function ChatMessageItem({ m }: { m: MatchMessage }) {
  const u = mockUsers.find((x: any) => x.id === m.userId);
  return (
    <View style={{ flexDirection: 'row', gap: 10, paddingVertical: 8 }}>
      <Image
        source={{ uri: u?.avatarUrl }}
        style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#111' }}
      />
      <View style={{ flex: 1 }}>
        <Text weight="semibold">
          {u?.name ?? 'Jugador'} <Text variant="muted">@{u?.handle ?? 'user'}</Text>
        </Text>
        <Text>{m.text}</Text>
        <Text variant="muted" style={{ fontSize: 12 }}>
          {new Date(m.createdAt).toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );
}
// B4X4 v4.4 END