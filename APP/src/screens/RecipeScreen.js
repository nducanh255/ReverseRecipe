import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ImageBackground, ActivityIndicator } from 'react-native'
import Avatar from '../components/Avatar'
import Comment from '../components/Recipe/Comment'
import Restaurant from '../components/Recipe/Restaurant'
import Info from '../components/Recipe/Info'
import Ingredients from '../components/Recipe/Ingredients'
import Instructions from '../components/Recipe/Instructions'
import storage from '@react-native-firebase/storage'
import { useSelector } from 'react-redux'

export default function RecipeScreen({ navigation, route }) {
  const { user } = useSelector(state => state.userReducer)
  const [focusedTab, setFocusedTab] = useState('recipe')
  const [recipe, setRecipe] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [userAvatar, setUserAvatar] = useState('')
  const [text, setText] = useState('')

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

  const processData = async (recipe) => {
    recipe['image_id'] = await getImage('recipe/' + recipe['image_id'])
    recipe['avatar_id'] = await getImage('avatar/' + recipe['avatar_id'] + '.jpg')
    let comments = []
    recipe['comments'].map(async comment => {
      let avatar_id = await getImage('avatar/' + comment['avatar_id'] + '.jpg')
      comments.push({ ...comment, 'avatar_id': avatar_id})
    })
    recipe['comments'] = comments
    setUserAvatar(await getImage('avatar/' + user['avatar_id'] + '.jpg'))
  }

  const createComment = async () => {
    await fetch('https://inverse-cooking-api.herokuapp.com/comment', {
      method: 'POST',
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain',
      },
      body: JSON.stringify({
        'user_id': user['user_id'], 
        'post_id': route.params.post_id,
        'text': text
      })
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log('error ', error))
    await fetchData()
  }

  const likeComment = (comment_id) => {
    fetch('https://inverse-cooking-api.herokuapp.com/like', {
      method: 'POST',
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'text/plain',
      },
      body: JSON.stringify({
        'user_id': user['user_id'], 
        'like_id': comment_id,
        'is_post': false
      })
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log('error ', error))
  }

  const fetchData = async () => {
    try {
      const response = await fetch('https://inverse-cooking-api.herokuapp.com/post/' + route.params.post_id + '/' + user['user_id'])
      let json = await response.json()
      await processData(json)
      setRecipe(json)
      setLoading(false)
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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
    <View style={{flex: 1}}>
      <View style={{width: '100%', height: 210, backgroundColor: 'green'}}>
        <ImageBackground 
          source={{uri: recipe['image_id']}}
          resizeMode={'cover'}
          style={{flex: 1, height: 210}}
        />
        <View style={styles.recipeTitleContainer}>
          <Text style={styles.recipeTitle}>{recipe['title']}</Text>
        </View>
        <View style={{flexDirection: 'column', alignSelf: 'flex-end', alignItems: 'center', marginBottom: 25}}>
          <View style={{padding: 10}}>
            <TouchableOpacity
              onPress={()=> { navigation.navigate('User', {'user_id': recipe['user_id']})}}
            >
              <Avatar
                avatar_url={recipe['avatar_id']}
              />
            </TouchableOpacity>
          </View>    
          <Info 
            type={focusedTab}
            is_like={route.params.is_like}
            numLike={recipe['num_likes']}
            numComment={recipe['num_comments']}
            numInstruction={recipe['num_ingredients']}
            numRestaurant={recipe['num_locations']}
          />     
        </View>
      </View>
      <View style={{width: '100%', flex: 1}}>
        {/* Recipe Header */}
        <View style={styles.recipeHeader}>
          <TouchableOpacity 
            style={[focusedTab == 'general' && styles.recipeHeaderFocusedTab, styles.recipeHeaderTab]}
            onPress={() => setFocusedTab('general')}
          >
            <Text style={[focusedTab == 'general' ? styles.recipeHeaderFocusedText : styles.recipeHeaderText]}>Tổng quan</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[focusedTab == 'recipe' && styles.recipeHeaderFocusedTab, styles.recipeHeaderTab]}
            onPress={() => {setFocusedTab('recipe')}}
          >
            <Text style={[focusedTab == 'recipe' ? styles.recipeHeaderFocusedText : styles.recipeHeaderText]}>Công thức</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[focusedTab == 'restaurants' && styles.recipeHeaderFocusedTab, styles.recipeHeaderTab]}
            onPress={() => {setFocusedTab('restaurants')}}
          >
            <Text style={[focusedTab == 'restaurants' ? styles.recipeHeaderFocusedText: styles.recipeHeaderText]}>Nhà hàng</Text>
          </TouchableOpacity>
        </View>
        {
          (focusedTab == 'general') &&
          <ScrollView style={{flex: 1}}>
            {/* Recipe Author */}
            
            <View style={{height: 100, width: '100%', flexDirection: 'row', borderBottomColor: 'crimson', borderBottomWidth: 1.5}}>
              <View style={{padding: 10}}>
                <Avatar avatar_url={userAvatar}/>
              </View>
              <View style={{flex: 1, paddingTop: 10}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{color: 'black', fontSize: 20}}>{user['username']}</Text>
                  <TouchableOpacity 
                    style={{backgroundColor: 'crimson', paddingHorizontal: 10, borderRadius: 20, paddingVertical: 5, marginRight: 20}}
                    onPress={async () => {
                      await createComment()
                      setText('')
                    }}
                  >
                    <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>Bình luận</Text>
                  </TouchableOpacity>
                </View>
                <TextInput 
                  style={{height: 50, width: '100%', fontSize: 20, paddingLeft: -10, paddingRight: 10}}
                  placeholder={'Bình luận công khai...'}
                  value={text}
                  onChangeText={(text) => setText(text)}
                  clearButtonMode='always'
                />
              </View>
            </View>
              {
                recipe['comments'] !== undefined &&
                recipe['comments'].map((comment) => (
                  <Comment 
                    key={comment['comment_id']}
                    init_comment={comment}
                    likeComment={likeComment}
                  />
                ))
              }
              
          </ScrollView>
        }
        {
          (focusedTab == 'recipe') &&
          <View style={{flex: 1}}>
            <Ingredients
              ingredients={recipe['ingredients']}
            />
            <Instructions 
              instructions={[recipe['instructions']]}
              navigation={navigation}
            />
          </View>
        }
        {
          (focusedTab == 'restaurants') &&
          <ScrollView style={{flex: 1}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {
                recipe['locations'] != undefined &&
                recipe['locations'].map(restaurant => {
                  return (
                    <Restaurant 
                      restaurant={restaurant}
                      key={restaurant['name']}
                      navigation={navigation}
                    />)
                })
              }
            </View>
          </ScrollView>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  recipeTitleContainer: {
    position: 'absolute',
    bottom: 10,
    paddingLeft: 10,
    flexWrap: 'wrap',
    width: '80%',
  },
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