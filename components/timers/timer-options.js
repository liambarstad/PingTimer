import React, { Component } from 'react'
import { Text, View, TouchableHighlight, TextInput } from 'react-native'
import Modal from 'react-native-modal'
import PingsSelection from '../selection-items/pings-selection'
//import CustomPings from './custom-pings'
import modalStyles from '../../styles/modal-styles'
const TimerModel = require('../../models/timer-model')

export default class TimerOptions extends Component {
  constructor(props) {
    super(props)
    this.id = this.props.id
    this.notificationScheduler = this.props.notificationScheduler
    this.state = {
      active: this.props.active,
      timerName: this.props.timerName,
      timerActive: this.props.timerActive,
      editingName: false,
      editingCustomPing: false,
      selectedPings: [],
    }
  }

  async componentDidMount() {
    let selectedPings = await TimerModel.getActiveIntervals(this.id)
    this.setState({ selectedPings })
  }

  componentWillReceiveProps(nextProps) {
    let active = !this.state.active
    if (nextProps.active && nextProps.active == active) {
      this.setState({ active })
    }
    if (nextProps.timerName) {
      this.setState({ timerName: nextProps.timerName })
    }
    if (nextProps.timerActive) {
      this.setState({ timerActive: nextProps.timerActive })
    }
  }

  toggle() {
    this.setState({ active: false })
    this.props.toggle()
  }

  toggleEditingName() {
    let editingName = !this.state.editingName
    this.setState({ editingName })
  }

  toggleEditingCustomPing() {
    let editingCustomPing = !this.state.editingCustomPing
    this.setState({ editingCustomPing })
  }

  submitName() {
    this.toggleEditingName()
    this.toggle()
    this.props.onEdit(this.state.timerName)
  }

  deleteTimer() {
    this.setState({ active: false })
    this.props.onDelete()
  }

  async togglePing(selected, defaulted, value='') {
    if (defaulted) {
      this.toggleDefaultPing(selected) 
    } else {
      this.toggleCustomPing(selected, value)
    }
  }

  async toggleDefaultPing(selected) {
    if (selected) {
      let result = await TimerModel.turnOffDefault(this.id)
    } else {
      let result = await TimerModel.turnOnDefault(this.id)
    }
  }

  async toggleCustomPing(selected, value) {
    if (selected) {
      let result = await TimerModel.removeCustom(this.id, value)
    } else {
      let result = await TimerModel.addCustom(this.id, value)
    }
  }

  editNameModal() {
    return (
      <Modal
        isVisible={this.state.editingName}
        onBackdropPress={this.toggleEditingName.bind(this)}
        style={modalStyles.center}
        animationIn='fadeIn'
        animationOut='fadeOut'
      >
        <View style={[
          modalStyles.body,
          { height: '10%'},
        ]}>
          <TextInput
            style={[
              modalStyles.title,
              modalStyles.darkText,
            ]}
            onChangeText={(timerName) => this.setState({ timerName })}
            onEndEditing={this.submitName.bind(this)}
            value={this.state.timerName}
          />
        </View>
      </Modal>
    )
  }

  customPingModal() {
    return (
      <Modal
        isVisible={this.state.editingCustomPing}
        onBackdropPress={this.toggleEditingCustomPing.bind(this)}
        style={modalStyles.center}
        animationIn='fadeIn'
        animationOut='fadeOut'
      >
        <Text style={[modalStyles.lightText, modalStyles.title]}>
          Select Pings For This Timer: 
        </Text>

        <PingsSelection
          notificationScheduler={this.notificationScheduler}
          height='70%'
          onSelect={this.togglePing.bind(this)}
        >
          { this.state.selectedPings }
        </PingsSelection>

        <TouchableHighlight
          style={modalStyles.returnButton}
          onPress={this.toggleEditingCustomPing.bind(this)}
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
      <Modal
        isVisible={this.state.active}
        onBackdropPress={this.toggle.bind(this)}
        style={modalStyles.center}
        animationIn='fadeIn'
        animationOut='fadeOut'
      >
        { this.editNameModal() }
        { this.customPingModal() }
        <TouchableHighlight
          style={modalStyles.returnButton}
          onPress={this.toggleEditingName.bind(this)}
        >
          <Text style={[modalStyles.lightText, modalStyles.title]}>
            Edit Name
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={modalStyles.returnButton}
          onPress={this.toggleEditingCustomPing.bind(this)}
        >
          <Text style={[modalStyles.lightText, modalStyles.title]}>
            Set Custom Pings
          </Text>
        </TouchableHighlight>
        
        <TouchableHighlight
          style={modalStyles.redButton}
          onPress={this.deleteTimer.bind(this)}
        >
          <Text style={[modalStyles.lightText, modalStyles.title]}>
            Delete
          </Text>
        </TouchableHighlight>
      </Modal>
    )
  }
}
