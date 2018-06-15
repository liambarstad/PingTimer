import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableHighlight } from 'react-native'
import modalStyles from '../../styles/modal-styles'
import CustomPing from './custom-ping'
const TimerModel = require('../../models/timer-model')
const Settings = require('../../models/settings-model')

export default class CustomPings extends Component {
  constructor(props) {
    super(props)
    this.id = this.props.id
    this.notificationScheduler = this.props.notificationScheduler
    this.state = {
      pings: [],
      activeIntervals: [],
      timerName: this.props.timerName,
      timerActive: this.props.timerActive,
    }
  }

  async componentDidMount() {
    let activeIntervals = await TimerModel.getActiveIntervals(this.id)
    this.setState({ activeIntervals })
    let pings = this._customPings()
    this.setState({ pings })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.timerName) { 
      this.setState({ timerName: nextProps.timerName }) 
    } 
    if (nextProps.timerActive) { 
      this.setState({ timerActive: nextProps.timerActive })
    }
  }

  toggleOption(details) {
    if (details.defaultPing) {
      this.toggleDefault(details.currentlyOn)
    } else {
      this.toggleCustom(details.value, details.currentlyOn)
    }
  }

  toggleDefault(currentlyOn) {
    this.notificationScheduler.toggleDefault(
      this.id, 
      this.state.timerName, 
      currentlyOn, 
      this.state.timerActive
    )
  }

  toggleCustom(value, currentlyOn) {
    this.notificationScheduler.toggleCustom(
      this.id, 
      this.state.timerName, 
      value, 
      currentlyOn, 
      this.state.timerActive
    )
  }

  render() {
    return (
      <ScrollView
        style={modalStyles.optionList} 
      >
        { this.state.pings }
      </ScrollView>
    )
  }

  _customPings() {
    let possible = Settings.possiblePingIntervals
    let customPings = []
    for (let label in possible) {
      customPings.push(
        this._formatPing(label, possible[label])
      )
    }
    return customPings
  }

  _formatPing(label, value) {
    return (
      <CustomPing
        label={label}
        value={value}
        defaultPing={this._isDefaultPing(value)} 
        currentlyOn={this._isCurrentlyOn(value)}
        onToggle={this.toggleOption.bind(this)}
      />
    )
  }

  _isDefaultPing(value) {
    return Boolean(this.notificationScheduler.interval == value)
  }

  _isCurrentlyOn(value) {
    return Boolean(this.state.activeIntervals.includes(value))
  }

}
