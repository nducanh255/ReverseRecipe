import React, { useState } from 'react'
import { View, Text, FlatList } from 'react-native'

export default function Ingredients(props) {
  const [numColumns, setNumColumns] = useState(2)

  return(
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'crimson', fontSize: 20, paddingVertical: 5}}>Nguyên liệu</Text>
      <FlatList 
        data={props.ingredients}
        renderItem={({item}) => (
          <View style={{width: '50%', flexDirection: 'row', alignItems: 'center'}}>
            <View style={{height: 5, width: 5, borderRadius: 5, backgroundColor: 'crimson', marginLeft: 15, marginRight: 5}}></View>
            <Text style={{color: 'black', fontSize: 18}}>{item}</Text>
          </View>
        )}
        numColumns={numColumns}
      />
    </View>
  )
}