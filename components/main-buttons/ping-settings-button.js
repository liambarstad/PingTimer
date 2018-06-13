import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Image, Picker, Button } from 'react-native'
import Modal from 'react-native-modal'
import mainStyles from '../../styles/main-styles'
import modalStyles from '../../styles/modal-styles'
const Settings = require('../../models/settings-model')

export default class PingSettingsButton extends Component {
  constructor(props) {
    super(props)
    this.notificationScheduler = this.props.notificationScheduler
    this.state = {
      interval: this.props.interval,
      editing: false,
    }
  }

  nextPing() {
    if (this.state.interval == 'NA') {
      return 'not scheduled'
    }
    let date_next = this.getNextPingDate()
    let timeOfDay = 'AM'
    if (date_next.getHours() >= 12) { timeOfDay = 'PM' }
    let minutes = date_next.getMinutes().toString()
    if (minutes.length == 1) { minutes += '0' }
    return `at ${date_next.getHours() % 12}:${minutes}${timeOfDay}`
  }

  getNextPingDate(interval=this.state.interval) {
    let utc_min = Date.now() / 60000
    let last_interval = utc_min - (utc_min % parseInt(interval)) 
    let date_next = new Date(0)
    date_next.setUTCMinutes(last_interval + parseInt(interval))
    return date_next
  }
  
  changeValue(interval) {
    this.setState({ interval })
  }

  async setInterval() {
    let nextPing = this.getNextPingDate()
    this.notificationScheduler.changeInterval(this.state.interval, nextPing)
    await this.props.onChange(this.state.interval)
    this.setState({editing:false})
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
        <View style={modalStyles.body}>
          <Text style={[modalStyles.darkText, modalStyles.title]}>
            {`Next ping ${this.nextPing()}`}
          </Text>

          <Picker
            selectedValue={this.state.interval} 
            onValueChange={(interval, ind) => this.changeValue(interval)}
          >
            <Picker.Item label='None' value='NA' />
            <Picker.Item label='5 min' value='5' />
            <Picker.Item label='10 min' value='10' />
            <Picker.Item label='15 min' value='15' />
            <Picker.Item label='20 min' value='20' />
            <Picker.Item label='30 min' value='30' />
            <Picker.Item label='45 min' value='45' />
            <Picker.Item label='1 hr' value='60' />
            <Picker.Item label='2 hrs' value='120' />
            <Picker.Item label='5 hrs' value='300' />
            <Picker.Item label='10 hrs' value='600' />
          </Picker>
        </View>
        
        <TouchableHighlight
          style={modalStyles.returnButton}
          onPress={this.setInterval.bind(this)}
        >
          <Text style={[modalStyles.lightText, modalStyles.title]}>Set Interval</Text>
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
}
