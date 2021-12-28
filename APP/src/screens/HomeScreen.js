import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, ScrollView } from 'react-native'
import AddPostButton from '../components/Home/AddPostButton'
import Post from '../components/Home/Post'
import storage from '@react-native-firebase/storage'
import { useSelector } from 'react-redux'

export default function HomeScreen({ navigation, route }) {
  const { user } = useSelector(state => state.userReducer)
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)

  const getImage = async (imagePath) => {
    try {
      const ref = storage().ref(imagePath);
      const url = await ref.getDownloadURL()
      return url
    }
    catch (error) {
      console.log(error)
    }
  }

  const processData = async (posts) => {
    for(let i = 0; i < posts.length; i++) {
      posts[i]['image_id'] = await getImage('recipe/' + posts[i]['image_id'])
      posts[i]['avatar_id'] = await getImage('avatar/' + posts[i]['avatar_id'] + '.jpg')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://inverse-cooking-api.herokuapp.com/posts/' + user['user_id'])
        let json = await response.json()
        await processData(json)
        setLoading(false)
        setData(json)
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData()
  })

  if (isLoading)
  return (
    <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
      <ActivityIndicator 
        size={100} 
        color="crimson" 
        hidesWhenStopped={!isLoading}
      />
    </View>
  )

  if(!isLoading)
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <ScrollView>
      {
        data.map((post) => (
          <Post 
            key={post['post_id']}
            post={post}
            navigation={navigation}
            route={route}
          />
        )) 
      }
      <View style={{height: 100, width: '100%'}}></View>
      </ScrollView>
      <AddPostButton navigation={navigation}/>
    </View>
  )
}