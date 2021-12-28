import React from "react"
import { View, Image, StyleSheet } from 'react-native'

export default function Avatar({ size, avatar_url }) {
  const default_avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkBvTVFjdQ1me6gQYpK5waENk2wPBQ_E_MyA&usqp=CAU'

  return (
    <Image 
      style={size ? styles.largeSizedAvatar : styles.mediumSizedAvatar}
      source={avatar_url !== undefined ? {uri: avatar_url} : {uri: default_avatar}}
    />
  )
}

const styles = StyleSheet.create({
  mediumSizedAvatar: {
    height: 50,
    width: 50,
    borderRadius: 50
  },
  largeSizedAvatar: {
    height: 65,
    width: 65,
    borderRadius: 65
  }
})