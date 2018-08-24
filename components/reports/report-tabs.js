import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'

export default class Reports extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: '12%',
          backgroundColor: 'blue',
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}
        >
          <Text>Buckets</Text> 
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: 'red',
          }}
        >
          <Text>Daily</Text> 
        </View>
      </View>
    )
  }
}
