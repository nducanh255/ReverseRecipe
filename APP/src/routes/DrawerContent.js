import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import Avatar from '../components/Avatar'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import storage from '@react-native-firebase/storage'

export default function DrawerContent(props) {
  const { user } = useSelector(state => state.userReducer)
  const [ avatar, setAvatar ] = useState('')

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setAvatar(await getImage('avatar/' + user['avatar_id'] + '.jpg'))
  //   }
  //   fetchData()
  // }, [user])

  const fetchData = async () => {
    setAvatar(await getImage('avatar/' + user['avatar_id'] + '.jpg'))
  }
  fetchData()

  return (
    <View style={{flex: 1, marginLeft: 10}}>
      <DrawerContentScrollView {...props}>
        <View>
          {/* Avatar content */}
          <View style={{flexDirection:'row', marginTop: 10}}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('User', {'user_id': user['user_id']})}
            >
              <Avatar size={true} avatar_url={avatar}/>
            </TouchableOpacity>
            <View style={{flexDirection:'column', flex: 1, paddingVertical: 10, paddingLeft: 10, justifyContent: 'space-around'}}>
              <Text style={{color: 'black', fontSize: 20, letterSpacing: -1}}>{ user['username'] }</Text>
              <Text style={{color: '#555', fontSize: 15}}>{ '@' + user['loginname'] }</Text>
            </View>
          </View>
          {/* Following - follower */}
          <View style={{flexDirection: 'row', paddingVertical: 10}}>
            <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>{ user['num_following'] || 0 }</Text>
            <Text style={{color: '#555', fontSize: 15}}> Following   </Text>
            <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>{ user['num_follower'] || 0}</Text>
            <Text style={{color: '#555', fontSize: 15}}> Followers </Text>
          </View>
          <View style={styles.drawerItemContainer}>
            <AntDesign name="home" size={25} color="crimson" />
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Home')}
            >
              <Text style={styles.drawerItemText}>Home</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.drawerItemContainer}>
            <AntDesign name="user" size={25} color="crimson" />
            <TouchableOpacity
              onPress={() => props.navigation.navigate('User', {'user_id': user['user_id']})}
            >
              <Text style={styles.drawerItemText}>Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.drawerItemContainer}>
            <AntDesign name="team" size={25} color="crimson" />
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Explore')}
            >
              <Text style={styles.drawerItemText}>Explore</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.drawerItemContainer}>
            <AntDesign name="rest" size={25} color="crimson" />
            <Text style={styles.drawerItemText}>Restaurants</Text>
          </View>
          <View style={styles.drawerItemContainer}>
            <AntDesign name="setting" size={25} color="crimson" />
            <Text style={styles.drawerItemText}>Settings</Text>
          </View>
          <View style={styles.drawerItemContainer}>
            <AntDesign name="hearto" size={25} color="crimson" />
            <Text style={styles.drawerItemText}>Support</Text>
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={[styles.drawerItemContainer, {paddingBottom: 50}]}>
        <AntDesign name="logout" size={25} color="crimson" />
        <TouchableOpacity
          onPress={() => {props.navigation.navigate('SignIn')}}
        >
          <Text style={styles.drawerItemText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerItemContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 10
  },
  drawerItemText: {
    color: 'black', 
    fontSize: 15, 
    paddingLeft: 20
  }
})