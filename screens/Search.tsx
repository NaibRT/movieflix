import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import React, { useLayoutEffect, useState } from 'react';
import { FlatList, Image, Keyboard, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Button from '../components/button/button';
import api from '../costants/api';
import colors from "../costants/colors";
import sizes from "../costants/sizes";
import IMovie from '../interfaces/IMovie';


 
interface IState{
 data : IMovie[],
 isLoaded : boolean,
 page: number
}

let data : IState = {
    data :[],  
    isLoaded:false,
    page: 1

}

export default function Search() {
    const [state,setState] = useState(data);
    const [text,setText] = useState<string | undefined>(undefined);
    // const inputRef = useRef<TouchableOpacity | null>();

    useLayoutEffect(() => {
        GetTrends(1)
    },[]);

    function GetTrends(page : number){
        axios.get(`${api.API_URL}/trending/all/week?api_key=${api.KEY}&page=${page}`)
        .then((res) => {
           //  console.log(res.data)
            setState({
                ...state,
                data:res.data.results,
                isLoaded:true
            })
        })
    };

    const increasePagination = (page : number) => {
        setState({
            ...state,
            page:page
        })
    }
    const searchHandler = (page : number) => {

        increasePagination(page);
        
        axios.get(`${api.API_URL}/search/movie?api_key=${api.KEY}&query=${text}&page=${page}`)
        .then((res) => {
            console.log(res.data)
            setState({
                ...state,
                data:[
                    ...res.data.results.filter((x:IMovie) => x.poster_path!=null)
                ],
                isLoaded:true
            })
        })
    }

    const ViewMoreHandler = (page : number) => {
        
        increasePagination(page);

        axios.get(`${api.API_URL}/search/movie?api_key=${api.KEY}&query=${text}&page=${page}`)
        .then((res) => {
            setState({
                ...state,
                data:[
                    ...state.data,
                    ...res.data.results.filter((x:IMovie) => x.poster_path!=null)
                ],
                isLoaded:true
            })
        })
    }
    return (
        <SafeAreaView style={styles.search}>
            <View style={styles.header}>
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                value={text}
                onChangeText={setText}
                returnKeyType='search'
                onSubmitEditing={() =>searchHandler(1)}
                // onKeyPress={({nativeEvent}) => {
                //     console.log(nativeEvent)

                //     // if(keyValue === 'Enter'){
                //     //     console.log('worked')
                //     //     searchHandler();
                //     // }
                // }}
              />
              <TouchableOpacity 
                onPress={() =>{
                 searchHandler(1);
                 Keyboard.dismiss();
                }} 
                style={styles.search_btn}>
                    <Ionicons name='search' size={16} color={colors.white} />
                </TouchableOpacity>
            </View>
            </View>

            <View style={styles.srch}>
            <FlatList
            style={styles.list}
            showsVerticalScrollIndicator
            data={state.data}
            numColumns={3}
            renderItem={({item,index}) => {
               return (
                   <TouchableOpacity style={styles.img} key={index}>
                    <View>
                        <Image style={styles.img} source={{uri:`${api.IMG_URL}${item.poster_path}`}}/>
                    </View>
                   </TouchableOpacity>
               )
            }}
            keyExtractor={(item) => item.id.toString()}
            ListFooterComponent={text ? <View style={{paddingHorizontal:10}}><Button clas={{marginTop:sizes.margin}} text='More' onPress={() => ViewMoreHandler(++state.page)}/></View> : null }
          />  
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header:{
        //width:sizes.width,
        height: 80,
        backgroundColor:colors.black,
        alignItems:'center' ,
        justifyContent:'center',

    },
    search_btn:{
      width:'17%',
      height:40,
      borderWidth:1,
      borderColor:colors.white,
      justifyContent:'center',
      alignItems:'center',
      //marginRight:5,
      backgroundColor:colors.red,
      borderTopRightRadius:sizes.radius,
      borderBottomRightRadius:sizes.radius,

    },
    searchInputContainer:{
        width:'90%',
        height: 40,
        borderWidth:1,
        borderColor:colors.white,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        borderRadius:sizes.radius,

    },
    searchInput:{
      width:'80%',
      height: 40,
      color: colors.white,
      marginLeft:sizes.margin,
      paddingHorizontal:sizes.padding,
    },
    search:{flex: 1,
    justifyContent: 'center',
    width:sizes.width,
     backgroundColor:colors.black
    },
    srch:{
      flex: 1,
      width:sizes.width,
      justifyContent:'center',
      alignItems:'center',
    },
    img:{
        width:(sizes.width / 3),
        height:(sizes.width / 2),
        borderWidth:1,
        borderColor:colors.black,
        // paddingHorizontal:sizes.padding_sm
    },
    list:{
        width:sizes.width,
        display:'flex',
        flexWrap:'wrap',
    }

  })


