import React, { useState } from 'react'
import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/actions'

export default function SignInScreen({ navigation }) {
  const { user } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  
  const [username, setUsername] = useState('')
  const [loginname, setLoginname] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const signUp = () => fetch('https://inverse-cooking-api.herokuapp.com/signup', {
    method: 'POST',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'text/plain',
    },
    body: JSON.stringify({
      username, loginname, password, confirmPwd, email, phone
    })
  })
  .then((response) => response.json())
  .then((response) => {
    if (typeof response === 'object') {
      dispatch(setUser(response))
      navigation.navigate('Home', {user: response})
      console.log(response)
    }
    else {
      ToastAndroid.show(response, ToastAndroid.SHORT)
    }
  })
  .catch((error) => console.log('error ', error))

  return (
    <ScrollView>
      <ImageBackground
        source={{uri: 'https://www.bodyinmotion.co.nz/wp-content/uploads/2020/01/iStock-1155240408.jpg'}}
        resizeMode={'cover'}
        style={{height: '100%', opacity: 0.7, zIndex: 0, position: 'absolute', top: 0, left: 0}}
      />
      <View style={styles.container}>
        <TextInput
          style={styles.input} 
          onChangeText={val => setUsername(val)}
          value={username}
          placeholder={'Tên người dùng'}
          placeholderTextColor={'black'}
        />
        <TextInput
          style={styles.input} 
          onChangeText={val => setLoginname(val)}
          value={loginname}
          placeholder={'Tên đăng nhập'}
          placeholderTextColor={'black'}
        />
        <TextInput
          style={styles.input} 
          secureTextEntry={true}
          onChangeText={val => setPassword(val)}
          value={password}
          placeholder={'Mật khẩu'}
          placeholderTextColor={'black'}
        />
        <TextInput
          style={styles.input} 
          secureTextEntry={true}
          onChangeText={val => setConfirmPwd(val)}
          value={confirmPwd}
          placeholder={'Xác nhận mật khẩu'}
          placeholderTextColor={'black'}
        />
        <TextInput
          style={styles.input} 
          onChangeText={val => setEmail(val)}
          value={email}
          placeholder={'Email'}
          placeholderTextColor={'black'}
        />
        <TextInput
          style={styles.input} 
          onChangeText={val => setPhone(val)}
          value={phone}
          placeholder={'Số điện thoại'}
          placeholderTextColor={'black'}
        />
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'crimson'}]}
          onPress={() => signUp()}
        >
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    height: '100%', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'white'
  },
  input: {
    height: 50, 
    width: '95%', 
    backgroundColor: 'white', 
    marginVertical: 10, 
    fontSize: 20, 
    paddingLeft: 20,
    borderBottomWidth: 2,
    borderColor: 'crimson',
    color: 'black'
  },
  button: {
    height: 50, 
    width: '95%', 
    marginVertical: 10, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})