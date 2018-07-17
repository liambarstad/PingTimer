import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import RowList from '../shared/row-list'
import PingSelection from '../selection-items/ping-selection'
const PingModel = require('../../models/ping-model')
import modalStyles from '../../styles/modal-styles'

export default class PingsSelection extends Component {
  constructor(props) {
    super(props)
    this.height = this.props.height || '100%'
    this.onSelect = this.props.onSelect
    this.state = {
      pings: [],
      alreadySelected: this.props.alreadySelected || [],
    }
  }

  async componentDidMount() {
    let pings = await PingModel.getAll()
    this.setState({ pings })
  }

  formatPing(ping, index, length) {
    return (
      <PingSelection
        key={ping.id.toString()}
        id={ping.id}
        length={length}
        value={ping.value}
        selected={this.checkIfSelected(ping.id)}
        onPress={this.onSelect.bind(this)}
      />
    )
  }

  render() {
    return (
      <View style={{height:this.height}}>
        <Text
          style={[
            modalStyles.title,
            modalStyles.lightText,
          ]}
        >Select Pings:</Text>
        <ScrollView>
          <RowList
            onFormat={this.formatPing.bind(this)}
            targetWidth='85'
          >
            { this.state.pings }
          </RowList>
        </ScrollView>
      </View>
    )
  }

}
