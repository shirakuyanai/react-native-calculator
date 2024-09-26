// In App.js in a new project

import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import HomeScreen from './Screens/HomeScreen'
import DetailsScreen from './Screens/DetailsScreen'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Tab = createBottomTabNavigator()

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = ''

            if (route.name === 'Home') {
              iconName = 'home'
            } else if (route.name === 'Details') {
              iconName = 'address-card'
            }

            // You can return any component that you like here!
            return <FontAwesome5 name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Details" component={DetailsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
