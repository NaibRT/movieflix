import { Video as V } from 'expo-av';
import React from 'react';
import { StyleSheet, View } from "react-native";
import api from '../../costants/api';
import IMovieVideo from "../../interfaces/IMovieVideo";

interface IProps{
    item: IMovieVideo
}
export default function Video({ item } : IProps) {
    return (
        <View style={styles.video}>
         <V
         style={styles.video}
           source={{uri:`${api.VIDEO_URL}?key=${item.key}`}}
           useNativeControls
           resizeMode='contain'
         />   
        </View>
    )
}

const styles = StyleSheet.create({
    video: {
        width:100,
        height:100,
        backgroundColor:'red'
    }
})

 
