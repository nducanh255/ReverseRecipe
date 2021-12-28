import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 })

export default function DetailScreen({route}) {

  return (
    <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} 
       style={styles.map}
       region={{
        latitude: route.params.lat,
        longitude: route.params.lon,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
       }}
     >
       <Marker 
        coordinate={{
          latitude: route.params.lat,
          longitude: route.params.lon,
        }}
       />
     </MapView>
   </View>
  )
}