import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, View } from "react-native";
import sizes from '../../costants/sizes';
let {width} = Dimensions.get("window");
interface Props{
    url: string
}
export default function SliderImg({ url } : Props) {
    return (
      <View style={styles.sImg}>
       <Image style={styles.sImg} source={{uri:url}} />
      </View>
    )
}

const styles = StyleSheet.create({
      sImg:{
        height: Platform.OS === 'web' ? sizes.height/2 : sizes.height/2.5,
        width:'100%',
        borderRadius:20,
        resizeMode:'stretch',
      },
      imgContainer:{
        width:'100%',
        height:sizes.width-(sizes.width/2),
        padding:10,
        backgroundColor:'red'
      }
    })

