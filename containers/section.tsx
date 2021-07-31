import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from '../costants/colors';
import sizes from '../costants/sizes';

interface Props{
    title?:string,
    link?:string,
    children: JSX.Element
}

export default function Section({title,link,children} : Props) {
    return (
        <View style={styles.section}>
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              {
                link &&
                <TouchableOpacity 
                  onPress={() => {}}
                ><Text style={styles.seeMore}>{link}</Text>  
                </TouchableOpacity>
              } 
            </View>
          <View>
              {children}
          </View>  
        </View>
    )
}

const styles = StyleSheet.create({
    section:{
        marginBottom:sizes.margin
    },
    header:{
      flexDirection:'row',  
      justifyContent:'space-between',
      alignItems:'center',
    },
    title:{
        color:colors.red,
      //   backgroundColor:colors.black_dark,
        fontSize:sizes.fs20,
        padding:sizes.padding,
    },
    seeMore:{
        fontSize:sizes.fs20,
        color:colors.gold,
    }
})
