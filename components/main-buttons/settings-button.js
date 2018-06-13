import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Image, Animated } from 'react-native'
import mainStyles from '../../styles/main-styles'

export default class SettingsButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
    }
  }

  modal() {
    /*return (
      <Animated.View
        style={{
          display: this._calculateDisplay(this.state.active),
          transform: [{ translateY:  
          position: 'absolute',
        }}
      >
        <Text>insert goodies here</Text>
      </Animated.View>
    )*/
  }

  fadeIn() {

  }

  fadeOut() {

  }

  render() {
    return (
      <TouchableHighlight
        onPress={() => this.setState({active:true})}
      >
        <View>
          { this.modal() }
          <Image
            style={mainStyles.icon}
            source={require('../../assets/settings.png')}
          />
        </View>
      </TouchableHighlight>
    )
  }

  _calculateDisplay(bool) {
    /*bool ?
      return 'none':
      return 'block'*/
  }

  _calculateYTop() {
    let val = new Animated.Value(-70)
    // 30% of overall height
  }

}
