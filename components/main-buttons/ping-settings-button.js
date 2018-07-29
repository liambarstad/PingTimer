import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Image, Picker, Button } from 'react-native'
import Modal from 'react-native-modal'
import PingsSelection from '../selection-items/pings-selection'
import mainStyles from '../../styles/main-styles'
import modalStyles from '../../styles/modal-styles'
const PingModel = require('../../models/ping-model')

export default class PingSettingsButton extends Component {
  constructor(props) {
    super(props)
    this.notificationScheduler = this.props.notificationScheduler
    this.state = {
      interval: this.props.interval,
      editing: false,
      possiblePings: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.interval) {
      this.setState({ interval: nextProps.interval })
    }
  }

  nextPing() {
    let exceptionMessage = this._getDateExceptions()
    if (exceptionMessage) {
      return exceptionMessage
    } else {
      let date_next = this.getNextPingDate()
      let timeOfDay = 'AM'
      if (date_next.getHours() >= 12) { timeOfDay = 'PM' }
      let minutes = date_next.getMinutes().toString()
      if (minutes.length == 1) { minutes += '0' }
      return `at ${date_next.getHours() % 12}:${minutes}${timeOfDay}`
    }
  }

  getNextPingDate(interval=this.state.interval) {
    let utc_min = Date.now() / 60000
    let last_interval = utc_min - (utc_min % parseInt(interval)) 
    let date_next = new Date(0)
    date_next.setUTCMinutes(last_interval + parseInt(interval))
    return date_next
  }
  
  async setInterval() {
    this.setState({editing:false})
  }

  async setNewDefault(interval) {
    let nextPing = this.getNextPingDate(interval)
    this.notificationScheduler.changeInterval(interval, nextPing)
    await this.props.onChange(interval)
    this.setState({ interval })
  }

  modal() {
    return (
      <Modal
        isVisible={this.state.editing}
        onBackdropPress={() => this.setState({editing:false})}
        style={modalStyles.top}
        animationIn='fadeIn'
        animationOut='fadeOut'
      >
        <Text style={[modalStyles.lightText, modalStyles.title]}>
          Set Default Ping
        </Text>

        <Text style={[modalStyles.lightText, modalStyles.title]}>
          {`Next Ping ${this.nextPing()}`}
        </Text>

        <PingsSelection
          notificationScheduler={this.notificationScheduler}
          height='60%'
          onSelect={this.setNewDefault.bind(this)}
          singluarSelection={true}
        >
          { this.state.interval }
        </PingsSelection>

        <TouchableHighlight
          style={modalStyles.returnButton}
          onPress={() => this.setState({editing:false})}
        >
          <Text style={[modalStyles.lightText, modalStyles.title]}>
            Return
          </Text>
        </TouchableHighlight>
      </Modal>
    )
  }

  render() {
    return (
      <TouchableHighlight
        onPress={() => this.setState({editing:true})} 
      >
        <View>
          { this.modal() }
          <Image
            style={mainStyles.icon}
            source={require('../../assets/exclamation.png')}
          />
        </View>
      </TouchableHighlight>
    )
  }

  _getDateExceptions() {
    if (this.state.interval == 'NA') {
      return 'Not Scheduled'
    } else if (this.state.interval == 'DAY') {
      return 'Tomorrow'
    } else if (this.state.interval == 'WEEK') {
      return 'Weekly'
    } else if (this.state.interval == 'MONTH') {
      return 'Monthly'
    } else {
      return null
    }
  }

}
