import React, { Component } from 'react'
import { Text, View, TouchableHighlight, TextInput } from 'react-native'
import Modal from 'react-native-modal'
import TimersSelection from '../selection-items/timers-selection'
import PingsSelection from '../selection-items/pings-selection'
import modalStyles from '../../styles/modal-styles'
import BucketModel from '../../models/bucket-model'

export default class BucketForm extends Component {
  constructor(props) {
    super(props)
    this.id = this.props.id
    this.onChangeName = this.props.onChangeName
    this.onDestroy = this.props.onDestroy
    this.state = {
      name: this.props.name,
      editing: this.props.editing,
      editingName: false,
      view: 'timers',
      selectedTimers: [],
      selectedPings: [],
    }
  }

  async componentDidMount() {
    let bucket = await BucketModel.get(this.id)
    let selectedTimers = []
    let selectedPings = []
    bucket.timers.forEach((timer) => selectedTimers.push(timer.id))
    //bucket.pings.forEach((ping) => selectedPings.push(ping.id))
    this.setState({ selectedTimers, selectedPings })
  }

  componentWillReceiveProps(props) {
    if (props.editing) {
      this.setState({ editing: props.editing })
    }
  }

  selection() {
    if (this.state.view === 'timers') {
      return (
        <TimersSelection
          height='60%'
          onSelect={this.toggleTimer.bind(this)}
          alreadySelected={this.state.selectedTimers}
        />
      )
    } else {
      return (
        <PingsSelection
          height='60%'
          onSelect={this.togglePing.bind(this)}
          alreadySelected={this.state.selectedPings}
        />
      )
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

  async togglePing(id) {
    await BucketModel.togglePing(this.id, id)
    if (this.state.selectedPings.includes(id)) {
      let selectedPigs = this.state.selectedPings
      let ind = selectedPings.indexOf(id)
      selectedPings.splice(ind, 1)
      this.setState({ selectedPings })
    } else {
      this.setState({selectedPings:[...this.state.selectedPings, id]})
    }
  }

  async changeName() {
    await BucketModel.changeName(this.id, this.state.name) 
    this.setState({ editingName: false })
    this.onChangeName(this.state.name)
  }

  toggleView() {
    if (this.state.view === 'timers') {
      this.setState({ view: 'pings' })
    } else {
      this.setState({ view: 'timers' })
    }
  }

  toggleViewButtonTitle() {
    if (this.state.view === 'timers') {
      return 'Select Pings'
    } else {
      return 'Select Timers'
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
        <View style={[
          modalStyles.returnButton,
          this.state.editingName && modalStyles.textInput
        ]}>
          <TextInput
            style={[
              modalStyles.title,
              modalStyles.darkText,
            ]}
            onChangeText={(name) => this.setState({name})}
            onEndEditing={this.changeName.bind(this)}
            value={this.state.name}
          />
        </View>

        { this.selection() }

        <TouchableHighlight
          style={modalStyles.returnButton}
          onPress={this.toggleView.bind(this)}
        >
          <Text style={modalStyles.title}>
            { this.toggleViewButtonTitle() }          
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={modalStyles.returnButton}
          onPress={() => this.setState({editing:false})}
        >
          <Text style={modalStyles.title}>
            Back To Buckets
          </Text>
        </TouchableHighlight>

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
