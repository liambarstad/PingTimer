import React, { AppState } from 'react-native'
const TimerModel = require('../models/timer-model')

export default class TimerObject {
  constructor(params={}) {
    this.active = params.active || false
    this.seconds = params.seconds || 0
    this.timerName = params.timerName || 'NewTimer'
    this.startTime = null
    this.stopTime = null
    this.notificationScheduler = params.notificationScheduler
  }

  start() {
    this.startTime = this.startTime || Date.now() 
  }

  async stop(id) {
    this.stopTime = Date.now()
    await TimerModel.addTime(id, this._difference())
    this.startTime = null
    this.stopTime = null
  }

  _difference() {
    let stopTime = this.stopTime || Date.now()
    return Math.abs(stopTime - this.startTime)
  }

}
