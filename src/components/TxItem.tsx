// B4X4 v4.7 START
import React from 'react';
import { View } from 'react-native';
import Text from '@/ds/components/Text';
import Badge from '@/ds/components/Badge';
import type { Transaction } from '@/types';

export default function TxItem({ tx }: { tx: Transaction }) {
  const sign = tx.amount >= 0 ? '+' : '';
  const variant = tx.amount >= 0 ? 'success' : 'danger';
  return (
    <View style={{ paddingVertical: 8, borderBottomColor: '#111', borderBottomWidth: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>{tx.reason.replace('_', ' ')}</Text>
        <Badge label={`${sign}${tx.amount}`} variant={variant as any} />
      </View>
      <Text variant="muted" style={{ marginTop: 2 }}>
        {new Date(tx.createdAt).toLocaleString()}
      </Text>
    </View>
  );
}
// B4X4 v4.7 END