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

  componentWillReceiveProps(nextProps) {
    if (nextProps.active) { 
      this.setState({ active: nextProps.active })
    }
  }

  bucketStyle() {
    if (this.state.active) {
      return mainStyles.bucketActive
    } else {
      return mainStyles.bucketInactive
    }
  }

  render() {
    return (
      <TouchableHighlight
        style={this.bucketStyle()}
        onPress={this.props.onPress.bind(this)}
      >
        <Image
          style={mainStyles.icon}
          source={require('../../assets/bucket.png')}
        />
      </TouchableHighlight>
    )
  }

}
