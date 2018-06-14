import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import Modal from 'react-native-modal'
import TimerOptions from './timer-options'
import timerStyles from '../../styles/timer-styles'
import { timeToStr } from '../../helpers/timer-helper'
import TimerObject from '../../objects/timer'
const TimerModel = require('../../models/timer-model')

export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.notificationScheduler = this.props.notificationScheduler
    this.id = this.props.id
    this.state = {
      active: this.props.active,
      time: this.props.time.time,
      name: this.props.name || 'New Alarm',
      defaulted: this.props.defaulted,
      timer: new TimerObject({ 
        active: this.props.active,
        timerName: this.props.name, 
      }),
      timerTask: null,
      options: false,
    }
  }

  async componentDidMount() {
    if (this.state.active) {
      let timeSinceLastLog = await TimerModel.timeSince(id)
      this.addTime(timeSinceLastLog)
      this.startTiming()
    }
  }

  async toggleActive() {
    let active = !this.state.active
    this.setState({ active })
    if (active) {
      this.startTiming()
    } else {
      this.stopTiming()
    }
    TimerModel.toggleActive(this.props.id, this.state.active)
  }

  toggleOptions() {
    let options = !this.state.options
    this.setState({ options })
  }

  async addSecond() {
    this.setState({ time: new Date(this.state.time.getTime() + 1000) })
  }

  addTime(time) {

  }

  deleteTimer() {
    this.setState({ options: false })
    this.props.onDestroy(this.id, parseInt(this.props.index))
  }

  startTiming() {
    this.state.timer.start()
    this.setState({ timerTask: setInterval(this.addSecond.bind(this), 1000)})
    this.notificationScheduler.addTimer({
      id: this.id,
      name: this.state.name,
      defaulted: this.state.defaulted,
    })
  }

  async stopTiming() {
    await this.state.timer.stop(this.id)
    clearInterval(this.state.timerTask) 
    this.notificationScheduler.removeTimer(this.id)
  }

  async submitName(name=this.state.name) {
    await TimerModel.update(this.id, 'name', name)
    this.setState({ name })
  }

  render() {
    return (
      <TouchableOpacity 
        onPress={() => this.toggleActive()}
        onLongPress={() => this.toggleOptions()}
        style={[
          {width: this.props.width},
          timerStyles.timer
        ]}>
      >
        <TimerOptions
          id={this.id}
          active={this.state.options}
          timerName={this.state.name}
          toggle={this.toggleOptions.bind(this)}
          onEdit={this.submitName.bind(this)}
          onDelete={this.deleteTimer.bind(this)}
          notificationScheduler={this.notificationScheduler}
        />

        <View style={timerStyles.nameBox}>
          <Text style={timerStyles.name}>
            { this.state.name }
          </Text>
        </View>

        <View style={timerStyles.time}>
          <Text style={timerStyles.timeText}>
            { timeToStr(this.state.time) }
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
