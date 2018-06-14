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
    this.timerName = this.props.timerName
    this.notificationScheduler = this.props.notificationScheduler
    this.state = {
      pings: [],
      activeIntervals: [],
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
      this.timerName = this.props.timerName
    }
  }

  toggleOption(details) {
    if (details.defaultPing) {
      this.toggleDefaultOption(details.active)
    } else {
      this.toggleCustomOption(details.value)
    }
  }

  toggleDefaultOption(active) {
    if (active) { 
      //this.notificationScheduler.removeTimer(this.id)
    } else {
      //this.notificationScheduler.addTimer(this.timerName)
    }
  }

  toggleCustomOption(value) {
    
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
        active={this._isActive(value)}
        onToggle={this.toggleOption.bind(this)}
      />
    )
  }

  _isDefaultPing(value) {
    return Boolean(this.notificationScheduler.interval == value)
  }

  _isActive(value) {
    return Boolean(this.state.activeIntervals.includes(value))
  }

}
