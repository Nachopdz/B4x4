// B4X4 v3.5 START
import React from 'react';
import { View, ViewProps } from 'react-native';
import { useThemeB4 } from '@/ds/theme';
import { RADII } from '@/ds/tokens';

type Props = ViewProps & { glow?: boolean; border?: boolean };

export default function Card({ glow=true, border=true, style, ...rest }: Props) {
  const t = useThemeB4();
  return (
    <View
      style={[
        {
          backgroundColor: t.card,
          borderRadius: RADII.lg,
          borderWidth: border ? 1 : 0,
          borderColor: t.border,
          padding: 14,
          ...(glow
            ? {
                shadowColor: t.accent,
                shadowOpacity: 0.35,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 0 },
                elevation: 6,
              }
            : null),
        },
        style,
      ]}
      {...rest}
    />
  );
}
// B4X4 v3.5 END