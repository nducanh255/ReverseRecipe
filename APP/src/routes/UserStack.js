import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserScreen from '../screens/UserScreen'
import FollowScreen from '../screens/FollowScreen'
import ExploreScreen from '../screens/ExploreScreen'

const Stack = createNativeStackNavigator()

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="User" component={UserScreen} />
      <Stack.Screen name="Follow" component={FollowScreen} />
      <Stack.Screen name="Explore" component={ExploreScreen} />
    </Stack.Navigator>
  )
} 