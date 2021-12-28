import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Avatar from '../components/Avatar'
import Post from '../components/Home/Post'
import storage from '@react-native-firebase/storage'
import { useSelector } from 'react-redux'

export default function UserScreen({ navigation, route }) {
  const { user } = useSelector(state => state.userReducer)
  const [focusedTab, setFocusedTab] = useState('post')
  const [account, setAccount] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [isFollowing, setFollowing] = useState(false)
  const account_id = route.params.user_id

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
  
  const getDateFromTimestamp = (timestamp) => {
    let date = new Date(timestamp * 1000)
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    return day + '/' + month + '/' + year
  }

  const processData = async (account) => {
    account['created'] = getDateFromTimestamp(account['created'])
    account['avatar_id'] = await getImage('avatar/' + account['avatar_id'] + '.jpg')
    account['cover_id'] = await getImage('recipe/' + '9.jpg')
    for(let i = 0; i < account['posts'].length; i++) {
      account['posts'][i]['image_id'] = await getImage('recipe/' + account['posts'][i]['image_id'])
      account['posts'][i]['avatar_id'] = await getImage('avatar/' + account['posts'][i]['avatar_id'] + '.jpg')
    }
    for(let i = 0; i < account['liked_posts'].length; i++) {
      account['liked_posts'][i]['image_id'] = await getImage('recipe/' + account['liked_posts'][i]['image_id'])
      account['liked_posts'][i]['avatar_id'] = await getImage('avatar/' + account['liked_posts'][i]['avatar_id'] + '.jpg')
      account['liked_posts'][i]['is_like'] = true
    }
    for(let i = 0; i < account['following'].length; i++) {
      account['following'][i]['avatar_id'] = await getImage('avatar/' + account['following'][i]['avatar_id'] + '.jpg')
    }
    for(let i = 0; i < account['follower'].length; i++) {
      account['follower'][i]['avatar_id'] = await getImage('avatar/' + account['follower'][i]['avatar_id'] + '.jpg')
      if (account['follower'][i]['user_id'] == user['user_id']) setFollowing(true)
    }
  }

  const createFollowing = (following_id) => {
    fetch('https://inverse-cooking-api.herokuapp.com/follow', {
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
    setFollowing(true)
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://inverse-cooking-api.herokuapp.com/user/' + account_id)
        let json = await response.json()
        await processData(json)
        setAccount(json)
        setLoading(false)
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData()
  }, [account])

  if (isLoading)
  return (
    <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator 
        size={100} 
        color="crimson" 
        hidesWhenStopped={!isLoading}
      />
    </View>
  )

  if (!isLoading)
  return (
    <ScrollView style={{ flex: 1 }}>
      {
        account !== undefined ?
        <ImageBackground
          style={{height: 100, width: '100%', backgroundColor: '#555'}}
          source={{uri: account['cover_id']}}
        /> :
        <View style={{height: 100, width: '100%', backgroundColor: '#555'}}>
        </View>
      }
      <View style={{position: 'relative', bottom: 30, left: 10}}>
        <Avatar 
          size={true} 
          avatar_url={account['avatar_id']}
        />
      </View>
      <View style={{height: 60, width: 120, alignSelf: 'flex-end', position: 'absolute', top: 100, right: 10}}>
        <TouchableOpacity
          style={{height: 45, width: 120, borderRadius: 25, backgroundColor: 'crimson', justifyContent: 'center', alignItems: 'center', marginTop: 7.5}}
          onPress={() => {
            if (user['user_id'] == account_id) {
              navigation.navigate('ChangeAvatar')
            }
            else {
              createFollowing(account['user_id'])
            }
          }}
        >
          <Text style={{fontSize: 18, color: 'white'}}>
            {user['user_id'] == account_id ? 'Chỉnh sửa': isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{width: '100%', paddingLeft: 10}}>
        <Text style={{color: 'black', fontSize: 30, fontWeight: '700'}}>{account['username']}</Text>
        <Text style={{color: 'black', fontSize: 20}}>@{account['loginname']}</Text>
        <Text style={{color: 'black', fontSize: 18}}>Tham gia vào {account['created']}</Text>
        <Text style={{color: 'black', fontSize: 18, paddingVertical: 5}}>Thông tin giới thiệu</Text>
        <View style={{flexDirection: 'row', paddingVertical: 5}}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>{account['num_following']}</Text>
          <Text> </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Follow', account['following'] !== undefined && {'focus': 'following', 'following': account['following'], 'follower': account['follower']})}
          >
            <Text style={{color: 'black', fontSize: 18}}>Đang theo dõi</Text>
          </TouchableOpacity>
          <Text>    </Text>
          <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>{account['num_follower']}</Text>
          <Text> </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Follow', account['follower'] !== undefined && {'focus': 'followers', 'follower': account['follower']})}
          >
            <Text style={{color: 'black', fontSize: 18}}>Người theo dõi</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.recipeHeader}>
        <TouchableOpacity 
          style={[focusedTab == 'post' && styles.recipeHeaderFocusedTab, styles.recipeHeaderTab]}
          onPress={() => setFocusedTab('post')}
        >
          <Text style={[focusedTab == 'post' ? styles.recipeHeaderFocusedText : styles.recipeHeaderText]}>Đã Đăng</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[focusedTab == 'like' && styles.recipeHeaderFocusedTab, styles.recipeHeaderTab]}
          onPress={() => {setFocusedTab('like')}}
        >
          <Text style={[focusedTab == 'like' ? styles.recipeHeaderFocusedText : styles.recipeHeaderText]}>Đã Thích</Text>
        </TouchableOpacity>
      </View>
      {
        focusedTab == 'post' && account['posts'] !== undefined &&
        account['posts'].map((post) => (
          <Post navigation={navigation} post={post} key={post['post_id']}/>
        ))
      }
      {
        focusedTab == 'like' && account['liked_posts'] !== undefined &&
        account['liked_posts'].map((post) => (
          <Post navigation={navigation} post={post} key={post['post_id']}/>
        ))
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  recipeTitle: {
    color: 'white',
    paddingHorizontal: 10,
    backgroundColor: 'crimson',
    fontSize: 25,
    maxWidth: '100%'
  },
  recipeHeader: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  recipeHeaderTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  recipeHeaderFocusedTab: {
    borderBottomColor: 'crimson', 
    borderBottomWidth: 2
  },
  recipeHeaderFocusedText: {
    color: 'crimson',
    fontSize: 18,
  },
  recipeHeaderText: {
    color: 'black',
    fontSize: 18
  }
})