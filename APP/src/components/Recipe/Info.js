import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function Info(props) {
  console.log(props.is_like)
  switch(props.type) {
    case 'general':
      return(
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <AntDesign name={props.is_like ? 'heart' : "hearto" }size={20} color="crimson" />
          </View>
          <Text style={styles.infoText}>{props.numLike}</Text>
          <View style={styles.iconContainer}>
            <AntDesign name="message1" size={20} color="crimson" />
          </View>
          <Text style={styles.infoText}>{props.numComment}</Text>
        </View>
      )
    case 'recipe':
      return(
        <View style={[styles.container, {marginBottom: 50}]}>
          <View style={styles.iconContainer}>
            <AntDesign name="profile" size={20} color="crimson" />
          </View>
          <Text style={styles.infoText}>{props.numInstruction}</Text>
        </View>
      )
    case 'restaurants':
      return(
        <View style={[styles.container, {marginBottom: 50}]}>
          <View style={styles.iconContainer}>
            <AntDesign name="enviromento" size={20} color="crimson" />
          </View>
          <Text style={styles.infoText}>{props.numRestaurant}</Text>
        </View>
      )
    default:
      return null
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'crimson', 
    paddingHorizontal: 5, 
    paddingTop: 5, 
    alignItems: 'center'
  },
  infoText: {
    fontSize: 15, 
    color: 'white', 
    paddingVertical: 5, 
  },
  iconContainer: {
    height: 32, 
    width: 32, 
    borderRadius: 32, 
    backgroundColor: 'white', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'white'
  }
})