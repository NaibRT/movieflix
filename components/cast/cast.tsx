import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from '../../costants/api';
import colors from '../../costants/colors';
import sizes from '../../costants/sizes';
import ICast from "../../interfaces/ICast";

interface Props{
  item:ICast,
  press:() => void
}
export default function Cast({item,press} : Props) {
    return (
        <TouchableOpacity 
          onPress={press}
        style={styles.cast_container}>
            <View style={styles.cast}>
              <Image style={styles.cost_img} source={{uri:`${api.IMG_URL}${item.profile_path}`}}/>
            </View>
           <Text style={styles.txt}>{item.original_name}</Text> 
           <Text  numberOfLines={2} style={styles.txt}>({item.character})</Text> 
        </TouchableOpacity>
    )
}

 const styles = StyleSheet.create({
    cast_container:{
     backgroundColor:colors.white,
     marginHorizontal:sizes.margin/2,
     borderRadius:sizes.radius

    },
   cast:{
       height:150,
       width:130,
       backgroundColor:colors.black
   },
   cost_img:{
    height:150,
    width:130,
    resizeMode:'stretch',
    borderTopRightRadius:sizes.radius,
    borderTopLeftRadius:sizes.radius,
   },
   txt:{
       color:colors.black,
       fontSize:12,
       width:130,
       paddingHorizontal:sizes.padding/2
   }, 
 })
