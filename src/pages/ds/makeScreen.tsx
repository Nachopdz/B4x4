import React from 'react'; 
import { View } from 'react-native';
import Text from '@/ds/components/Text'; 
import { useThemeB4 } from '@/ds/theme';

export default function makeScreen(title: string){
  return ()=>{
    const theme = useThemeB4();
    return(
      <View style={{
        flex:1,
        backgroundColor:theme.background,
        alignItems:'center',
        justifyContent:'center'
      }}>
        <Text style={{fontSize:22}}>{title}</Text>
      </View>
    );
  };
}
