import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import FollowUser from '../components/Follow/FollowUser'

export default function RecommendScreen({ navigation }) {
  

  return(
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
      <View>
        {/* <FollowUser />
        <FollowUser />
        <FollowUser /> */}
      </View>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: 'crimson', alignSelf: 'center'}]}
        onPress={() => {navigation.navigate('Home')}}
      >
        <Text style={{color: 'white', fontSize: 20}}>Đến màn hình chính</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 50, 
    width: '95%', 
    marginVertical: 10, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})