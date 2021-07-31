import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import colors from './costants/colors';
import TabNavigation from './navigations/TabNavigation';

export default function App() {
  return (
    <View style={styles.container}>
         <StatusBar style="light" backgroundColor='transparent' />
      <NavigationContainer>
         <TabNavigation/>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black_dark,
  },
});
