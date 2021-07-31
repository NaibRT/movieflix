import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useLayoutEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Cast from '../components/cast/cast';
import Movieitem from "../components/movie-item/MovieItem";
import Section from '../containers/section';
import api from '../costants/api';
import colors from '../costants/colors';
import sizes from '../costants/sizes';
import ICast from '../interfaces/ICast';
import ICrew from '../interfaces/ICrew';
import IMovie from '../interfaces/IMovie';
import IMovieDetail from "../interfaces/IMovieDetail";
import IMovieImage from '../interfaces/IMovieImages';


type RootStackParamList = {
    MovieDetail: {id:string};
    ActorDetail: {id:string};
  }
  
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,'MovieDetail'|'ActorDetail'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList,'ActorDetail'>;

interface Props {
    route:ProfileScreenRouteProp,
    navigation:ProfileScreenNavigationProp
}

type State = {
    details:IMovieDetail,
    similar:IMovie[],
    image:IMovieImage,
    recommendations:IMovie[],
    casts: ICast[],
    crews:ICrew[]
}

let data : State;
const SpacerItemSize = (sizes.width - 220) / 2;


export default function MovieDetail({ route, navigation } : Props) {
    const { id } = route?.params;
   const [state,setState]=useState<State>(data);
    useLayoutEffect(() => {
       Promise.all([
        axios.get(`${api.API_URL}/movie/${id}?api_key=${api.KEY}`),
        axios.get(`${api.API_URL}/movie/${id}/images?api_key=${api.KEY}`),
        axios.get(`${api.API_URL}/movie/${id}/similar?api_key=${api.KEY}`),
        axios.get(`${api.API_URL}/movie/${id}/credits?api_key=${api.KEY}`),
        axios.get(`${api.API_URL}/movie/${id}/recommendations?api_key=${api.KEY}`),

       ]).then(res => {
           setState({
               ...state,
               details:res[0].data,
               image:res[1].data,
               similar:res[2].data.results,
               casts:res[3].data.cast,
               crews:res[3].data.crew,
               recommendations:res[4].data.results,
           })
       })
    },[])

    return (
        <SafeAreaView style={styles.sav}>
           <ScrollView>
           <View style={styles.sav}>
              <View style={styles.poster_container}>
                  <FlatList
                    horizontal
                    pagingEnabled
                    snapToInterval={220}
                    keyExtractor={(item,index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    data={state?.image?.backdrops}
                    renderItem={({item,index}) => {
                        return(<Movieitem 
                               key={index} 
                               url={`${api.IMG_URL}${item.file_path}`}/>)
                    }}
                  />
              </View>
              {/* <View style={styles.videos}>
              <FlatList
                    horizontal
                    pagingEnabled
                    snapToInterval={100}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    data={state?.videos}
                    renderItem={({item,index}) => {
                        return(<Video key={item.id} item={item}/>)
                    }}
                  />
              </View> */}

              <View style={styles.detail}>
                 <Text style={styles.title}>{state?.details.title}</Text>
                 <Text style={styles.date}>{state?.details.release_date}</Text>
                 <View style={styles.genre_container}>
                     {
                        state?.details.genres.map(x => {
                            return <TouchableOpacity
                                      onPress={() => navigation.navigate('MovieDetail',{
                                          id:x.id.toString(),
                                      })}
                                      key={x.id}>
                                     <Text style={styles.genre} >{x.name}</Text>
                                    </TouchableOpacity>
                        }) 
                     }
                 </View>
                 <View style={styles.genre_container}>
                    {
                        state?.details.spoken_languages.map((x,i) => {
                            return <TouchableOpacity key={i}>
                                    <Text style={styles.genre} >{x.name}</Text>
                                    </TouchableOpacity>
                        }) 
                     }
                 </View>
                 <Text style={styles.desc}>{state?.details.overview}</Text>
              </View>
              {
                 state?.casts.length > 0 && 
                 <Section
               title='Actors'
              >
             <FlatList
                    horizontal
                    pagingEnabled
                    snapToInterval={100}
                    keyExtractor={(item,index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={<View></View>}
                    ListFooterComponent={<View></View>}
                    ListHeaderComponentStyle={{width:10}}
                    ListFooterComponentStyle={{width:10}}
                    bounces={false}
                    data={state?.casts}
                    renderItem={({item,index}) => {
                        return(
                            <Cast 
                              key={item.cast_id} 
                              press={() => navigation.navigate('ActorDetail',{id:item.id.toString(),})}
                              item={item}/>
                        )
                    }}
                  />
             </Section>
             }
             {
                 state?.similar.length > 0 && 
                 <Section
               title='Similar'
              >
             <FlatList
                    horizontal
                    pagingEnabled
                    snapToInterval={220}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    data={state?.similar}
                    renderItem={({item}) => {
                        return(<Movieitem 
                                 press={() => navigation.push('MovieDetail',{id:item.id.toString()})} 
                                 id={item.id.toString()} 
                                 key={item.id} 
                                 url={`${api.IMG_URL}${item.poster_path}`}/>)
                    }}
                  />
             </Section>
             }
                          {
                 state?.similar.length > 0 && 
                 <Section
               title='Recommendations'
              >
             <FlatList
                    horizontal
                    pagingEnabled
                    snapToInterval={220}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    data={state?.recommendations}
                    renderItem={({item}) => {
                        return(<Movieitem 
                                press={() => navigation.push('MovieDetail',{id:item.id.toString()})} 
                                id={item.id.toString()} 
                                key={item.id} 
                                url={`${api.IMG_URL}${item.poster_path}`}/>)
                    }}
                  />
             </Section>
             }
           </View>
           </ScrollView> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
   sav:{
       flex:1,
       backgroundColor:colors.black,
   },
   poster_container:{
       //height:250,
   },
   detail:{
     width:sizes.width,
     paddingHorizontal:sizes.padding,
     marginBottom:sizes.margin
   },
   title:{
       color:colors.white,
       fontSize:sizes.fs20
   },
   date:{
    color:colors.white,
   },
   genre_container:{
     flexWrap:'wrap',
     flexDirection:'row',
     //marginVertical:sizes.margin
   },
   genre:{
       color:colors.white,
       borderWidth:1,
       borderColor:colors.red,
       padding:5,
       margin:5,
       borderRadius:5
   },
   desc:{
       color:colors.white,
     marginTop:sizes.margin

   },
   videos:{

   } 
})

 
