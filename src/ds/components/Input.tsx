// B4X4 v3.5 START
import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import { useThemeB4 } from '@/ds/theme';
import { RADII, SPACING } from '@/ds/tokens';

type Props = TextInputProps & {
  label?: string;
  error?: string;
  helper?: string;
};

export default function Input({ label, error, helper, style, ...rest }: Props) {
  const t = useThemeB4();
  const borderC = error ? t.danger : t.accent;
  return (
    <View style={{ marginBottom: SPACING.lg }}>
      {!!label && <Text style={{ color: t.muted, marginBottom: 6 }}>{label}</Text>}
      <TextInput
        style={[
          {
            color: t.text,
            backgroundColor: '#0B0B0B',
            borderWidth: 1,
            borderColor: borderC,
            borderRadius: RADII.lg,
            paddingHorizontal: 12,
            paddingVertical: 10,
          },
          style,
        ]}
        placeholderTextColor={t.muted}
        {...rest}
      />
      {!!(error || helper) && (
        <Text style={{ marginTop: 6, color: error ? t.danger : t.muted, fontSize: 12 }}>
          {error ?? helper}
        </Text>
      )}
    </View>
  );
}
// B4X4 v3.5 END