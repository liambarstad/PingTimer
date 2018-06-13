import React, { Component } from 'react'
import { Text, View, TouchableHighlight, TextInput } from 'react-native'
import Modal from 'react-native-modal'
import modalStyles from '../../styles/modal-styles'

export default class TimerOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: this.props.active,
      timerName: this.props.timerName,
      editingName: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      let active = !this.state.active
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

  submitName() {
    this.toggleEditing()
    this.props.onEdit(this.state.timerName)
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
        <TouchableHighlight
          style={modalStyles.returnButton}
          onPress={this.toggleEditing.bind(this)}
        >
          <Text style={[modalStyles.lightText, modalStyles.title]}>
            Edit Name
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
