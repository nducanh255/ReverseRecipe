import React, { useState} from 'react'
import { View, Text, Touchable } from 'react-native'
import Avatar from '../Avatar'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Comment({init_comment, likeComment}) {
  const [comment, setComment] = useState(init_comment)
  const [isLike, setLike] = useState(comment['isLike'])

  return (
    <View style={{width: '100%', flexDirection: 'row', borderBottomColor: 'crimson', borderBottomWidth: 1.5, paddingRight: 10}}>
      <View style={{padding: 10}}>
        <Avatar
          avatar_url={comment['avatar_id']}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>
          <Text style={{color: 'black', fontSize: 18}}>{comment['username']}</Text>
          <View style={{height: 4, width: 4, borderRadius: 4, backgroundColor: '#555', marginHorizontal: 5}}></View>
          <Text style={{color: 'black', fontSize: 18}}>{comment['created']}</Text>
        </View>
        <View>
          <Text style={{color: 'black', fontSize: 18}}>{comment['text']}</Text>
        </View>
        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <TouchableOpacity
            onPress={() => {
              comment['is_like'] ?
              setComment({...comment, is_like: false, num_likes: comment['num_likes'] - 1}) :
              setComment({...comment, is_like: true, num_likes: comment['num_likes'] + 1})
              likeComment(comment['comment_id'])
            }}
          >
            <AntDesign name={comment['is_like'] ? 'heart' : 'hearto'} size={25} color="crimson" />
          </TouchableOpacity>
          <Text style={{fontSize: 15, color: 'black', paddingHorizontal: 5}}>{comment['num_likes']}</Text>
        </View>
      </View>
    </View>
  )
}