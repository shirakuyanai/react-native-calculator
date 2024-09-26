// In App.js in a new project

import * as React from 'react'
import {View, Text, Button, ScrollView, Alert} from 'react-native'

function HomeScreen({navigation}: any) {
  return (
    <ScrollView>
      <View>
        <Text>Home Screen</Text>
      </View>
    </ScrollView>
  )
}

export default HomeScreen
