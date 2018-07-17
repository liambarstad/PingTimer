import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import Modal from 'react-native-modal'
import TimersSelection from '../selection-items/timers-selection'
import modalStyles from '../../styles/modal-styles'
import BucketModel from '../../models/bucket-model'

export default class BucketForm extends Component {
  constructor(props) {
    super(props)
    this.id = this.props.id
    this.onDestroy = this.props.onDestroy
    this.state = {
      editing: this.props.editing,
      selectedTimers: []
    }
  }

  async componentDidMount() {
    let bucket = await BucketModel.get(this.id)
    let timerObjects = bucket.timers 
    let selectedTimers = []
    timerObjects.forEach((timer) => selectedTimers.push(timer.id) )
    this.setState({ selectedTimers })
  }

  componentWillReceiveProps(props) {
    if (props.editing) {
      this.setState({ editing: props.editing })
    }
  }

  destroy() {
    this.setState({ editing: false })
    this.onDestroy(this.id)
  }

  async toggleTimer(id) {
    await BucketModel.toggleTimer(this.id, id)
    if (this.state.selectedTimers.includes(id)) {
      let selectedTimers = this.state.selectedTimers
      let ind = selectedTimers.indexOf(id)
      selectedTimers.splice(ind, 1)
      this.setState({ selectedTimers })
    } else {
      this.setState({selectedTimers:[...this.state.selectedTimers, id]})
    }
  }

  render() {
    return (
      <Modal
        isVisible={this.state.editing}
        onBackdropPress={() => this.setState({editing:false})}
        style={modalStyles.center}
        animationIn='fadeIn'
        animationOut='fadeOut'
      >
        <TimersSelection
          height='70%'
          onSelect={this.toggleTimer.bind(this)}
          alreadySelected={this.state.selectedTimers}
        />

        <TouchableHighlight
          style={modalStyles.redButton}
          onPress={this.destroy.bind(this)}
        >
          <Text style={modalStyles.title}>
            Delete Bucket
          </Text>
        </TouchableHighlight>
      </Modal>
    )
  }

}
