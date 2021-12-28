import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function Restaurant({restaurant, navigation}) {
  return (
    <TouchableOpacity 
      style={{width: '100%', borderBottomColor: 'crimson', borderBottomWidth: 2, paddingVertical: 10}}
      onPress={() => navigation.navigate('Detail', {'lat': restaurant['lat'], 'lon': restaurant['lon']})}
    >
      <View style={{paddingHorizontal: 10}}>
        <Text style={{color: 'crimson', fontSize: 21}}>{restaurant['name']}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{height: 5, width: 5, borderRadius: 5, backgroundColor: 'crimson', marginHorizontal: 5}} />
          <Text style={{color: 'black', fontSize: 18}}>{restaurant['reviewScore']}</Text>
          <View style={{flexDirection: 'row', paddingLeft: 5}}>
            {
              Array(Math.floor(restaurant['reviewScore'])).fill(0).map(() => (
                <AntDesign name='star' size={20} color="orange" />
              ))
            }
            {
              Array(5 - Math.floor(restaurant['reviewScore'])).fill(0).map(() => (
                <AntDesign name='staro' size={20} color="orange" />
              ))
            }
          </View>
          <View style={{height: 5, width: 5, borderRadius: 5, backgroundColor: 'crimson', marginHorizontal: 5}} />
          <Text style={{color: 'black', fontSize: 18}}>{restaurant['numReview']} đánh giá</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{height: 5, width: 5, borderRadius: 5, backgroundColor: 'crimson', marginHorizontal: 5, marginTop: 10}} />
          <Text style={{color: 'black', fontSize: 18}}>{restaurant['address']}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{height: 5, width: 5, borderRadius: 5, backgroundColor: 'crimson', marginHorizontal: 5, marginTop: 10}} />
          <Text style={{color: 'black', fontSize: 18}}>{restaurant['phoneNum']}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}