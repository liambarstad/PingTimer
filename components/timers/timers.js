import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import RowList from '../meta/row-list'
import Timer from './timer'
import timerStyles from '../../styles/timer-styles'
const TimerModel = require('../../models/timer-model')
const SettingsModel = require('../../models/settings-model')
const Dimensions = require('Dimensions')

export default class Timers extends Component {
  constructor(props) {
    super(props)
    this.notificationScheduler = this.props.notificationScheduler
    this.state = {
      ...this.state,
      timers: [],
      interval: this.props.interval || '15',
      timersStyle: timerStyles.timersVertical,
    }
  }

  async componentDidMount() {
    let rawTimers = await TimerModel.getAll()
    let timers = Array.from(rawTimers)
    this.setState({ timers })
  } 

  componentWillReceiveProps(nextProps) {
    if (nextProps.interval) {
      this.setState({ interval: nextProps.interval })
    }
  }

  async addTimer() {
    let newTimer = await TimerModel.create(this._blankTimer())
    this.setState({ timers: [...this.state.timers, newTimer ]})
  }

  destroyTimer(id, ind) {
    let timers = this.state.timers
    timers.splice(ind, 1)
    this.setState({ timers })
    this.notificationScheduler.removeTimer(id)
    TimerModel.destroy(id)
  }

  formatTimer(timer, index) {
    return (
      <Timer 
        key={timer.id.toString()}
        id={timer.id}
        name={timer.name}
        active={timer.active}
        time={{time: timer.time}}
        defaulted={timer.defaulted}
        index={index.toString()}
        width={this.state.width / this.state.visibleNumber}
        notificationScheduler={this.notificationScheduler}
        onDestroy={this.destroyTimer.bind(this)}
      />
    )
  }

  render() {
    return (
      <ScrollView 
        style={this.state.timersStyle}
      >
        <RowList
          onFormat={this.formatTimer.bind(this)}
          height={this.props.height}
          width={this.props.width}
          targetWidth={this.props.targetWidth}
        >
          { this.state.timers }
        </RowList>
      </ScrollView>
    )
  }

  _blankTimer() {
    return {
      id: (new Date()).getTime(),
      active: false,
      name: 'New Timer',
      time: new Date(0,0,0,0,0,0),
      defaulted: true,
      defaultPing: this.notificationScheduler.interval,
    }
  }

}
