import React, { Component } from 'react'
import { Text, View, TextInput, ScrollView, TouchableHighlight } from 'react-native'
import Modal from 'react-native-modal'
import TimersSelection from '../selection-items/timers-selection'
import modalStyles from '../../styles/modal-styles'
const BucketModel = require('../../models/bucket-model')

export default class NewBucketForm extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.props.onSubmit
    this.state = {
      creating: this.props.creating,
      name: 'New Bucket',
      selectedTimers: [],
    }
  }

  componentWillReceiveProps(props) {
    if (props.creating) {
      this.setState({ creating: props.creating })
    }
  }

  toggleTimer(timerId) {
    let selectedTimers = this.state.selectedTimers
    if (selectedTimers.includes(timerId)) {
      let ind = selectedTimers.indexOf(timerId)
      selectedTimers.splice(ind, 1)
    } else {
      selectedTimers.push(timerId)
    }
    this.setState({ selectedTimers })
  }

  async submitBucket() {
    let id = (new Date()).getTime()
    await BucketModel.create({
        id,
        name: this.state.name,
      }, 
      {timers: this.state.selectedTimers},
    )
    this.setState({ creating: false })
    this.onSubmit(id)
  }

  render() {
    return (
      <Modal
        isVisible={this.state.creating}
        onBackdropPress={() => this.setState({creating:false})}
        style={modalStyles.center}
        animationIn='fadeIn'
        animationOut='fadeOut'
      >
        <View style={{height: '70%'}}>
          <View style={modalStyles.textInput}>
            <TextInput
              style={[
                modalStyles.title,
                modalStyles.darkText,
              ]}
              onChangeText={(name) => this.setState({name})}
              defaultValue='Input Bucket Name'
              value={this.state.name}
            />
          </View>
          
          <TimersSelection
            height='70%'
            onSelect={this.toggleTimer.bind(this)}
          />
        </View>

        <TouchableHighlight
          style={modalStyles.returnButton}
          onPress={this.submitBucket.bind(this)}
        >
          <Text style={modalStyles.title}>
            Create New Bucket
          </Text>
        </TouchableHighlight>
      </Modal>
    )
  }
}
