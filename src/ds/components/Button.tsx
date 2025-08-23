import React from 'react'; 
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import Text from './Text'; 
import { themeB4 } from '@/ds/theme';

export default function Button({
  children,
  onPress,
  disabled,
  loading
}: {
  children: any;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled || loading}
      style={{
        backgroundColor: disabled ? '#222' : themeB4.accent, 
        padding: 14, 
        borderRadius: 12, 
        alignItems: 'center'
      }}
    >
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <Text style={{ color: '#000', fontWeight: '800' }}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}