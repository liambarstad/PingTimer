import { PushNotificationIOS } from 'react-native'
const PushNotification = require('react-native-push-notification')
const TimerModel = require('../models/timer-model')

export default class NotificationScheduler {
  constructor(params={}) {
    this.interval = params.interval 
    this.activeDefaultTimers = {}
    this._requestNotificationPermissions()
    this._configurePush()
    this._getActiveDefaultTimers()
  }

  setInterval(interval) {
    if (!this.interval) {
      this.interval = interval
    }
  }

  changeInterval(interval, nextPing) {
    if (interval == this.interval) { return null }
    this.interval = interval
    this.setDefaultNotification({ date: nextPing })
    TimerModel.changeDefault(interval)
  }

  addTimer(timer) {
    alert(timer.defaulted)
    if (timer.defaulted) { this.addToDefaultNotification(timer.id, timer.name) }
    this.addCustomNotifications(timer.id)
  }

  removeTimer(id) {
    if (this.activeDefaultTimers[id]) { this.removeFromDefaultNotification(id) }
    this.removeCustomNotifications(id)
  }

  addCustomNotification(id, value, timerName) {
    this.removeCustomNotification(id, value)
    let date = this._nextPingDate(value)
    PushNotification.localNotificationSchedule({
      title: `${timerName} active`,
      message: 'are you still working?',
      date,
      soundName: 'default',
      userInfo: { id, value },
    })
  }

  removeCustomNotification(id, value) {
    PushNotification.cancelLocalNotifications({ id, value })
  }

  async addCustomNotifications(id) {
    let timer = await TimerModel.get(id)
    timer.customPings.forEach((value) => {
      this.addCustomNotification(id, value, timer.name)
    })
  }

  removeCustomNotifications(id) {
    PushNotification.cancelLocalNotifications({ id })
  }

  addToDefaultNotification(id, name) {
    this.activeDefaultTimers[id] = { name }
    this.setDefaultNotification()
  }

  removeFromDefaultNotification(id) {
    delete this.activeDefaultTimers[id]
    this.setDefaultNotification()
  }

  async toggleDefault(id, timerName, currentlyOn, currentlyActive) {
    if (currentlyOn) {
      let result = await TimerModel.turnOffDefault(id)
      if (currentlyActive) { this.removeFromDefaultNotification(id) }
    } else {
      if (currentlyActive) { this.addToDefaultNotification(id, timerName) }
    }
  }

  async toggleCustom(id, timerName, value, currentlyOn, currentlyActive) {
    if (currentlyOn) {
      let result = await TimerModel.removeCustom(id, value)
      if (currentlyActive) { this.removeCustomNotification(id, value) }
    } else {
      let result = await TimerModel.addCustom(id, value)
      if (currentlyActive) { this.addCustomNotification(id, value, timerName) }
    }
  }

  setDefaultNotification(details={}) {
    PushNotification.cancelLocalNotifications({ name: 'defaultNotification' })
    let date = details.date || this._nextPingDate()
    if (Object.keys(this.activeDefaultTimers).length > 0 && date !== 'NA') {
      PushNotification.localNotificationSchedule({
        title: `You have ${this.activeDefaultTimers.length} active timers, are you still working?`, 
        message: this._presentTimers(),
        date,
        soundName: 'default',
        userInfo: { name: 'defaultNotification' },
      })
    }
  }

  _nextPingDate(interval=this.interval) {
    if (interval !== 'NA') {
      let utc_min = Date.now() / 60000
      let last_interval = utc_min - (utc_min % parseInt(interval)) 
      let date_next = new Date(0)
      date_next.setUTCMinutes(last_interval + parseInt(interval))
      return date_next
    } else {
      return this.interval
    }
  }

  _presentTimers() {
    let message = 'Active Timers:\n'
    for (let timerId in this.activeDefaultTimers) {
      message += `- ${this.activeDefaultTimers[timerId].name}\n`
    }
    return message
  }

  _requestNotificationPermissions() {
    PushNotification.checkPermissions(({ nalert, badge, sound }) => {
      if (!nalert || !badge || !sound) {
        PushNotification.requestPermissions()
      }
    })
  }

  _configurePush() {
    PushNotification.configure({
      onNotification: (notification) => {
        console.log('NOTIFICATION:', notification)
        //direct to timer show page?
        notification.finish(PushNotificationIOS.FetchResult.NoData)
      },
      popInitialNotification: false,
      requestPermissions: false,
    })
  }

  _getActiveDefaultTimers() {
    TimerModel.getActiveDefaultTimers()
      .then(data => {
        data.forEach(timer => {
          this.activeDefaultTimers[timer.id] = { name: timer.name } 
        })
      })
  }

}
