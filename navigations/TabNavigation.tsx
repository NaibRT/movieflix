import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from "react-native";
import colors from '../costants/colors';
import Search from '../screens/Search';
import HomeStackNavigation from "./HomeStackNavigation";


 const Tab = createBottomTabNavigator();


function TabNavigation() {
    return (
        <Tab.Navigator
          tabBarOptions={{
              activeTintColor:colors.white,
              inactiveTintColor:colors.gray,
              tabStyle:{
                  borderTopWidth: 0,
                  backgroundColor:colors.black_dark,
                  justifyContent:'space-between',
                  alignItems:'center',
              },
              style:{
                borderTopWidth: 0,
              }
          }}
          
        >
            <Tab.Screen  name='Home' component={HomeStackNavigation} options={{
                tabBarIcon: ({focused,size,color}) => (
                    <View><Ionicons name='ios-home-outline' size={size} color={color} /></View>
                )
            }}/>
            <Tab.Screen  name='Search' component={Search} options={{
                tabBarIcon: ({focused,size,color}) => (
                    <View><Ionicons name='search' size={size} color={color} /></View>
                )
            }}/>

        </Tab.Navigator>
    )
}

export default TabNavigation
