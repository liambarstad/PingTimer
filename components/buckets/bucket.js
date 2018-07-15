import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import bucketStyles from '../../styles/bucket-styles'

export default class Bucket extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      options: false,
    }
  }
 
  toggleOptions() {

  }

  deleteBucket() {
    this.setState({ options: false })
    this.props.onDestroy(this.id, parseInt(this.props.index))
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress(this.id)} 
        onLongPress={this.toggleOptions.bind(this)} 
        style={[
          {width: this.props.width},
          bucketStyles.bucket,
        ]}
      >
        <View style={bucketStyles.nameBox}>
          <Text style={bucketStyles.name}>
            { this.state.name }
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

}
