import React, { Component } from 'react'
import { Text, View, TouchableHighlight, ScrollView } from 'react-native'
import ColorPicker from './color-picker'
import settingsStyles from '../../styles/settings-styles'

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.onReturn = this.props.onReturn
  }

  render() {
    return (
      <View style={settingsStyles.settingsBackground}>
        <Text style={[
          settingsStyles.title,
          {paddingTop: '5%'},
        ]}>
          Settings
        </Text>
        
        <View style={settingsStyles.mainView}>
          <ScrollView>
            <View style={settingsStyles.divider} />

            <ColorPicker />

            <View style={settingsStyles.divider} />
          </ScrollView>

          <TouchableHighlight
            style={settingsStyles.returnButton}
            onPress={this.onReturn} 
          >
            <Text style={settingsStyles.title}>
              Return
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
