import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import Color from './color'
import settingsStyles from '../../styles/settings-styles'
import Colors from '../../styles/colors'

export default class ColorPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
    }
  }

  toggleEditing() {
    let editing = !this.state.editing
    this.setState({ editing })
  }

  isSelected(color) {
    return Boolean(Colors.selected === color)
  }

  colors() {
    if (this.state.editing) {
      return (
        <View 
          style={[
            settingsStyles.listItem,
            {flexDirection: 'row'}
          ]}
        >
          <Color 
            scheme='blue'
            selected={this.isSelected('blue')}
          />
          <Color 
            scheme='gold' 
            selected={this.isSelected('gold')}
          />
          <Color 
            scheme='green' 
            selected={this.isSelected('green')}
          />
          <Color 
            scheme='pink' 
            selected={this.isSelected('pink')}
          />
          <Color 
            scheme='autumn' 
            selected={this.isSelected('autumn')}
          />
          <Color 
            scheme='black' 
            selected={this.isSelected('black')}
          />
          <Color 
            scheme='metal' 
            selected={this.isSelected('metal')}
          />
          <Color 
            scheme='gamer' 
            selected={this.isSelected('gamer')}
          />
        </View>
      )
    }
  }

  getBackground() {
    if (this.state.editing) {
      return Colors.appSecondary
    } else {
      return Colors.appPrimary
    }
  }

  render() {
    return (
      <View
        style={[
          settingsStyles.listItem,
          {backgroundColor: this.getBackground()},
        ]} 
      >
        <TouchableHighlight
          onPress={this.toggleEditing.bind(this)}
        >
          <Text style={settingsStyles.listTitle}>
            Change Color Scheme
          </Text>
        </TouchableHighlight>
        { this.colors() }
      </View>
    )
  }
}
