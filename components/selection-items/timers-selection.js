import React, { Component } from 'react' 
import { Text, View, ScrollView } from 'react-native'
import RowList from '../shared/row-list'
import TimerSelection from '../selection-items/timer-selection'
const TimerModel = require('../../models/timer-model')
import modalStyles from '../../styles/modal-styles'

export default class TimersSelection extends Component {
  constructor(props) {
    super(props)
    this.height = this.props.height || '100%'
    this.onSelect = this.props.onSelect
    this.state = {
      timers: [],
      alreadySelected: this.props.alreadySelected || [],
    }
  }

  async componentDidMount() {
    let timers = await TimerModel.getAll() 
    this.setState({ timers })
  }

  checkIfSelected(timerId) {
    if (this.state.alreadySelected.includes(timerId)) {
      return true
    } else {
      return false
    }
  }

  formatTimer(timer, index, length) {
    return (
      <TimerSelection
        key={timer.id.toString()}
        id={timer.id}
        length={length - 15}
        name={timer.name}
        selected={this.checkIfSelected(timer.id)}
        onPress={this.onSelect.bind(this)}
      />
    )
  }

  render() {
    return (
      <View style={{height:this.height}}>
      <Text
        style={[
          modalStyles.title,
          modalStyles.lightText,
        ]}
      >Select Timers:</Text>
      <ScrollView>
        <RowList
          onFormat={this.formatTimer.bind(this)}
          padding='3%'
          targetWidth='100'
        >
          { this.state.timers }
        </RowList>
      </ScrollView>
      </View>
    )
  }
}
