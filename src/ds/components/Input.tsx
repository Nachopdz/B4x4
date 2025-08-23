import React from 'react'; 
import { TextInput, TextInputProps } from 'react-native';

export default function Input(props: TextInputProps) {
  return (
    <TextInput 
      {...props} 
      style={[
        {
          borderWidth: 1,
          borderColor: '#333',
          borderRadius: 12,
          padding: 12,
          color: '#fff'
        }, 
        props.style
      ]} 
    />
  );
}