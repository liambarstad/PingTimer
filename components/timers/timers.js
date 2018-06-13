import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import Timer from './timer'
import timerStyles from '../../styles/timer-styles'
const TimerModel = require('../../models/timer-model')
const SettingsModel = require('../../models/settings-model')
const Dimensions = require('Dimensions')

export default class Timers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timers: [],
      rows: [],
      height: this.props.height,
      width: this.props.width,
      visibleNumber: this._calculateVisibleTimers(this.props.width),
      timersStyle: timerStyles.timersVertical,
      notificationScheduler: this.props.notificationScheduler,
    }
  }

  async componentDidMount() {
    this._setStyles()
    let rawTimers = await TimerModel.getAll()
    let timers = Array.from(rawTimers)
    let rows = this.initializeRows(timers)
    this.setState({ timers, rows })
    this._setSwapListener()
  } 

  componentWillReceiveProps(nextProps) {
    if (nextProps.notificationScheduler) {
      this.setState({ notificationScheduler: nextProps.notificationScheduler })
    }
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', () => {
      this._swapOrientation()
      this._setStyles()
    })
  }

  initializeRows(timers=this.state.timers) {
    let rows = []
    for (i = 0; i < timers.length; i += this.state.visibleNumber) {
      let batch = timers.slice(i, (i + this.state.visibleNumber))
      let newRow = this._formatTimers(batch, i)
      let row = this._formatRow(newRow)
      rows.push(row)
    }
    return rows
  }

  async addTimer() {
    let newTimer = await TimerModel.create(this._blankTimer())
    this.setState({ timers: [...this.state.timers, newTimer ]})
    this.addToEnd(newTimer)
  }

  addToEnd(timer) {
    let lastRow = this.state.rows[this.state.rows.length - 1]
    timer = this._formatTimer(timer, this.state.timers.length - 1)
    if (!lastRow || lastRow.props.children.length >= this.state.visibleNumber) {
      this.addNewRow(timer)
    } else { 
      this.addToLastRow(timer)
    }
  }

  addNewRow(timer) {
    let rows = this.state.rows
    rows.push(this._formatRow(timer))
    this.setState({ rows })
  }

  addToLastRow(timer) {
    let rows = this.state.rows
    let lastChildren = React.Children.toArray(rows[rows.length -1].props.children)
    lastChildren.push(timer) 
    rows[this.state.rows.length - 1] = this._formatRow(lastChildren, this.state.rows.length * this.state.visibleNumber)
    this.setState({ rows })
  }

  destroyTimer(id, ind) {
    let timers = this.state.timers
    timers.splice(ind, 1)
    let rows = this.initializeRows(timers)
    this.setState({ timers, rows })
    TimerModel.destroy(id)
  }

  render() {
    return (
      <ScrollView 
        style={this.state.timersStyle}
      >
        { this.state.rows }
      </ScrollView>
    )
  }

  _calculateVisibleTimers(windowWidth) {
    return Math.floor(windowWidth / 160) 
  }

  _setSwapListener() {
    Dimensions.addEventListener('change', () => {
      this._swapOrientation()
      this._setStyles()
    })
  }

  _swapOrientation() {
    const width = this.state.height
    const height = this.state.width
    const visibleNumber = this._calculateVisibleTimers(width)
    this.setState({ height, width, visibleNumber })
    let rows = this.initializeRows()
    this.setState({ rows })
  }

  _setStyles() {
    if (this.state.height > this.state.width) {
      this.setState({ timersStyle: timerStyles.timersVertical }) 
    } else {
      this.setState({ timersStyle: timerStyles.timersHorizontal })
    }
  }

  _blankTimer() {
    return {
      id: (new Date()).getTime(),
      active: false,
      name: 'New Timer',
      time: new Date(0,0,0,0,0,0),
    }
  }

  _formatTimer(timer, index) {
    return (
      <Timer 
        key={timer.id.toString()}
        id={timer.id}
        name={timer.name}
        active={timer.active}
        time={{time: timer.time}}
        index={index.toString()}
        width={this.state.width / this.state.visibleNumber}
        notificationScheduler={this.state.notificationScheduler}
        onDestroy={this.destroyTimer.bind(this)}
      />
    )
  }

  _formatTimers(timers=this.state.timers, startIndex) {
    let formattedTimers = []
    timers.forEach((timer, ind) => {
      formattedTimers.push(
        this._formatTimer(timer, (startIndex + ind))
      )
    })
    return formattedTimers
  }

  _formatRow(formattedTimers) {
    return (
      <View style={{flexDirection: 'row'}}>
        { formattedTimers }
      </View>
    )
  }

}
