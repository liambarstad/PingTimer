import React, { Component } from 'react'
import { View, TouchableHighlight, Image } from 'react-native'
import settingsStyles from '../../styles/settings-styles'
import Colors from '../../styles/colors'

export default class Color extends Component {
  constructor(props) {
    super(props)
    this.scheme = this.props.scheme
    this.state = {
      selected: this.props.selected,
    }
  }

  async selectColor() {
    
  }

  lookupColor() {
    return Colors.getPrimaryColor(this.scheme)
  }

  selection() {
    if (this.state.selected) {
      return (
        <Image
          style={{height:'100%',width:'100%',tintColor:'white'}}
          source={require('../../assets/checkbox.png')}
        />
      )
    }
  }

  render() {
    return (
      <TouchableHighlight 
        style={[
          settingsStyles.color,
          {backgroundColor: this.lookupColor()},
        ]}
        onPress={this.selectColor.bind(this)}
      >
        <View>
          { this.selection() }
        </View>
      </TouchableHighlight>
    )
  }
}
