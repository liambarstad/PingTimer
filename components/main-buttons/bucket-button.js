import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Image } from 'react-native'
import mainStyles from '../../styles/main-styles'

export default class BucketButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: this.props.active
    }
  }

  bucketStyle() {
    if (this.state.active) {
      return mainStyles.bucketActive
    } else {
      return mainStyles.bucketInactive
    }
  }

  toggleBucketStyle() {
    let active = !this.state.active
    this.setState({ active })
    this.props.onPress()
  }

  icon() {
    if (this.state.active) {
      return (
        <Image
          style={mainStyles.icon}
          source={require('../../assets/timer.png')}
        />
      )
    } else {
      return (
        <Image
          style={mainStyles.icon}
          source={require('../../assets/bucket.png')}
        />
      )
    }
  }

  render() {
    return (
      <TouchableHighlight
        style={this.bucketStyle()}
        onPress={this.toggleBucketStyle.bind(this)}
      >
        { this.icon() }
      </TouchableHighlight>
    )
  }

}
