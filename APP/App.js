import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeStack from './src/routes/HomeStack'
import UserStack from './src/routes/UserStack'
import DrawerContent from './src/routes/DrawerContent'
import { Provider } from 'react-redux'
import { Store } from './src/redux/store'

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Drawer.Navigator 
          drawerContent={props => <DrawerContent {...props}/>}
          screenOptions={{headerShown: false}}
        >
          <Drawer.Screen name="HomeStack" component={HomeStack} />
          <Drawer.Screen name="UserStack" component={UserStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  )
}