import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Avatar from '../Avatar'
import { useSelector } from 'react-redux'

export default function Post({navigation, post}) {
  const { user } = useSelector(state => state.userReducer)

  const createLike = async (post_id) => {
    fetch('https://inverse-cooking-api.herokuapp.com/like', {
      method: 'POST',
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain',
      },
      body: JSON.stringify({
        'user_id': user['user_id'], 
        'like_id': post_id,
        'is_post': true
      })
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log('error ', error))
  }

  return(
    <View style={styles.container}>
      <TouchableOpacity
        onPress={()=> { navigation.navigate('User', {'user_id': post['user_id']}) }}
      >
        <Avatar 
          size={true} 
          navigation={navigation}
          avatar_url={post['avatar_id']}
        />
      </TouchableOpacity>
      <View style={styles.postContent}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.username}>{post['username']}</Text>
            <Text style={styles.userid}>@{post['loginname']}</Text>
          </View>
          <Text style={styles.userid}>{post['created']}</Text>
        </View>
        <TouchableOpacity
          onPress={()=>navigation.navigate('Recipe', {'post_id': post['post_id'], 'is_like': post['is_like']})}
        >
          {
            post['image_id'] !== undefined ?
            <Image 
              style={{width: '100%', height: 200, borderRadius: 10, marginTop: 5}}
              source={{uri: post['image_id']}}
              resizeMode={'cover'}
            /> :
            <View style={{width: '100%', height: 200, backgroundColor: 'green', borderRadius: 10, marginTop: 5}}/>
          }
        </TouchableOpacity>
        
        <View style={{width: '100%', height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}> 
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                createLike(post['post_id'])
              }}
            >
              <AntDesign name={post['is_like'] ? "heart" : 'hearto'} size={25} color="crimson" />
            </TouchableOpacity>
            <Text style={{fontSize: 15, color: 'black', paddingLeft: 5}}>{post['num_likes']}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <AntDesign name="message1" size={25} color="crimson" />
            <Text style={{fontSize: 15, color: 'black', paddingLeft: 5}}>{post['num_comments']}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <AntDesign name="profile" size={25} color="crimson" />
            <Text style={{fontSize: 15, color: 'black', paddingLeft: 5}}>{post['num_ingredients']}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <AntDesign name="enviromento" size={25} color="crimson" />
            <Text style={{fontSize: 15, color: 'black', paddingLeft: 5}}>{post['num_locations']}</Text>
          </View>
        </View>
      </View>
    </View>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 10
  }, 
  postContent: {
    flex: 1, 
    marginLeft: 10
  },
  username: {
    color: 'black',
    fontSize: 20,
  },
  userid: {
    color: '#555',
    fontSize: 16,
  }
})