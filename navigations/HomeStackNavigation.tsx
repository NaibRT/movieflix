import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import colors from '../costants/colors';
import ActorDetail from "../screens/ActorDetail";
import Home from "../screens/Home";
import MovieDetail from "../screens/MovieDetail";

 const HomeStack = createStackNavigator();

 interface Props {
    navigation:{}
 }
function HomeStackNavigation({navigation}:Props) {
    return (
        <HomeStack.Navigator 
          screenOptions={{
            title:'MOVIEFLIX',
            headerTintColor:colors.red,
            headerTitleStyle:{
              fontSize:30,
            },
            headerStyle:{
                backgroundColor:colors.black,
                borderBottomColor:colors.black,
                shadowColor: 'transparent',
            }
            }}
        >
            <HomeStack.Screen name='Home' component={Home}/>
            <HomeStack.Screen name='MovieDetail' component={MovieDetail}/>
            <HomeStack.Screen name='ActorDetail' component={ActorDetail}/>


        </HomeStack.Navigator>
    )
}

export default HomeStackNavigation
