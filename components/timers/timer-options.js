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

  toggle() {
    this.setState({ active: false })
    this.props.toggle()
  }

  toggleEditing() {
    this.setState({ editingName: true })
  }

  submitName() {
    this.props.onEdit(this.state.timerName)
  }

  deleteTimer() {
    this.setState({ active: false })
    this.props.onDelete()
  }

  editNameModal() {
    // can add style to TextInput
    return (
      <Modal
        isVisible={this.state.editingName}
        onBackdropPress={this.toggleEditing.bind(this)}
        style={modalStyles.center}
        animationIn='fadeIn'
        animationOut='fadeOut'
      >
        <View style={modalStyles.body}>
          <TextInput
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
        onBackdropPress={this.toggle()}
        style={modalStyles.center}
        animationIn='fadeIn'
        animationOut='fadeOut'
      >
        <TouchableHighlight
          style={modalStyles.returnButton}
          onPress={() => this.toggleEditing()}
        >
          <Text
            style={[modalStyles.lightText, modalStyles.title]}
          >
            Edit Name
          </Text>
        </TouchableHighlight>
        
        <TouchableHighlight
          style={modalStyles.redButton}
          onPress={() => this.deleteTimer()}
        >
          <Text
            style={[modalStyles.lightText, modalStyles.title]}
          >
            Delete
          </Text>
        </TouchableHighlight>
      </Modal>
    )
  }
}
