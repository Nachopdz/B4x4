// B4X4 v3.5 START
import React from 'react';
import { Pressable, Text, ActivityIndicator, PressableProps } from 'react-native';
import { useThemeB4 } from '@/ds/theme';
import { RADII, SPACING } from '@/ds/tokens';

type Variant = 'primary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

type Props = PressableProps & {
  title: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  accessibilityLabel?: string;
};

export default function Button({
  title,
  variant='primary',
  size='md',
  loading=false,
  left,
  right,
  disabled,
  style,
  ...rest
}: Props) {
  const t = useThemeB4();
  const padV = size === 'lg' ? 14 : size === 'sm' ? 8 : 12;
  const font = size === 'lg' ? 16 : size === 'sm' ? 12 : 14;

  const bg =
    variant === 'primary' ? t.accent :
    variant === 'ghost' ? 'transparent' : '#0B0B0B';
  const bd =
    variant === 'outline' ? t.accent : 'transparent';
  const fg =
    variant === 'primary' ? '#000' : t.accent;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled, busy: loading }}
      style={({ pressed }) => [
        {
          backgroundColor: bg,
          borderColor: bd,
          borderWidth: variant === 'outline' ? 1 : 0,
          paddingVertical: padV,
          paddingHorizontal: SPACING.lg,
          borderRadius: RADII.lg,
          opacity: pressed ? 0.9 : 1,
          shadowColor: t.accent,
          shadowOpacity: variant === 'ghost' ? 0 : 0.35,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 0 },
          elevation: variant === 'ghost' ? 0 : 6,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
        style,
      ]}
      disabled={disabled || loading}
      {...rest}
    >
      {left}
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#000' : t.accent} />
      ) : (
        <Text style={{ color: fg, fontWeight: '600', fontSize: font }}>{title}</Text>
      )}
      {right}
    </Pressable>
  );
}
// B4X4 v3.5 END