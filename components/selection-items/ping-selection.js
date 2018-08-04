import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import selectionStyles from '../../styles/selection-styles'

export default class PingSelection extends Component {
  constructor(props) {
    super(props)
    this.index = this.props.index
    this.name = this.props.name
    this.value = this.props.value
    this.length = this.props.length - 17
    this.onPress = this.props.onPress
    this.state = {
      selected: this.props.selected || false,
      defaulted: this.props.defaulted || false,
    }
  }

  toggleSelected() {
    let selected = !this.state.selected
    this.setState({ selected })
    this.onPress(this.value)
  }

  getBorder() {
    if (this.state.selected) {
      if (this.state.defaulted) {
        return selectionStyles.selectedDefault
      } else {
        return selectionStyles.selected
      }
    }
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.toggleSelected.bind(this)}
        style={[
          {
            width:this.length,
            height:this.length,
            padding: '3%',
          },
          selectionStyles.pingSelection,
          this.getBorder(),
        ]}
      >
        <Text
          style={selectionStyles.title}
        >
          { this.name } 
        </Text>
      </TouchableHighlight>
    )
  }
}
