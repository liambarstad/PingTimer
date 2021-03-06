import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import BucketForm from './bucket-form'
import bucketStyles from '../../styles/bucket-styles'

export default class Bucket extends Component {
  constructor(props) {
    super(props)
    this.notificationScheduler = this.props.notificationScheduler
    this.id = this.props.id
    this.index = this.props.index
    this.width = this.props.width
    this.onPress = this.props.onPress
    this.onDestroy = this.props.onDestroy
    this.state = {
      name: this.props.name,
      options: false,
    }
  }
 
  toggleOptions() {
    let options = !this.state.options
    this.setState({ options })
  }

  deleteBucket() {
    this.setState({ options: false })
    this.props.onDestroy(this.id, parseInt(this.props.index))
  }

  changeName(name) {
    this.setState({ name })
  }

  options() {
    return (
      <BucketForm
        notificationScheduler={this.notificationScheduler}
        id={this.id}
        editing={this.state.options} 
        name={this.state.name}
        onChangeName={this.changeName.bind(this)}
        onDestroy={this.deleteBucket.bind(this)}
      />
    )
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.toggleOptions.bind(this)} 
        style={[
          {width: this.props.width},
          bucketStyles.bucket,
        ]}
      >
        { this.options() }
        <View style={bucketStyles.nameBox}>
          <Text style={bucketStyles.name}>
            { this.state.name }
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

}
