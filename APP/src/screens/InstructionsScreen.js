import React from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview'

export default function InstructionsScreen({route}) {
  return(
    <View style={{flex: 1, flexDirection:'column'}}>
      <WebView 
        source={{uri: route.params.url}} 
        style={{ width: '100%',height:'100%'}} 
      />
    </View>
  )
}