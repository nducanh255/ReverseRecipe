import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

export default function Instructions(props) {
  return(
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'crimson', fontSize: 20}}>Hướng dẫn</Text>
      <FlatList 
        data={props.instructions}
        renderItem={({item}) => (
          <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10}}>
            <View style={{height: 5, width: 5, borderRadius: 5, backgroundColor: 'crimson', marginLeft: 15, marginRight: 5}} />
            <TouchableOpacity
              onPress={() => { props.navigation.navigate('Instructions', {'url': item})}}
            >
              <Text style={{color: 'black', fontSize: 18, fontStyle: 'italic', textDecorationLine: 'underline'}}>{item}</Text>
            </TouchableOpacity>
          </View>
        )}
        style={{width: '100%'}}
      />
    </View>
  )
}