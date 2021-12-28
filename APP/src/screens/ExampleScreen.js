import React from 'react'
import { View, Text, Button } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-crop-picker'
import storage from '@react-native-firebase/storage'

export default function HomeScreen({ navigation }) {
  const submitPost = async (imagePath) => {
    let filename = imagePath.substring(imagePath.lastIndexOf('/') + 1) 
    try {
      await storage().ref(filename).putFile(imagePath)
    } catch (error) {
      console.log(error)
    }
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      console.log(image)
      submitPost(image.path)
    })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
      <Text>Home Screen</Text>
      <Button
        onPress={() => {navigation.navigate('Detail')}}
        title="Learn More"
        color="#841584"
      />
      <Button
        onPress={() => {navigation.openDrawer()}}
        title="Open Drawer"
        color="#841584"
      />
      <Icon name="ios-person" size={30} color="#4F8EF7" />
      <FontAwesome name="rocket" size={30} color="white" />
      <Button
        onPress={() => choosePhotoFromLibrary()}
        title="Choose Photo"
        color="#841584"
      />
    </View>
  )
}