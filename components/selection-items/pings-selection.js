import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import RowList from '../shared/row-list'
import PingSelection from '../selection-items/ping-selection'
const PingModel = require('../../models/ping-model')
import modalStyles from '../../styles/modal-styles'

export default class PingsSelection extends Component {
  constructor(props) {
    super(props)
    this.notificationScheduler = this.props.notificationScheduler
    this.height = this.props.height || '100%'
    this.onSelect = this.props.onSelect
    this.singularSelection = this.props.singularSelection || false
    this.showTitle = this.props.showTitle || false
    this.state = {
      pings: [],
      alreadySelected: this.props.children,
    }
  }

  componentDidMount() {
    let pings = PingModel.getAll
    this.setState({ pings })
  }

  title() {
    if (this.showTitle) {
      return (
        <Text style={[modalStyles.lightText, modalStyles.title]}>
          Select Pings:
        </Text>
      )
    }
  }

  checkIfSelected(value) {
    return Boolean(this.state.alreadySelected.includes(value))
  }

  checkIfDefault(value) {
    return Boolean(this.notificationScheduler.interval == value)
  }

  togglePing(value) {
    if (this.onSelect) { this.onSelect(value) }
    if (this.singularSelection) {
      this.setState({ alreadySelected: value })
    }
  }

  formatPing(ping, index, length) {
    return (
      <PingSelection
        key={index}
        index={index}
        length={length}
        name={ping.name}
        value={ping.value}
        defaulted={this.checkIfDefault(ping.value)}
        selected={this.checkIfSelected(ping.value)}
        onPress={this.togglePing.bind(this)}
      />
    )
  }

  render() {
    return (
      <View style={{height:this.height}}>
        { this.title() }
        <ScrollView>
          <RowList
            onFormat={this.formatPing.bind(this)}
            targetWidth='100'
          >
            { this.state.pings }
          </RowList>
        </ScrollView>
      </View>
    )
  }

}
