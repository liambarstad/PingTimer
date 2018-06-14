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
    this.setNotification({ date: nextPing })
  }

  addTimer(timer) {
    if (timer.defaulted) {
      this.activeDefaultTimers[timer.id] = { name: timer.name }
      this.setNotification()
    } else {
      // set custom notification
    }
  }

  removeTimer(id) {
    if (this.activeDefaultTimers[id]) {
      delete this.activeDefaultTimers[id] 
      this.setNotification()
    }
  }

  async toggleDefault(id, currentlyActive) {
    if (currentlyActive) {
      let result = await TimerModel.turnOffDefault(id)
      // some notification shit 
    } else {
      let result = await TimerModel.turnOnDefault(id, this.interval)
      // db - turn on defaulted + set set defaultPing
      // some notification shit
    }
  }

  async toggleCustom(id, currentlyActive, value) {
    if (currentlyActive) {
      let result = await TimerModel.removeCustom(id, value)
      // db - remove value from custom pings
      // get and remove notification
    } else {
      let result = await TimerModel.addCustom(id, value)
      // db - add value to custom pings
      // set custom notification
    }
  }

  setNotification(details={}) {
    //PushNotification.cancelAllLocalNotifications()
    // ^ delete default notification
    let date = details.date || this._nextPingDate()
    if (Object.keys(this.activeDefaultTimers).length > 0 && date !== 'NA') {
      PushNotification.localNotificationSchedule({
        title: `You have ${this.activeDefaultTimers.length} active timers, are you still working?`, 
        message: this._presentTimers(),
        date,
        soundName: 'default',
        userInfo: { timers: this.activeDefaultTimers },
      })
    }
  }

  _nextPingDate() {
    if (this.interval !== 'NA') {
      let utc_min = Date.now() / 60000
      let last_interval = utc_min - (utc_min % parseInt(this.interval)) 
      let date_next = new Date(0)
      date_next.setUTCMinutes(last_interval + parseInt(this.interval))
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
