import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import storage from '@react-native-firebase/storage'
import Ingredients from '../components/Recipe/Ingredients'
import { useSelector } from 'react-redux'

export default function PostScreen({ navigation, route }) {
  const { user } = useSelector(state => state.userReducer)

  const submitPost = async (imagePath, folder) => {
    let filename = imagePath.substring(imagePath.lastIndexOf('/') + 1) 
    try {
      await storage().ref(folder + '/' + filename).putFile(imagePath)
    } catch (error) {
      console.log(error)
    }
    return filename
  }

  const createPost = () => {
    fetch('https://inverse-cooking-api.herokuapp.com/post', {
      method: 'POST',
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain',
      },
      body: JSON.stringify({
        'user_id': user['user_id'], 
        'image_id': route.params.image,
        'title': route.params.title,
        'ingredients': route.params.ingredients
      })
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        ToastAndroid.show(response, ToastAndroid.SHORT)
      })
      .catch((error) => console.log('error ', error))
  }

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View>
        <ImageBackground
          source={{uri: route.params?.image}}
          resizeMode={'cover'}
          style={{flex: 1, height: 210}}
        />
        <View style={{marginTop: 210}}></View>
        <Text style={{fontSize: 20, color: 'crimson', textAlign: 'center', marginVertical: 10}}>{route.params?.title}</Text>
        <Ingredients ingredients={route.params?.ingredients}/>
      </View>
      <TouchableOpacity 
        style={styles.postButton}
        onPress={async () => {
          submitPost(route.params.image, 'recipe')
          createPost()
          navigation.navigate('Home')
        }}
      >
        <Text style={{color: 'white', fontSize: 20}}>Đăng</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  postButton: {
    height: 50, 
    width: '95%', 
    backgroundColor: 'crimson', 
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'center', 
    marginVertical: 10, 
    borderRadius: 10
  }
})