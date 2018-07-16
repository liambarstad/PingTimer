import React, { Component } from 'react'
import { Text, View, TextInput, ScrollView, TouchableHighlight } from 'react-native'
import Modal from 'react-native-modal'
import RowList from '../shared/row-list'
import TimerSelection from '../selection-items/timer-selection'
import modalStyles from '../../styles/modal-styles'
const TimerModel = require('../../models/timer-model')
const BucketModel = require('../../models/bucket-model')

export default class NewBucketForm extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.props.onSubmit
    this.state = {
      creating: this.props.creating,
      name: 'New Bucket',
      timers: [],
      selectedTimers: [],
    }
  }

  async componentDidMount() {
    let timers = await TimerModel.getAll() 
    this.setState({ timers })
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

  formatTimer(timer, index, length) {
    return (
      <TimerSelection
        key={timer.id.toString()}
        id={timer.id}
        length={length}
        name={timer.name}
        onPress={this.toggleTimer.bind(this)}
      />
    )
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

          <Text
            style={[
              modalStyles.title,
              modalStyles.lightText,
            ]}
          >Select Timers:</Text>
          <ScrollView style={{height: '70%'}}>
            <RowList
              onFormat={this.formatTimer.bind(this)}
              targetWidth='85'
            >
              { this.state.timers }
            </RowList>
          </ScrollView>
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
