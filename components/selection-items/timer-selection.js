import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import selectionStyles from '../../styles/selection-styles'

export default class TimerSelection extends Component {
  constructor(props) {
    super(props)
    this.id = this.props.id
    this.name = this.props.name
    this.length = this.props.length - 17
    this.onPress = this.props.onPress
    this.state = {
      selected: this.props.selected || false,
    }
  }

  toggleSelected() {
    let selected = !this.state.selected
    this.setState({ selected })
    this.onPress(this.id)
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.toggleSelected.bind(this)}
        style={[
          {width: this.length, height: this.length},
          selectionStyles.timerSelection,
          this.state.selected && selectionStyles.selected,
        ]}
      >
        <Text
          style={selectionStyles.title}
        >
          {this.name}
        </Text>
      </TouchableHighlight>
    )
  }

}
