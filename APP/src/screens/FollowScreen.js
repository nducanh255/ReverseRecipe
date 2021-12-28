import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import FollowUser from '../components/Follow/FollowUser'

export default function FollowScreen({ navigation, route }) {
  const [focusedTab, setFocusedTab] = useState(route.params.focus)
  const [following, setFollowing] = useState(route.params.following)
  const [follower, setFollower] = useState(route.params.follower)
  console.log(following)

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.recipeHeader}>
        <TouchableOpacity 
          style={[focusedTab == 'following' && styles.recipeHeaderFocusedTab, styles.recipeHeaderTab]}
          onPress={() => setFocusedTab('following')}
        >
          <Text style={[focusedTab == 'following' ? styles.recipeHeaderFocusedText : styles.recipeHeaderText]}>Đang theo dõi</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[focusedTab == 'followers' && styles.recipeHeaderFocusedTab, styles.recipeHeaderTab]}
          onPress={() => {setFocusedTab('followers')}}
        >
          <Text style={[focusedTab == 'followers' ? styles.recipeHeaderFocusedText : styles.recipeHeaderText]}>Được theo dõi</Text>
        </TouchableOpacity>
      </View>
      {
        (focusedTab == 'following' && following !== undefined) &&
        following.map((user) => (
          <FollowUser 
            key={user['user_id']}
            init_following={user}
            navigation={navigation}
          />
        ))
      }
      {
        (focusedTab == 'followers' && follower !== undefined) &&
        follower.map((user) => (
          <FollowUser 
            key={user['user_id']}
            init_following={user}
            navigation={navigation}
          />
        ))
      }
    </View>
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