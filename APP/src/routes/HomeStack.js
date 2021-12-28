import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Feather from 'react-native-vector-icons/Feather'
import HomeScreen from '../screens/HomeScreen'
import DetailScreen from '../screens/DetailScreen'
import RecipeScreen from '../screens/RecipeScreen'
import UserScreen from '../screens/UserScreen'
import FollowScreen from '../screens/FollowScreen'
import PostScreen from '../screens/PostScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import RecommendScreen from '../screens/RecommendScreen'
import ChangeAvatarScreen from '../screens/ChangeAvatarScreen'
import ChangeCoverScreen from '../screens/ChangeCoverScreen'
import InstructionsScreen from '../screens/InstructionsScreen'
import ExploreScreen from '../screens/ExploreScreen'

const Stack = createNativeStackNavigator()

export default function HomeStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'crimson',
        },
        headerTintColor: 'white',
        title: ''
      }}
      initialRouteName='SignIn'
    >
      <Stack.Screen 
        name="SignIn" 
        component={SignInScreen} 
        options={{
          title: 'Reverse Recipe',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} 
        options={{
          title: 'Reverse Recipe',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen 
        name="Recommend" 
        component={RecommendScreen} 
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          headerLeft: () => 
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
          >
            <Feather name="menu" size={25} color="white" />
          </TouchableOpacity>,
        }} 
      />
      <Stack.Screen 
        name="ChangeAvatar" 
        component={ChangeAvatarScreen} 
        options={{
          headerBackVisible: false
        }}
      />
      <Stack.Screen name="ChangeCover" component={ChangeCoverScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="User" component={UserScreen} />
      <Stack.Screen name="Follow" component={FollowScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="Instructions" component={InstructionsScreen} />
      <Stack.Screen name="Explore" component={ExploreScreen} />
    </Stack.Navigator>
  )
} 