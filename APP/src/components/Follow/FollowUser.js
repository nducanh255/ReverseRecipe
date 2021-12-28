import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Avatar from '../Avatar'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function FollowUser({init_following, navigation, createFollowing}) {
  const [following, setFollow] = useState(init_following)
  const [isFollowing, setFollowing] = useState(init_following['is_following'])

  return(
    <View style={{borderBottomColor: 'crimson', borderBottomWidth: 2, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', paddingVertical: 10}}>
      <View style={{width: '100%', flexDirection: 'row'}}>
        <TouchableOpacity 
          style={{padding: 5}}
          onPress={() => navigation.navigate('User', {'user_id': following['user_id']})}
        >
          <Avatar size={true} avatar_url={following['avatar_id']}/>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
          <View style={{paddingLeft: 10, justifyContent: 'center'}}>
            <Text style={{color: 'black', fontSize: 20, fontWeight: '500'}}>{following['username']}</Text>
            <Text style={{color: '#555', fontSize: 18, fontWeight: '500'}}>{following['loginname']}</Text>
          </View>
          <View style={{flex: 1, alignSelf: 'flex-end', marginRight: 20}}>
            <TouchableOpacity
              style={{flex: 1, borderRadius: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end'}}
              onPress={() => {
                setFollowing(!isFollowing)
                createFollowing(following['user_id'])
              }}
            >
              <AntDesign name={isFollowing ? 'pluscircle' : 'pluscircleo'} size={36} color="crimson" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}