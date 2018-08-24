import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Modal, Image } from 'react-native'
import Reports from '../reports/reports'
import mainStyles from '../../styles/main-styles'

export default class ReportsButton extends Component {
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
        <Reports 
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
            source={require('../../assets/list.png')}
          />
        </View>
      </TouchableHighlight>
    )
  }
}
