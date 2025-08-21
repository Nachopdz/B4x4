// B4X4 v3.5 START
import React from 'react';
import { View, Text as RNText, ViewProps } from 'react-native';
import { useThemeB4 } from '@/ds/theme';
import { RADII, SPACING } from '@/ds/tokens';

type Variant = 'accent' | 'success' | 'danger' | 'muted';
type Props = ViewProps & { variant?: Variant; label: string };

export default function Badge({ variant='accent', label, style, ...rest }: Props) {
  const t = useThemeB4();
  const bg =
    variant === 'success' ? '#153f19' :
    variant === 'danger' ? '#3f1a12' :
    variant === 'muted' ? '#1a1a1a' : '#121212';
  const fg =
    variant === 'success' ? t.success :
    variant === 'danger' ? t.danger :
    variant === 'muted' ? t.muted : t.accent;
  return (
    <View
      style={[
        {
          backgroundColor: bg,
          borderColor: fg,
          borderWidth: 1,
          paddingHorizontal: SPACING.sm,
          paddingVertical: 4,
          borderRadius: RADII.full,
        },
        style,
      ]}
      {...rest}
    >
      <RNText style={{ color: fg, fontSize: 12, fontWeight: '600' }}>{label}</RNText>
    </View>
  );
}
// B4X4 v3.5 END