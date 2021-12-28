import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import Feather from 'react-native-vector-icons/Feather'

export default function ChangeAvatarScreen({ navigation, route }) {
  const [image, setImage] = useState('')
  const user = route.params

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
    .then(image => {
      setImage(image.path)
    })
  }

  return(
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
      <Text style={{fontSize: 30, color: 'crimson', marginTop: 10, textAlign: 'center'}}>Chọn ảnh đại diện</Text>
      <TouchableOpacity
        onPress={choosePhotoFromLibrary}
        style={{ justifyContent: 'center', alignItems: 'center'}}
      > 
        <View style={{width: 310, height: 310, borderRadius: 400, backgroundColor: 'crimson', justifyContent: 'center', alignItems: 'center'}}>
          <Image 
            style={{height: 300, width: 300, borderRadius: 300, alignSelf: 'center'}}
            source={image == '' ? {uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkBvTVFjdQ1me6gQYpK5waENk2wPBQ_E_MyA&usqp=CAU'} 
            : {uri: image}}
          />
          { 
            image == '' &&
            <Feather name={'camera'} size={50} color={'#f56991'} style={{position: 'absolute'}}/>
          }
        </View>
        </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: 'crimson', alignSelf: 'center'}]}
        onPress={() => {
          navigation.navigate('ChangeCover', {avatar: image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkBvTVFjdQ1me6gQYpK5waENk2wPBQ_E_MyA&usqp=CAU', ...user})
        }}
      >
        <Text style={{color: 'white', fontSize: 20}}>Đi tiếp</Text>
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