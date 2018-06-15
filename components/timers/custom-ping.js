import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Image } from 'react-native'
import modalStyles from '../../styles/modal-styles'

export default class CustomPing extends Component {
  constructor(props) {
    super(props)
    this.label = this.props.label
    this.value = this.props.value
    this.state = {
      currentlyOn: this.props.currentlyOn,
      defaultPing: this.props.defaultPing || false
    }
  }

  toggleActive() {
    let currentlyOn = !this.state.currentlyOn
    this.props.onToggle({
      defaultPing: this.state.defaultPing,
      currentlyOn: this.state.currentlyOn,
      value: this.value,
    })
    this.setState({ currentlyOn })
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
    if (this.state.defaultPing) { defaultPing = ' (default)' }
    return `${this.label}${defaultPing}`
  }

  _listOptionStyle() {
    if (this.state.currentlyOn) {
      return modalStyles.listOptionActive
    } else {
      return modalStyles.listOptionInactive
    }
  }

  _listOptionTextStyle() {
    if (this.state.currentlyOn) {
      return modalStyles.listOptionTextActive
    } else {
      return modalStyles.listOptionTextInactive
    }
  }

}
