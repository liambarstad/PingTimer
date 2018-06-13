import { PushNotificationIOS } from 'react-native'
const PushNotification = require('react-native-push-notification')

export default class NotificationScheduler {
  constructor(params={}) {
    this.interval = params.interval 
    this.timers = {}
    this._requestNotificationPermissions()
    this._configurePush()
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
    this.timers[timer.id] = { name: timer.name }
    this.setNotification()
  }

  removeTimer(id) {
    if (this.timers[id]) {
      delete this.timers[id] 
      this.setNotification()
    }
  }

  setNotification(details={}) {
    PushNotification.cancelAllLocalNotifications()
    let date = details.date || this._nextPingDate()
    if (Object.keys(this.timers).length > 0 && date !== 'NA') {
      PushNotification.localNotificationSchedule({
        title: `You have ${this.timers.length} active timers, are you still working?`, 
        message: this._presentTimers(),
        date,
        soundName: 'default',
        userInfo: { timers: this.timers },
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
    for (let timerId in this.timers) {
      message += `- ${this.timers[timerId].name}\n`
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

}
