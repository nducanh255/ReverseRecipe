import React from 'react'
import { TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ImagePicker from 'react-native-image-crop-picker'

export default function AddPostButton({ navigation }) {
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
    })
    .then(image => {
      ToastAndroid.show('Đang xử lý', ToastAndroid.SHORT)
      fetch('https://inverse-cooking.herokuapp.com/predict', {
        method: 'POST',
        headers : {
          'Accept' : 'application/json',
          'Content-Type' : 'text/plain',
        },
        body: JSON.stringify({'image': image.data})
      })
        .then((response) => response.json())
        .then((response) => {
          navigation.navigate('Post', {
            image: image.path,
            ingredients: response['ingredients'],
            title: response['title']
          })
        })
        .catch((error) => console.log('error ', error))
    })
  }

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={choosePhotoFromLibrary}
    >
      <AntDesign name="plus" size={30} color="white" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    backgroundColor: 'crimson',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 25,
    right: 25,
    zIndex: 1
  },
})
