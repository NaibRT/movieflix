import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import sizes from '../../costants/sizes';
type RootStackParamList = {
    MovieDetail: {id?:string};
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,'MovieDetail'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList,'MovieDetail'>;

 type Props = {
    id?:string,
    url:string,
   //navigation?:ProfileScreenNavigationProp
   press?:() => void
 }

export default function Movieitem({id, url, press } : Props) {
    return (

            <View style={styles.to}>
                <TouchableOpacity
                 onPress={press}
                //   onPress={() => navigation?.push('MovieDetail',{
                //       id:id
                //   })}
                 >
                <Image
                style={styles.img}
                source={{uri:url}}
                /> 
                </TouchableOpacity>
            </View>  
    )
}

const styles = StyleSheet.create({
    to:{
        marginHorizontal:sizes.margin,
        marginBottom:sizes.margin,
        borderRadius:sizes.img_radius
    },
    img: {
        height:250,
        width:200,
        resizeMode:'stretch',
        borderRadius:sizes.img_radius
    }
})
