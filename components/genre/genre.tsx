import React from 'react';
import { StyleSheet, Text } from "react-native";
import IGenre from "../../interfaces/IGenre";


export default function Genre({id ,name} : IGenre) {
    return (
        <Text key={id} style={styles.genre}>{name}</Text>
    )
}

const styles = StyleSheet.create({
   genre:{
       padding:5,
       borderColor:'grey',
       borderWidth:1,
       borderRadius:10,
   }
  })

