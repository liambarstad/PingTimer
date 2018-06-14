import React, { Component } from 'react'
import { Text, View, TouchableHighlight, TextInput } from 'react-native'
import Modal from 'react-native-modal'
import CustomPings from './custom-pings'
import modalStyles from '../../styles/modal-styles'

export default class TimerOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: this.props.active,
      timerName: this.props.timerName,
      editingName: false,
      editingCustomPing: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    let active = !this.state.active
    if (nextProps.active && nextProps.active == active) {
      this.setState({ active })
    }
  }

  toggle() {
    this.setState({ active: false })
    this.props.toggle()
  }

  toggleEditing() {
    let editingName = !this.state.editingName
    this.setState({ editingName })
  }

  toggleCustomPing() {
    let editingCustomPing = !this.state.editingCustomPing
    this.setState({ editingCustomPing })
  }

  submitName() {
    this.toggleEditing()
    this.props.onEdit(this.state.timerName)
  }

  submitCustomPings(pings) {

  }

  deleteTimer() {
    this.setState({ active: false })
    this.props.onDelete()
  }

  editNameModal() {
    return (
      <Modal
        isVisible={this.state.editingName}
        onBackdropPress={this.toggleEditing.bind(this)}
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
    <Modal
      isVisible={this.state.editingCustomPing}
      onBackdropPress={this.toggleCustomPing.bind(this)}
      style={modalStyles.top}
      animationIn='fadeIn'
      animationOut='fadeOut'
    >
      <CustomPings
        onSubmit={this.submitCustomPings.bind(this)}
      />
    </Modal>
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
          onPress={this.toggleEditing.bind(this)}
        >
          <Text style={[modalStyles.lightText, modalStyles.title]}>
            Edit Name
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={modalStyles.returnButton}
          onPress={this.toggleCustomPing.bind(this)}
        >
          <Text style={[modalStyles.lightText, modalStyles.title]}>
            Set Custom Ping
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
