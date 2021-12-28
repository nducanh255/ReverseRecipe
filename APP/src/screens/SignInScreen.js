import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/actions'

export default function SignInScreen({ navigation }) {
  const { user } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  const [loginname, setLoginname] = useState('')
  const [password, setPassword] = useState('')

  const signIn = () => fetch('https://inverse-cooking-api.herokuapp.com/signin', {
    method: 'POST',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'text/plain',
    },
    body: JSON.stringify({'loginname': loginname, 'password': password})
  })
  .then((response) => response.json())
  .then((response) => {
    if (typeof response === 'object') {
      dispatch(setUser(response))
      navigation.navigate('Home', {user: response})
      setLoginname('')
      setPassword('')
    }
    else {
      ToastAndroid.show(response, ToastAndroid.SHORT)
      setLoginname('')
      setPassword('')
    }
  })
  .catch((error) => console.log('error ', error))

  return (
    <View>
      <ImageBackground
        source={{uri: 'https://www.bodyinmotion.co.nz/wp-content/uploads/2020/01/iStock-1155240408.jpg'}}
        resizeMode={'cover'}
        style={{height: '100%', opacity: 0.7}}
      />
      <View style={styles.container}>
        <TextInput
          style={styles.input} 
          onChangeText={(text) => setLoginname(text)}
          value={loginname}
          placeholder={'Tên đăng nhập'}
          placeholderTextColor={'black'}
        />
        <TextInput
          style={styles.input} 
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder={'Mật khẩu'}
          placeholderTextColor={'black'}
        />
        <View style={{height: 100}}></View>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'crimson'}]}
          onPress={() => signIn()}
        >
          <Text style={{color: 'white', fontSize: 20}}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'white'}]}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={{color: 'crimson', fontSize: 20, fontWeight: 'bold'}}>Chưa có tài khoản? Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    width: '100%', 
    height: '100%', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  input: {
    height: 50, 
    width: '95%', 
    backgroundColor: 'white', 
    marginVertical: 10, 
    fontSize: 20, 
    paddingLeft: 20,
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