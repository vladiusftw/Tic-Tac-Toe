import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import Home from './Screens/Home'
import Game  from './Screens/Game'
const Stack = createStackNavigator()

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Game" component={Game}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}