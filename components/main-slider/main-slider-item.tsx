import React from 'react';
import { Animated, Dimensions, Platform, StyleSheet, Text } from "react-native";
import colors from '../../costants/colors';
import sizes from '../../costants/sizes';
import IMSliderItem from '../../interfaces/IMSliderItem';
import SliderImg from '../image/slider-img';

let {width} = Dimensions.get("window");

export default function MainSliderItem({ url, header, genres = [],style } : IMSliderItem) {
    return (
        <Animated.View style={[styles.mainItem,style]}>
          <SliderImg url={url}/> 
          <Text style={styles.header} lineBreakMode='head' numberOfLines={1}>{header}</Text> 
          {/* <View style={styles.genres}>
            {
                genres.map(x => (
                   <Genre id={x.id} name={x.name}/> 
                ))
            }
          </View> */}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    mainItem:{
     width:Platform.OS === 'web' ? (sizes.width/2): sizes.width-((sizes.width/2)/2),
     //height:sizes.width-((sizes.width/2)/2),
     alignItems:'center',
     justifyContent:'center',
     backgroundColor:colors.white,
     borderRadius:20,
     padding:sizes.padding
    },
    header:{
        fontSize:sizes.fs1,
        fontWeight:'bold',
        padding:sizes.padding,
    },
    genres:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    }
})

