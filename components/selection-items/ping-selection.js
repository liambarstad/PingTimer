import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import selectionStyles from '../../styles/selection-styles'

export default class PingSelection extends Component {
  constructor(props) {
    super(props)
    this.id = this.props.id
    this.value = this.props.value
    this.length = this.props.length
    this.onPress = this.props.onPress
    this.state = {
      selected: this.props.selected || false,
      defaulted: this.props.defaulted || false,
    }
  }

  toggleSelected() {

  }

  getBorder() {

  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.toggleSelected.bind(this)}
        style={[
          {width:this.length,height:this.length},
          selectionStyles.pingSelection,
          this.getBorder(),
        ]}
      >
        <Text
          style={selectionStyles.title}
        >
          { this.value } 
        </Text>
      </TouchableHighlight>
    )
  }
}
