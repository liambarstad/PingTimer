import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Image } from 'react-native'
import modalStyles from '../../styles/modal-styles'

export default class CustomPing extends Component {
  constructor(props) {
    super(props)
    this.label = this.props.label
    this.value = this.props.value
    this.defaultPing = this.props.defaultPing || false
    this.state = {
      active: this.props.active,
    }
  }

  toggleActive() {
    let active = !this.state.active
    this.setState({ active })
    this.props.onToggle({
      defaultPing: this.defaultPing,
      active: this.state.active,
      value: this.value,
    })
  }

  render() {
    return (
      <TouchableHighlight
        style={this._listOptionStyle()}
        onPress={this.toggleActive.bind(this)}
      >
        <Text
          style={this._listOptionTextStyle()} 
        >
          { this._presentLabel() }
        </Text>
      </TouchableHighlight>
    )
  }

  _presentLabel() {
    let defaultPing = ''
    if (this.defaultPing) { defaultPing = ' (default)' }
    return `${this.label}${defaultPing}`
  }

  _listOptionStyle() {
    if (this.state.active) {
      return modalStyles.listOptionActive
    } else {
      return modalStyles.listOptionInactive
    }
  }

  _listOptionTextStyle() {
    if (this.state.active) {
      return modalStyles.listOptionTextActive
    } else {
      return modalStyles.listOptionTextInactive
    }
  }

}
