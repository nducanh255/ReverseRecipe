import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import Feather from 'react-native-vector-icons/Feather'
import { useSelector } from 'react-redux'
import storage from '@react-native-firebase/storage'

export default function ChangeCoverScreen({ navigation, route }) {
  const { user } = useSelector(state => state.userReducer)
  const [image, setImage] = useState('')
  const [updatedAvatar, setUpdatedAvatar] = useState(route.params.avatar)
  const [updatedCover, setUpdatedCover] = useState(image)

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

  const submitPost = async (imagePath, folder) => {
    let filename = imagePath.substring(imagePath.lastIndexOf('/') + 1) 
    try {
      await storage().ref(folder + '/' + filename).putFile(imagePath)
    } catch (error) {
      console.log(error)
    }
    return filename
  }

  const updateAccount = () => {
    try {
      setUpdatedAvatar(submitPost(updatedAvatar, 'avatar'))
      setUpdatedCover(submitPost(image, 'cover'))
    }
    catch (error) {
      console.log(error)
    }
    
    fetch('https://inverse-cooking-api.herokuapp.com/user/' + user['user_id'], {
      method: 'PUT',
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain',
      },
      body: JSON.stringify({
        'user_id': user['user_id'],
        'avatar_id': updatedAvatar,
        'cover_id': image
      })
    })
      .then((response) => response.json())
      .then((response) => {
        navigation.navigate('User', {'user_id': user['user_id']})
      })
      .catch((error) => console.log('error ', error))
  }

  return(
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
      <Text style={{fontSize: 30, color: 'crimson', marginTop: 10, textAlign: 'center'}}>Chọn ảnh đại diện</Text>
      <View>
        <TouchableOpacity
          onPress={choosePhotoFromLibrary}
        >
        {
          image !== '' ?
          <Image 
            style={{height: 150, width: '90%', alignSelf: 'center'}}
            source={{uri: image}}
          />
          :
          <View style={{height: 150, width: '90%', backgroundColor: '#555', alignSelf: 'center',justifyContent: 'center', alignItems: 'center'}}>
            <Feather name={'camera'} size={50} color={'#f56991'} style={{position: 'absolute'}}/>
          </View>
        }
        </TouchableOpacity>
        <View style={{position: 'absolute', width: '90%', alignSelf: 'center', bottom: 65, left: 35}}>
          <Image 
            style={{height: 65, width: 65, borderRadius: 65}}
            source={{uri: route.params.avatar}}
          />
        </View>
        <View style={{width: '90%', marginTop: 30, alignSelf: 'center'}}>
          <Text style={{color: 'black', fontSize: 30, fontWeight: '700'}}>{user['username']}</Text>
          <Text style={{color: 'black', fontSize: 20}}>@{user['loginname']}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: 'crimson', alignSelf: 'center'}]}
        onPress={() => {
          updateAccount()
          navigation.navigate('User', {'user_id': user['user_id']})
        }}
      >
        <Text style={{color: 'white', fontSize: 20}}>Cập nhật</Text>
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