import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import FollowUser from '../components/Follow/FollowUser'
import storage from '@react-native-firebase/storage'

export default function ExploreScreen({ navigation }) {
  const { user } = useSelector(state => state.userReducer)
  console.log(user)
  const [users, setUsers] = useState([])
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

  const processData = async (users) => {
    for(let i = 0; i < users.length; i++) {
      users[i]['avatar_id'] = await getImage('avatar/' + users[i]['avatar_id'] + '.jpg')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://inverse-cooking-api.herokuapp.com/users/' + user['user_id'])
        let json = await response.json()
        await processData(json)
        setUsers(json)
        setLoading(false)
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData()
  }, [])

  const createFollowing = (following_id) => {
    fetch('http://10.0.2.2:5000/follow', {
      method: 'POST',
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain',
      },
      body: JSON.stringify({'user_id': user['user_id'], 'following_id': following_id})
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log('error ', error))
  }

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

  if (!isLoading)
  return (
    <ScrollView style={{flex: 1}}>
      {
        users.map((user) => (
          <FollowUser 
            key={user['user_id']}
            init_following={user}
            navigation={navigation}
            createFollowing={createFollowing}
          />
        ))
      }
    </ScrollView>
  )
}