import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Modal, Image, Animated } from 'react-native'
import Settings from '../settings/settings'
import mainStyles from '../../styles/main-styles'

export default class SettingsButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
    }
  }

  toggleActive() {
    let active = !this.state.active
    this.setState({ active })
  }

  modal() {
    return (
      <Modal
        animationType='slide'
        visible={this.state.active}
        onRequestClose={this.toggleActive.bind(this)}
      >
        <Settings
          onReturn={this.toggleActive.bind(this)}
        />
      </Modal>
    )
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.toggleActive.bind(this)}
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

}
