// B4X4 v3.5 START
import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { useThemeB4 } from '@/ds/theme';

type Variant = 'title' | 'subtitle' | 'body' | 'caption' | 'muted';
type Props = RNTextProps & { variant?: Variant; weight?: 'regular'|'semibold'|'bold'; color?: string };

export default function Text({ variant='body', weight='regular', color, style, ...rest }: Props) {
  const t = useThemeB4();
  const size =
    variant === 'title' ? 22 :
    variant === 'subtitle' ? 18 :
    variant === 'caption' ? 12 : 14;
  const finalColor =
    color ?? (variant === 'muted' ? t.muted : t.text);
  const fontWeight =
    weight === 'bold' ? '700' : weight === 'semibold' ? '600' : '400';
  return <RNText style={[{ color: finalColor, fontSize: size, fontWeight }, style]} {...rest} />;
}
// B4X4 v3.5 END