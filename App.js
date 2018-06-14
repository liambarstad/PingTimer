import React, { Component } from 'react'
import mainStyles from './styles/main-styles'
import { Text, View, Image } from 'react-native'
import PingSettingsButton from './components/main-buttons/ping-settings-button'
import HelpButton from './components/main-buttons/help-button'
import TagsButton from './components/main-buttons/tags-button'
import SettingsButton from './components/main-buttons/settings-button'
import NewTimerButton from './components/main-buttons/new-timer-button'
import Timers from './components/timers/timers.js'
import NotificationScheduler from './objects/notification-scheduler'
const SettingsModel = require('./models/settings-model')
const TimerModel = require('./models/timer-model')
const Dimensions = require('Dimensions')

export default class App extends Component {
  constructor(props) {
    super(props)
    this.notificationScheduler = new NotificationScheduler()
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      innerPanelStyle: mainStyles.innerPanelVertical,
      interval: null,
    }
  }
  
  async componentDidMount() { 
    this._setStyles()
    this._setOrientationListener()
    const interval = await SettingsModel.getPingInterval()
    this.notificationScheduler.setInterval(interval)
    this.setState({ interval })
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', () => {
      this._setStyles()
    })
  }

  async changeInterval(interval) {
    this.setState({ interval })
    await SettingsModel.setPingInterval(interval)
  }

  render() {
    return (
      <View 
        style={mainStyles.app}
      >
        <Image
          source={require('./assets/background1.png')}
          style={mainStyles.backgroundImage}
        />

        <View style={mainStyles.panel}>
          <View style={[mainStyles.left, this.state.innerPanelStyle]}>
            <PingSettingsButton 
              interval={this.state.interval}
              onChange={this.changeInterval.bind(this)}
              notificationScheduler={this.notificationScheduler}
            />
          </View>

          <View style={[mainStyles.right, this.state.innerPanelStyle]}>
            <HelpButton />
          </View>
        </View>

        <Timers 
          ref='timers' 
          height={this.state.height}
          width={this.state.width}
          interval={this.state.interval}
          notificationScheduler={this.notificationScheduler}
        />

        <View style={mainStyles.panel}>
          <View style={[mainStyles.left, this.state.innerPanelStyle]}>
            <TagsButton />
            <SettingsButton />
          </View>

          <View style={[mainStyles.right, this.state.innerPanelStyle]}>
            <NewTimerButton 
              className='create-button'
              onPress={() => this.refs.timers.addTimer()}
            />
          </View>
        </View>

      </View>
    )
  }

  _setOrientationListener() {
    Dimensions.addEventListener('change', () => {
      this._swapOrientation()
      this._setStyles()
    })
  }

  _swapOrientation() {
    const height = this.state.width
    const width = this.state.height
    this.setState({ height, width })
  }

  _setStyles() {
    if (this.state.height > this.state.width) {
      this.setState({ innerPanelStyle: mainStyles.innerPanelVertical })
    } else {
      this.setState({ innerPanelStyle: mainStyles.innerPanelHorizontal })
    }
  }

}
