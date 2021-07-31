import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from "axios";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Animated, FlatList, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import MainSliderItem from "../components/main-slider/main-slider-item";
import MovieItem from "../components/movie-item/MovieItem";
import Section from "../containers/section";
import api from "../costants/api";
import colors from "../costants/colors";
import sizes from "../costants/sizes";
import IMovie from '../interfaces/IMovie';





interface IState {
  trends:IMovie[],
  popular:IMovie[],
  playing:IMovie[],
  upcoming:IMovie[],
}

let data : IState = {
  trends:[],
  popular:[],
  playing:[],
  upcoming:[],
}

type RootStackParamList = {
  MovieDetail: {id:string};
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,'MovieDetail'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList,'MovieDetail'>;

 type Props = {
   route: ProfileScreenRouteProp,
   navigation:ProfileScreenNavigationProp
 }

const itemSize = sizes.width-((sizes.width/2)/2) + 20
const SpacerItemSize = (sizes.width - itemSize) / 2;


export default function Home({navigation}: Props) {
  console.log(navigation)
const scrollX = useRef(new Animated.Value(0)).current;
const [state, setState] = useState(data);
const backFlatRef = useRef<FlatList<IMovie> | null>();

useLayoutEffect(() => {
  Promise.all([
    axios.get(`${api.API_URL}/trending/all/week?api_key=${api.KEY}`),
    axios.get(`${api.API_URL}/movie/popular?api_key=${api.KEY}`),
    axios.get(`${api.API_URL}/movie/now_playing?api_key=${api.KEY}&page=2`),
    axios.get(`${api.API_URL}/movie/upcoming?api_key=${api.KEY}&page=3`),
  ]).then(res => {
      let trends   =  res[0].data.results;
      let popular  =  res[1].data.results;
      let playing  =  res[2].data.results;
      let upcoming =  res[3].data.results;

      setState({
        ...state,
        trends: trends,
        popular: popular,
        playing:playing,
        upcoming: upcoming,
      })
  } )
},[])

const handleBackSlide = (index:number) => {
  backFlatRef.current?.scrollToOffset({
    animated:true,
    offset:index
  })
}

  return (
    <SafeAreaView style={styles.home}>
      <ScrollView>
      <View style={styles.home}>
        <Section>
        <Animated.FlatList
          data={state.trends}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={itemSize}
          scrollEnabled
          scrollEventThrottle={16}
          decelerationRate={0}
          bounces={false}
          ListHeaderComponent={<View></View>}
          ListFooterComponent={<View></View>}
          ListHeaderComponentStyle={{
            width:SpacerItemSize
          }}
          ListFooterComponentStyle={{
            width:SpacerItemSize
          }}
          renderItem={({item,index}) => {
             const inputRange=[
              (index - 1) * itemSize,
              index  * itemSize,
              (index + 1) * itemSize,
             ];

             const translateY = scrollX.interpolate({
              inputRange,
              outputRange:[0,-50,0]
             })
              return(
                <TouchableOpacity 
                  style={styles.mSlider}
                  onPress={()=> navigation.navigate('MovieDetail',{id:item.id.toString()})}
                  key={item.id}
                >
                 <MainSliderItem 
                 style={{
                  transform:[{translateY}]
                }} 
                key={item.id} 
                url={`${api.IMG_URL}${item.poster_path}`} 
                header={item.title || item.name} 
                genres={item.genres} />
                </TouchableOpacity>
              )

          }}

          keyExtractor={(item) => item.id.toString()}
          onScroll={
            Animated.event(
            [{nativeEvent: {contentOffset:{x:scrollX}}}],
            {useNativeDriver:true}
          )
        }
        />

         </Section>
         <Section title='Popular'>
           <FlatList
             data={state.popular}
             horizontal
             pagingEnabled
             bounces={false}
             showsHorizontalScrollIndicator={false}
             snapToInterval={220}
             keyExtractor={(item) => item.id.toString()}
             renderItem={({item,index}) => {
               return(
                 <MovieItem
                  press={() => navigation.navigate('MovieDetail',{id:item.id.toString()})}
                  id={item.id.toString()}
                  url={`${api.IMG_URL}${item.poster_path}`}
                 />
               )
             }}
           />
         </Section>
         <Section title='Playing'>
           <FlatList
             data={state.playing}
             horizontal
             pagingEnabled
             bounces={false}
             showsHorizontalScrollIndicator={false}
             snapToInterval={220}
             keyExtractor={(item) => item.id.toString()}
             renderItem={({item,index}) => {
               return(
                 <MovieItem
                 press={() => navigation.navigate('MovieDetail',{id:item.id.toString()})}
                  id={item.id.toString()}
                  url={`${api.IMG_URL}${item.poster_path}`}
                 />
               )
             }}
           />
         </Section>
         <Section title='Upcoming'>
           <FlatList
             data={state.upcoming}
             horizontal
             pagingEnabled
             bounces={false}
             showsHorizontalScrollIndicator={false}
             snapToInterval={220}
             keyExtractor={(item) => item.id.toString()}
             renderItem={({item,index}) => {
               return(
                 <MovieItem
                  press={() => navigation.navigate('MovieDetail',{id:item.id.toString()})}
                  id={item.id.toString()}
                  url={`${api.IMG_URL}${item.poster_path}`}
                 />
               )
             }}
           />
         </Section>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: colors.black,
    shadowColor: 'transparent',
    shadowRadius:0,
  },
  mSlider:{
    //width:itemSize,
    marginTop: 60,
    marginHorizontal:10
  }
});
