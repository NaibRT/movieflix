import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from '../../costants/colors';
import sizes from '../../costants/sizes';

interface Props {
 text: string,
 onPress:(event: GestureResponderEvent) => void,
 clas?:{}
}

export default function Button({text , onPress, clas } : Props) {
    return (
        <TouchableOpacity
        style={[styles.button, clas]} 
          onPress={onPress}>
          <Text 
            style={styles.text}
          >{text}</Text>  
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  button:{
    width:'100%',
    height:50,
    backgroundColor:colors.red,
    borderRadius:sizes.radius,
    justifyContent:'center',
    alignItems:'center',
  },
  text:{
      color:colors.white
  }
})
