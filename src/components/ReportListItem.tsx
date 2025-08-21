// B4X4 v4.8 START
import React from 'react';
import { View } from 'react-native';
import Card from '@/ds/components/Card';
import Text from '@/ds/components/Text';
import type { Report } from '@/types';

export default function ReportListItem({ r }: { r: Report }) {
  return (
    <Card style={{ marginBottom: 10 }}>
      <Text weight="semibold">{r.targetType.toUpperCase()} • {r.targetId}</Text>
      <Text variant="muted">motivo: {r.reason} • estado: {r.status}</Text>
      <Text variant="muted">{new Date(r.createdAt).toLocaleString()}</Text>
    </Card>
  );
}
// B4X4 v4.8 END