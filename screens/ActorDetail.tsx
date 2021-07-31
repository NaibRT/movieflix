import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useLayoutEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import api from '../costants/api';
import colors from '../costants/colors';
import sizes from '../costants/sizes';
import IActor from '../interfaces/IActor';

type RootStackParamList = {
    ActorDetail: {id:string};
  }
  
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,'ActorDetail'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList,'ActorDetail'>;

interface Props {
    route:ProfileScreenRouteProp,
    navigation:ProfileScreenNavigationProp
}

type  State = {
    actor: IActor
}
function ActorDetail({ route, navigation } : Props) {
    const { id } = route?.params;
    const [state,setState]=useState<State>();
    
    useLayoutEffect(() => {
        axios.get(`${api.API_URL}/person/${id}?api_key=${api.KEY}`)
       .then(res => {
           console.log(res.data)
           setState({
               ...state,
               actor:res.data
           })
       })
    },[])
    return (
        <SafeAreaView
        style={styles.actor}
        >
          <ScrollView
            style={styles.actor}
          >
              <View
                style={styles.actor}
              >
               <View style={styles.infoContainer}>
                   <Image style={styles.img} source={{uri:`${api.IMG_URL}${state?.actor.profile_path}`}}/>
                   <View style={styles.info}>
                      <View style={styles.info_item}>
                          <Text style={styles.info_title}>Known For</Text>
                          <Text style={styles.info_txt}>{state?.actor.known_for_department}</Text>
                      </View>
                      <View style={styles.info_item}>
                          <Text style={styles.info_title}>Known Credits</Text>
                          <Text style={styles.info_txt}>{state?.actor.popularity}</Text>
                      </View>
                      <View style={styles.info_item}>
                          <Text style={styles.info_title}>Gender</Text>
                          <Text style={styles.info_txt}>
                              {
                                state?.actor.gender === 1 
                                 ? 'Female' 
                                 : state?.actor.gender === 2 
                                 ? 'Male' : 'Other'
                              }
                          </Text>
                      </View>
                      <View style={styles.info_item}>
                          <Text style={styles.info_title}>Birthday</Text>
                          <Text style={styles.info_txt}>{state?.actor.birthday}</Text>
                      </View>
                      <View style={styles.info_item}>
                          <Text style={styles.info_title}>Place of Birth</Text>
                          <Text style={styles.info_txt}>{state?.actor.place_of_birth}</Text>
                      </View>
                      {
                        state?.actor.deathday && <View style={styles.info_item}>
                         <Text style={styles.info_title}>Deathday</Text>
                         <Text numberOfLines={3} style={styles.info_txt}>{state?.actor.deathday}</Text>
                        </View>
                      }

                   </View>
               </View>
               {
                   state?.actor.biography && 
                   <View style={styles.desc}>
                     <Text style={styles.info_title}>Biography</Text>
                     <Text style={styles.desc_txt}>{state?.actor.biography}</Text>
                   </View>
               }

                
              </View>
          </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    actor:{
      flex:1,
      backgroundColor:colors.black,
      paddingHorizontal:sizes.padding/2
    },
    infoContainer:{
        flexDirection:"row",

    },
    info:{
        paddingHorizontal:sizes.padding,
        width:sizes.width/2,
    },
    img:{
        width:sizes.width/2,
        height:"100%",
        resizeMode:'cover'
    },
    desc:{
        marginTop:sizes.margin
    },
    desc_txt:{
      color:colors.white,
      fontSize:sizes.fs1
    },
    info_item:{
        marginBottom:sizes.margin
    },
    info_title:{
        fontSize:sizes.fs20,
        color:colors.red,

    },
    info_txt:{
     fontSize:sizes.fs1,
     color:colors.white,
     width: sizes.width/2-20,
    }
})
export default ActorDetail
